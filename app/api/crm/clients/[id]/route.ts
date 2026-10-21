import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import Client from "@/models/Client";
import Project from "@/models/Project";
import CrmUser from "@/models/CrmUser";
import { normalizeClientPhone, updateClientSchema } from "@/lib/validation/clients";
type Context = { params: Promise<{ id: string }> };
const isId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!isId(id)) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    await connectMongo();
    const filter: Record<string, unknown> = { _id: id };
    if (user.role === "team_member") filter.accountOwner = user.id;
    const client = await Client.findOne(filter).populate("accountOwner", "name role").lean();
    if (!client) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    const projects = await Project.find({ client: id, archived: false }).select("name status priority progress dueDate projectManager teamMembers updatedAt").populate("projectManager", "name").populate("teamMembers", "name").sort({ dueDate: 1 }).limit(100).lean();
    return NextResponse.json({ client, projects });
  }, ["administrator", "manager", "team_member"])(request);
}

export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, user) => {
    const { id } = await context.params;
    if (!isId(id)) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    await connectMongo();
    const body = await readBoundedJson(req, 32 * 1024);
    if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
    const parsed = updateClientSchema.safeParse(body.value);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid client update." }, { status: 400 });
    const current = await Client.findById(id).select("accountOwner status").lean();
    if (!current) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    if (user.role === "team_member") {
      if (String(current.accountOwner ?? "") !== user.id) return NextResponse.json({ error: "Client not found." }, { status: 404 });
      return NextResponse.json({ error: "You do not have permission to update clients." }, { status: 403 });
    }
    const data = parsed.data;
    if (data.accountOwner) {
      if (!await CrmUser.exists({ _id: data.accountOwner, active: true })) return NextResponse.json({ error: "Choose an active account owner." }, { status: 400 });
    }
    const set: Record<string, unknown> = { ...data };
    if ("email" in data) set.normalizedEmail = data.email ? data.email.toLowerCase() : undefined;
    if ("phone" in data) set.normalizedPhone = normalizeClientPhone(data.phone) || undefined;
    if (data.accountOwner === "") set.accountOwner = undefined;
    const details = data.archived === true ? "Client archived." : data.archived === false ? "Client restored." : data.status && data.status !== current.status ? `Status changed from ${current.status} to ${data.status}.` : "Client details updated.";
    try {
      const client = await Client.findByIdAndUpdate(id, { $set: set, $push: { activities: { $each: [{ type: data.status && data.status !== current.status ? "status_changed" : "updated", actorId: user.id, actorName: user.name, details, createdAt: new Date() }], $slice: -200 } } }, { new: true, runValidators: true }).populate("accountOwner", "name role").lean();
      return NextResponse.json({ client });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "A client with this email or phone already exists." }, { status: 409 });
      throw error;
    }
  }, ["administrator", "manager", "team_member"])(request);
}

export async function DELETE(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!isId(id)) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    await connectMongo();
    if (await Project.exists({ client: id, archived: false })) return NextResponse.json({ error: "Archive the client’s active projects first." }, { status: 409 });
    const client = await Client.findByIdAndUpdate(id, { $set: { archived: true }, $push: { activities: { $each: [{ type: "updated", actorId: user.id, actorName: user.name, details: "Client archived.", createdAt: new Date() }], $slice: -200 } } }, { new: true }).select("_id archived").lean();
    if (!client) return NextResponse.json({ error: "Client not found." }, { status: 404 });
    return NextResponse.json({ ok: true, archived: true });
  }, ["administrator", "manager"])(request);
}
