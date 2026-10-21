import { NextResponse } from "next/server";
import mongoose, { Types, type HydratedDocument } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import { createNotification } from "@/lib/server/notifications";
import { recordRelatedTaskActivity } from "@/lib/server/task-activity";
import { teamMemberTaskAccessFilter, validateTaskReferences } from "@/lib/server/task-references";
import CrmNotification from "@/models/CrmNotification";
import Task from "@/models/Task";
import type { TaskRecord } from "@/models/Task";
import { updateTaskSchema } from "@/lib/validation/tasks";
import { isTaskOverdue } from "@/lib/task-utils";
type Context = { params: Promise<{ id: string }> };
const validId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!validId(id)) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    await connectMongo();
    const filter: Record<string, unknown> = user.role === "team_member"
      ? { _id: id, ...(await teamMemberTaskAccessFilter(user.id)) }
      : { _id: id };
    const task = await Task.findOne(filter).populate("assignee", "name role").populate("creator", "name role").populate("lead", "name company status").populate("client", "contactName companyName status").populate("project", "name status client").lean();
    if (!task) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    const now = new Date();
    return NextResponse.json({ task: { ...task, overdue: isTaskOverdue(task.dueDate, task.status, now) } });
  }, ["administrator", "manager", "team_member"])(request);
}

export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, user) => {
    const { id } = await context.params;
    if (!validId(id)) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    await connectMongo();
    const body = await readBoundedJson(req, 24 * 1024);
    if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
    const parsed = updateTaskSchema.safeParse(body.value);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid task update." }, { status: 400 });
    const currentFilter = user.role === "team_member"
      ? { _id: id, ...(await teamMemberTaskAccessFilter(user.id)) }
      : { _id: id };
    const current = await Task.findOne(currentFilter).select("+revision");
    if (!current) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    if (current.archived && parsed.data.archived !== false) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    if (user.role === "team_member") {
      if (Object.keys(parsed.data).some((key) => !["status", "notes"].includes(key))) return NextResponse.json({ error: "Team members may update task status and notes only." }, { status: 403 });
    }
    const data = parsed.data;
    const effectiveStart = data.startDate === undefined ? current.startDate : data.startDate;
    const effectiveDue = data.dueDate === undefined ? current.dueDate : data.dueDate;
    if (effectiveStart && effectiveDue && effectiveDue < effectiveStart) return NextResponse.json({ error: "Due date must be on or after the start date." }, { status: 400 });
    const refs = {
      lead: "lead" in data ? data.lead || undefined : current.lead?.toString(),
      client: "client" in data ? data.client || undefined : current.client?.toString(),
      project: "project" in data ? data.project || undefined : current.project?.toString(),
      assignee: "assignee" in data ? data.assignee || undefined : current.assignee?.toString(),
    };
    if (!refs.lead && !refs.client && !refs.project) return NextResponse.json({ error: "A task must remain linked to a lead, client, or project." }, { status: 400 });
    if (user.role !== "team_member") {
      const referenceError = await validateTaskReferences(refs);
      if (referenceError) return NextResponse.json({ error: referenceError }, { status: 400 });
    }
    if (data.archived === false && current.status === "Completed") {
      // Restoring a completed task is valid; completion remains historical until explicitly reopened.
    }
    const now = new Date();
    const oldStatus = current.status; const oldPriority = current.priority; const oldDue = current.dueDate?.getTime() ?? null; const oldAssignee = current.assignee?.toString() ?? "";
    const set: Record<string, unknown> = { ...data, ...refs };
    if (data.assignee === "") set.assignee = undefined;
    if (data.lead === "") set.lead = undefined;
    if (data.client === "") set.client = undefined;
    if (data.project === "") set.project = undefined;
    if (data.status === "Completed" && oldStatus !== "Completed") set.completedAt = now;
    if (data.status && data.status !== "Completed" && oldStatus === "Completed") set.completedAt = null;
    const changed = data.status !== oldStatus || data.priority !== oldPriority || (data.dueDate !== undefined && (data.dueDate?.getTime() ?? null) !== oldDue) || (data.assignee !== undefined && (data.assignee || "") !== oldAssignee) || data.archived !== undefined || data.title !== undefined || data.description !== undefined || data.notes !== undefined || data.startDate !== undefined || data.lead !== undefined || data.client !== undefined || data.project !== undefined;
    const events: { type: string; details: string }[] = [];
    if (data.status && data.status !== oldStatus) events.push({ type: data.status === "Completed" ? "completed" : oldStatus === "Completed" ? "reopened" : "status_changed", details: `Status changed from ${oldStatus} to ${data.status}.` });
    if (data.priority && data.priority !== oldPriority) events.push({ type: "priority_changed", details: `Priority changed from ${oldPriority} to ${data.priority}.` });
    if (data.dueDate !== undefined && (data.dueDate?.getTime() ?? null) !== oldDue) events.push({ type: "due_date_changed", details: `Due date changed to ${data.dueDate?.toISOString() ?? "none"}.` });
    if (data.assignee !== undefined && (data.assignee || "") !== oldAssignee) events.push({ type: "assigned", details: data.assignee ? "Task assignee changed." : "Task unassigned." });
    if (data.archived === true) events.push({ type: "archived", details: "Task archived." });
    if (data.archived === false) events.push({ type: "restored", details: "Task restored." });
    if (!events.length && changed) events.push({ type: "edited", details: "Task details edited." });
    const activities = events.map((event) => ({ ...event, actorId: user.id, actorName: user.name, createdAt: now }));
    const session = await mongoose.startSession();
    let task: HydratedDocument<TaskRecord> | null = null;
    try {
      await session.withTransaction(async () => {
        task = await Task.findOneAndUpdate({ ...currentFilter, revision: (current as typeof current & { revision?: number }).revision ?? 0 }, { $set: set, $inc: { revision: 1 }, ...(activities.length ? { $push: { activities: { $each: activities, $slice: -300 } } } : {}) }, { new: true, runValidators: true, session });
        if (!task) return;
        for (const event of events) await recordRelatedTaskActivity(task as NonNullable<typeof task>, user, { ...event, createdAt: now }, session);
      });
    } finally {
      await session.endSession();
    }
    if (!task) return NextResponse.json({ error: "Task changed while you were editing it. Reload and try again." }, { status: 409 });
    const responseTask = await Task.findById(id).populate("assignee", "name role").populate("creator", "name role").populate("lead", "name company status").populate("client", "contactName companyName status").populate("project", "name status").lean();
    if (!responseTask) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    if (data.assignee !== undefined && oldAssignee && oldAssignee !== String(responseTask.assignee?._id ?? responseTask.assignee ?? "")) await CrmNotification.updateMany({ recordType: "task", recordId: id, recipient: oldAssignee, dismissedAt: null }, { $set: { dismissedAt: now, readAt: now } });
    if (data.status === "Completed") await CrmNotification.updateMany({ recordType: "task", recordId: id, dismissedAt: null }, { $set: { dismissedAt: now, readAt: now } });
    if (data.archived === true || (data.dueDate !== undefined && (data.dueDate?.getTime() ?? null) !== oldDue)) await CrmNotification.updateMany({ recordType: "task", recordId: id, dismissedAt: null }, { $set: { dismissedAt: now, readAt: now } });
    if (responseTask.assignee && String(responseTask.assignee._id) !== user.id) {
      const assignmentChanged = data.assignee !== undefined && String(responseTask.assignee._id) !== oldAssignee;
      await createNotification({ recipient: String(responseTask.assignee._id), actor: user.id, kind: assignmentChanged ? "task_assigned" : "task_changed", title: assignmentChanged ? "Task assigned to you" : "Task updated", message: responseTask.title, recordType: "task", recordId: id, href: `/admin/tasks/${id}`, dedupeKey: `task-change:${id}:${responseTask.updatedAt.toISOString()}` });
    }
    return NextResponse.json({ task: { ...responseTask, overdue: isTaskOverdue(responseTask.dueDate, responseTask.status, now) } });
  }, ["administrator", "manager", "team_member"])(request);
}

