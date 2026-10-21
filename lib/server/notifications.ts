import "server-only";
import { Types } from "mongoose";
import CrmNotification from "@/models/CrmNotification";
import Task from "@/models/Task";
import Lead from "@/models/Lead";

type NotificationInput = { recipient: string; actor?: string; kind: "task_assigned" | "task_changed" | "task_due_soon" | "task_overdue" | "lead_follow_up_soon" | "lead_follow_up_overdue"; title: string; message: string; recordType: "task" | "lead"; recordId: string; href: string; dedupeKey: string };
export async function createNotification(input: NotificationInput) {
  try {
    await CrmNotification.updateOne({ dedupeKey: input.dedupeKey }, { $setOnInsert: { ...input, recipient: new Types.ObjectId(input.recipient), actor: input.actor ? new Types.ObjectId(input.actor) : undefined } }, { upsert: true });
  } catch (error) {
    // A concurrent upsert can race on the unique idempotency key. The winner is the notification to keep.
    if (!(error && typeof error === "object" && "code" in error && error.code === 11000)) throw error;
  }
}

export async function createDueNotifications(recipient: string, now = new Date()) {
  const horizon = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const tasks = await Task.find({ assignee: recipient, archived: false, status: { $ne: "Completed" }, dueDate: { $ne: null, $lte: horizon } }).select("_id title dueDate status").lean();
  for (const task of tasks) {
    const overdue = task.dueDate! < now;
    const dueDay = task.dueDate!.toISOString().slice(0, 10);
    await createNotification({ recipient, kind: overdue ? "task_overdue" : "task_due_soon", title: overdue ? "Task overdue" : "Task due soon", message: `${task.title} · due ${task.dueDate!.toLocaleString("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" })}.`, recordType: "task", recordId: String(task._id), href: `/admin/tasks/${task._id}`, dedupeKey: `task-deadline:${task._id}:${dueDay}` });
  }
  const leads = await Lead.find({ assignedTo: recipient, archived: false, nextFollowUpAt: { $ne: null, $lte: horizon } }).select("_id name nextFollowUpAt status").lean();
  for (const lead of leads) {
    const dueAt = lead.nextFollowUpAt!; const overdue = dueAt < now; const dueKey = dueAt.toISOString();
    await createNotification({ recipient, kind: overdue ? "lead_follow_up_overdue" : "lead_follow_up_soon", title: overdue ? "Lead follow-up overdue" : "Lead follow-up due soon", message: `${lead.name} · follow-up ${dueAt.toLocaleString("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" })}.`, recordType: "lead", recordId: String(lead._id), href: `/admin/leads`, dedupeKey: `lead-follow-up:${lead._id}:${dueKey}` });
  }
}
