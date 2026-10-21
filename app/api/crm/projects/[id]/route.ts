import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import Client from "@/models/Client";
import CrmUser from "@/models/CrmUser";
import Project from "@/models/Project";
import { updateProjectSchema } from "@/lib/validation/projects";
type Context = { params: Promise<{ id: string }> };
const isId = (id: string) => Types.ObjectId.isValid(id);

export async function GET(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!isId(id)) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    await connectMongo();
    const filter: Record<string, unknown> = { _id: id };
    if (user.role === "team_member") filter.$or = [{ projectManager: user.id }, { teamMembers: user.id }];
    const project = await Project.findOne(filter).populate("client", "contactName companyName email phone status archived").populate("projectManager", "name role email").populate("teamMembers", "name role email").lean();
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json({ project });
  }, ["administrator", "manager", "team_member"])(request);
}

export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, user) => {
    const { id } = await context.params;
    if (!isId(id)) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    await connectMongo();
    const body = await readBoundedJson(req, 32 * 1024);
    if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
    const parsed = updateProjectSchema.safeParse(body.value);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid project update." }, { status: 400 });
    const current = await Project.findById(id).select("projectManager teamMembers status startDate dueDate client").lean();
    if (!current) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    const isAssigned = String(current.projectManager ?? "") === user.id || current.teamMembers.some((member) => String(member) === user.id);
    if (user.role === "team_member") {
      if (!isAssigned) return NextResponse.json({ error: "Project not found." }, { status: 404 });
      const allowed = new Set(["status", "progress"]);
      if (Object.keys(parsed.data).some((key) => !allowed.has(key))) return NextResponse.json({ error: "Team members may update project status and progress only." }, { status: 403 });
    }
    const data = parsed.data;
    const effectiveStart = data.startDate === undefined ? current.startDate : data.startDate;
    const effectiveDue = data.dueDate === undefined ? current.dueDate : data.dueDate;
    if (effectiveStart && effectiveDue && effectiveDue < effectiveStart) return NextResponse.json({ error: "Due date must be on or after the start date." }, { status: 400 });
    if (data.client && !await Client.exists({ _id: data.client, archived: false })) return NextResponse.json({ error: "Choose an active client." }, { status: 400 });
    if (data.archived === false && !await Client.exists({ _id: current.client, archived: false })) return NextResponse.json({ error: "Restore the linked client before restoring this project." }, { status: 409 });
    const memberIds = [...new Set([...(data.projectManager ? [data.projectManager] : []), ...(data.teamMembers || [])])];
    if (memberIds.length && memberIds.length !== await CrmUser.countDocuments({ _id: { $in: memberIds }, active: true })) return NextResponse.json({ error: "Choose active team members for project assignments." }, { status: 400 });
    if (user.role === "manager" && !data.projectManager) data.projectManager = user.id;
    const set: Record<string, unknown> = { ...data };
    if (data.projectManager === "") set.projectManager = undefined;
    const detail = data.archived === true ? "Project archived." : data.archived === false ? "Project restored." : data.status && data.status !== current.status ? `Status changed from ${current.status} to ${data.status}.` : "Project details updated.";
    const project = await Project.findByIdAndUpdate(id, { $set: set, $push: { activities: { $each: [{ type: data.status && data.status !== current.status ? "status_changed" : "updated", actorId: user.id, actorName: user.name, details: detail, createdAt: new Date() }], $slice: -200 } } }, { new: true, runValidators: true }).populate("client", "contactName companyName").populate("projectManager", "name role").populate("teamMembers", "name role").lean();
    return NextResponse.json({ project });
  }, ["administrator", "manager", "team_member"])(request);
}

export async function DELETE(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!isId(id)) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    await connectMongo();
    const project = await Project.findByIdAndUpdate(id, { $set: { archived: true }, $push: { activities: { $each: [{ type: "updated", actorId: user.id, actorName: user.name, details: "Project archived.", createdAt: new Date() }], $slice: -200 } } }, { new: true }).select("_id archived").lean();
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json({ ok: true, archived: true });
  }, ["administrator", "manager"])(request);
}
