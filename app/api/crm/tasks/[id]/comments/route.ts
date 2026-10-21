import { NextResponse } from "next/server";
import mongoose, { Types, type HydratedDocument } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import { recordRelatedTaskActivity } from "@/lib/server/task-activity";
import { teamMemberTaskAccessFilter } from "@/lib/server/task-references";
import Task from "@/models/Task";
import type { TaskRecord } from "@/models/Task";
import { taskCommentSchema } from "@/lib/validation/tasks";
type Context = { params: Promise<{ id: string }> };
export const POST = async (request: Request, context: Context) => withCrmAuth(async (req, user) => {
  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Task not found." }, { status: 404 });
  await connectMongo();
  const body = await readBoundedJson(req, 8 * 1024);
  if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
  const parsed = taskCommentSchema.safeParse(body.value);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid comment." }, { status: 400 });
  const accessFilter = user.role === "team_member"
    ? { _id: id, ...(await teamMemberTaskAccessFilter(user.id)) }
    : { _id: id, archived: false };
  const task = await Task.findOne(accessFilter).select("+revision");
  if (!task) return NextResponse.json({ error: "Task not found." }, { status: 404 });
  const now = new Date();
  const activity = { type: "comment", actorId: new Types.ObjectId(user.id), actorName: user.name, details: parsed.data.comment, createdAt: now };
  const session = await mongoose.startSession();
  let updated: HydratedDocument<TaskRecord> | null = null;
  try {
    await session.withTransaction(async () => {
      updated = await Task.findOneAndUpdate({ ...accessFilter, revision: (task as typeof task & { revision?: number }).revision ?? 0 }, { $inc: { revision: 1 }, $push: { activities: { $each: [activity], $slice: -300 } } }, { new: true, session });
      if (!updated) return;
      await recordRelatedTaskActivity(updated, user, { type: "task_comment", details: "A task comment was added.", createdAt: now }, session);
    });
  } finally {
    await session.endSession();
  }
  const updatedTask = updated as HydratedDocument<TaskRecord> | null;
  if (!updatedTask) return NextResponse.json({ error: "Task changed while you were adding a comment. Reload and try again." }, { status: 409 });
  return NextResponse.json({ ok: true, activity: updatedTask.activities.at(-1) }, { status: 201 });
}, ["administrator", "manager", "team_member"])(request);
