import { NextResponse } from "next/server";
import mongoose, { Types, type HydratedDocument } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import { createNotification } from "@/lib/server/notifications";
import { recordRelatedTaskActivity } from "@/lib/server/task-activity";
import { teamMemberTaskAccessFilter, validateTaskReferences } from "@/lib/server/task-references";
import Task from "@/models/Task";
import type { TaskRecord } from "@/models/Task";
import { isTaskOverdue } from "@/lib/task-utils";
import { createTaskSchema, taskListQuerySchema } from "@/lib/validation/tasks";

export const GET = withCrmAuth(async (request, user) => {
  await connectMongo();
  const parsed = taskListQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid task filters." }, { status: 400 });
  const { q, status, priority, assignee, client, project, lead, due, archived, sort, order, page, limit } = parsed.data;
  const filter: Record<string, any> = user.role === "team_member"
    ? await teamMemberTaskAccessFilter(new Types.ObjectId(user.id))
    : { archived: archived === "true" };
  if (user.role !== "team_member" && assignee) filter.assignee = new Types.ObjectId(assignee);
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (client) filter.client = new Types.ObjectId(client);
  if (project) filter.project = new Types.ObjectId(project);
  if (lead) filter.lead = new Types.ObjectId(lead);
  if (due === "overdue") { filter.dueDate = { $lt: new Date() }; filter.status = { $ne: "Completed" }; }
  if (due === "soon") { const now = new Date(); filter.dueDate = { $gte: now, $lte: new Date(now.getTime() + 48 * 60 * 60 * 1000) }; filter.status = { $ne: "Completed" }; }
  if (q) filter.$text = { $search: q };
  const direction = order === "asc" ? 1 : -1; const now = new Date();
  const [records, total] = await Promise.all([
    Task.find(filter).populate("assignee", "name role").populate("creator", "name role").populate("lead", "name company status assignedTo").populate("client", "contactName companyName status accountOwner").populate("project", "name status client projectManager teamMembers").sort({ [sort]: direction, _id: direction }).skip((page - 1) * limit).limit(limit).lean(),
    Task.countDocuments(filter),
  ]);
  const tasks = records.map((task) => ({ ...task, overdue: isTaskOverdue(task.dueDate, task.status, now) }));
  return NextResponse.json({ tasks, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}, ["administrator", "manager", "team_member"]);

export const POST = withCrmAuth(async (request, user) => {
  await connectMongo();
  const body = await readBoundedJson(request, 24 * 1024);
  if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
  const parsed = createTaskSchema.safeParse(body.value);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid task." }, { status: 400 });
  const data = parsed.data;
  const refs = { lead: data.lead || undefined, client: data.client || undefined, project: data.project || undefined, assignee: data.assignee || undefined };
  const referenceError = await validateTaskReferences(refs);
  if (referenceError) return NextResponse.json({ error: referenceError }, { status: 400 });
  const now = new Date();
  const activity = { type: "created", actorId: user.id, actorName: user.name, details: "Task created.", createdAt: now };
  const session = await mongoose.startSession();
  let task: HydratedDocument<TaskRecord> | null = null;
  try {
    await session.withTransaction(async () => {
      const [created] = await Task.create([{ ...data, ...refs, creator: user.id, completedAt: data.status === "Completed" ? now : undefined, activities: [activity] }], { session });
      task = created;
      await recordRelatedTaskActivity(created, user, { type: "task_created", details: "Task created.", createdAt: now }, session);
    });
  } finally {
    await session.endSession();
  }
  const createdTask = task as HydratedDocument<TaskRecord> | null;
  if (!createdTask) throw new Error("Task transaction did not return its created record.");
  if (createdTask.assignee && String(createdTask.assignee) !== user.id) await createNotification({ recipient: String(createdTask.assignee), actor: user.id, kind: "task_assigned", title: "Task assigned to you", message: createdTask.title, recordType: "task", recordId: String(createdTask._id), href: `/admin/tasks/${createdTask._id}`, dedupeKey: `task-assignment:${createdTask._id}:${createdTask.assignee}:${now.getTime()}` });
  return NextResponse.json({ task: { id: String(createdTask._id) } }, { status: 201 });
}, ["administrator", "manager"]);