export async function DELETE(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!validId(id)) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    await connectMongo();
    const currentFilter = user.role === "team_member"
      ? { _id: id, ...(await teamMemberTaskAccessFilter(user.id)) }
      : { _id: id };
    const current = await Task.findOne(currentFilter).select("+revision");
    if (!current) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    const now = new Date();
    const session = await mongoose.startSession();
    let task: HydratedDocument<TaskRecord> | null = null;
    try {
      await session.withTransaction(async () => {
        task = await Task.findOneAndUpdate({ ...currentFilter, revision: (current as typeof current & { revision?: number }).revision ?? 0 }, { $set: { archived: true }, $inc: { revision: 1 }, $push: { activities: { $each: [{ type: "archived", actorId: user.id, actorName: user.name, details: "Task archived.", createdAt: now }], $slice: -300 } } }, { new: true, session });
        if (task) await recordRelatedTaskActivity(task, user, { type: "task_updated", details: "Task archived.", createdAt: now }, session);
      });
    } finally {
      await session.endSession();
    }
    if (!task) return NextResponse.json({ error: "Task changed while you were editing it. Reload and try again." }, { status: 409 });
    await CrmNotification.updateMany({ recordType: "task", recordId: id, dismissedAt: null }, { $set: { dismissedAt: now, readAt: now } });
    return NextResponse.json({ ok: true, archived: true });
  }, ["administrator", "manager"])(request);
}
