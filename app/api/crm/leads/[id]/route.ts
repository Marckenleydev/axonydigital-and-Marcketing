import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import Lead from "@/models/Lead";
import CrmUser from "@/models/CrmUser";
import { normalizePhone, updateLeadSchema } from "@/lib/validation/leads";

type Context = { params: Promise<{ id: string }> };
function validId(id: string) { return Types.ObjectId.isValid(id); }

export async function GET(request: Request, context: Context) {
  return withCrmAuth(async (_request, user) => {
    const { id } = await context.params;
    if (!validId(id)) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    await connectMongo();
    const query = user.role === "team_member" ? { _id: id, assignedTo: user.id } : { _id: id };
    const lead = await Lead.findOne(query).populate("assignedTo", "name role email").lean();
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ lead });
  }, ["administrator", "manager", "team_member"])(request);
}

export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, user) => {
    const { id } = await context.params;
    if (!validId(id)) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    await connectMongo();
    const body = await readBoundedJson(req, 32 * 1024);
    if (!body.ok) return NextResponse.json({ error: body.reason === "too_large" ? "Request is too large." : "Invalid JSON body." }, { status: body.reason === "too_large" ? 413 : 400 });
    const parsed = updateLeadSchema.safeParse(body.value);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid lead update." }, { status: 400 });
    const current = await Lead.findById(id).select("status assignedTo");
    if (!current) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    if (user.role === "team_member" && String(current.assignedTo ?? "") !== user.id) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    const data = parsed.data;
    if (user.role === "team_member") {
      const allowed = new Set(["status", "nextFollowUpAt", "notes"]);
      if (Object.keys(data).some((key) => !allowed.has(key))) {
        return NextResponse.json({ error: "Team members can update status, follow-up date, and notes on their assigned leads." }, { status: 403 });
      }
    }
    if (data.assignedTo) {
      const activeOwner = await CrmUser.exists({ _id: data.assignedTo, active: true });
      if (!activeOwner) return NextResponse.json({ error: "Choose an active team member." }, { status: 400 });
    }
    const setData: Record<string, unknown> = { ...data };
    if ("email" in data) setData.normalizedEmail = data.email?.toLowerCase() || undefined;
    if ("phone" in data) setData.normalizedPhone = normalizePhone(data.phone) || undefined;
    if (data.assignedTo === "") setData.assignedTo = undefined;
    const activities: Record<string, unknown>[] = [];
    if (data.status && data.status !== current.status) {
      activities.push({ type: "status_changed", details: `Status changed from ${current.status} to ${data.status}.` });
      if (data.status !== "New") setData.lastContactAt = new Date();
    }
    if (data.notes) activities.push({ type: "note", details: data.notes.slice(0, 1000) });
    if (!activities.length) activities.push({ type: "updated", details: "Lead details updated." });
    try {
      const lead = await Lead.findByIdAndUpdate(id, {
        $set: setData,
        $push: { activities: { $each: activities.map((activity) => ({ ...activity, actorId: user.id, actorName: user.name })), $slice: -200 } },
      }, { new: true, runValidators: true }).populate("assignedTo", "name role email").lean();
      return NextResponse.json({ lead });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "A lead with this email or phone already exists." }, { status: 409 });
      throw error;
    }
  }, ["administrator", "manager", "team_member"])(request);
}

export async function DELETE(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!validId(id)) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    await connectMongo();
    const lead = await Lead.findByIdAndUpdate(id, {
      $set: { archived: true },
      $push: { activities: { $each: [{ type: "updated", actorId: user.id, actorName: user.name, details: "Lead archived." }], $slice: -200 } },
    }, { new: true }).select("_id archived").lean();
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ ok: true, archived: true });
  }, ["administrator", "manager"])(request);
}
