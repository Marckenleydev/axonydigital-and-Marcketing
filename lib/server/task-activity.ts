import { Types, type ClientSession } from "mongoose";
import type { ActiveCrmUser } from "@/lib/server/authorization";
import type { TaskRecord } from "@/models/Task";
import Lead from "@/models/Lead";
import Client from "@/models/Client";
import Project from "@/models/Project";

type Event = { type: string; details: string; metadata?: Record<string, unknown>; createdAt: Date };
export async function recordRelatedTaskActivity(task: Pick<TaskRecord, "lead" | "client" | "project" | "title">, actor: ActiveCrmUser, event: Event, session: ClientSession) {
  const relatedType = event.type.startsWith("task_") ? event.type : event.type === "created" ? "task_created" : event.type === "completed" ? "task_completed" : event.type === "assigned" ? "task_assigned" : event.type === "comment" ? "task_comment" : "task_updated";
  const item = { type: relatedType, actorId: new Types.ObjectId(actor.id), actorName: actor.name, details: `Task “${task.title}”: ${event.details}`.slice(0, 1000), createdAt: event.createdAt };
  const writes: Promise<{ matchedCount: number }>[] = [];
  if (task.lead) writes.push(Lead.updateOne({ _id: task.lead }, { $push: { activities: { $each: [item], $slice: -200 } } }, { session }));
  if (task.client) writes.push(Client.updateOne({ _id: task.client }, { $push: { activities: { $each: [item], $slice: -200 } } }, { session }));
  if (task.project) writes.push(Project.updateOne({ _id: task.project }, { $push: { activities: { $each: [item], $slice: -200 } } }, { session }));
  // MongoDB does not support parallel operations on one transaction session.
  for (const write of writes) {
    const result = await write;
    if (result.matchedCount !== 1) throw new Error("A related task record no longer exists; task activity transaction aborted.");
  }
}
