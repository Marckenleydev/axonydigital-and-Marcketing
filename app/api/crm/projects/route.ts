import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import Client from "@/models/Client";
import CrmUser from "@/models/CrmUser";
import Project from "@/models/Project";
import { createProjectSchema, projectListQuerySchema } from "@/lib/validation/projects";

export const GET = withCrmAuth(async (request, user) => {
  await connectMongo();
  const parsed = projectListQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid project filters." }, { status: 400 });
  const { q, status, priority, client, owner, archived, sort, order, page, limit } = parsed.data;
  const filter: Record<string, any> = { archived: archived === "true" };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (client) filter.client = new Types.ObjectId(client);
  if (owner) filter.$or = [{ projectManager: new Types.ObjectId(owner) }, { teamMembers: new Types.ObjectId(owner) }];
  if (user.role === "team_member") filter.$or = [{ projectManager: new Types.ObjectId(user.id) }, { teamMembers: new Types.ObjectId(user.id) }];
  if (q) filter.$text = { $search: q };
  const direction = order === "asc" ? 1 : -1;
  const [projects, total] = await Promise.all([
    Project.find(filter).populate("client", "contactName companyName status archived").populate("projectManager", "name role").populate("teamMembers", "name role").sort({ [sort]: direction, _id: direction }).skip((page - 1) * limit).limit(limit).lean(),
    Project.countDocuments(filter),
  ]);
  return NextResponse.json({ projects, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}, ["administrator", "manager", "team_member"]);

export const POST = withCrmAuth(async (request, user) => {
  await connectMongo();
  const body = await readBoundedJson(request, 32 * 1024);
  if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
  const parsed = createProjectSchema.safeParse(body.value);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid project." }, { status: 400 });
  const data = parsed.data;
  const client = await Client.exists({ _id: data.client, archived: false });
  if (!client) return NextResponse.json({ error: "Choose an active client." }, { status: 400 });
  const memberIds = [...new Set([...(data.projectManager ? [data.projectManager] : []), ...data.teamMembers])];
  if (memberIds.length !== await CrmUser.countDocuments({ _id: { $in: memberIds }, active: true })) return NextResponse.json({ error: "Choose active team members for project assignments." }, { status: 400 });
  if (user.role === "manager" && !data.projectManager) data.projectManager = user.id;
  try {
    const [project] = await Project.create([{ ...data, projectManager: data.projectManager || undefined, activities: [{ type: "created", actorId: user.id, actorName: user.name, details: "Project created in the CRM." }] }]);
    return NextResponse.json({ project: { id: String(project._id) } }, { status: 201 });
  } catch (error) { throw error; }
}, ["administrator", "manager"]);
