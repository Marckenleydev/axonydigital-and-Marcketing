import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { conversionRate, monthlyBuckets, parseReportRange } from "@/lib/validation/reports";
import Lead from "@/models/Lead";
import LeadConflict from "@/models/LeadConflict";
import ClientConversionConflict from "@/models/ClientConversionConflict";
import Client from "@/models/Client";
import Project from "@/models/Project";
import Task from "@/models/Task";
import CrmUser from "@/models/CrmUser";
import { teamMemberTaskAccessFilter } from "@/lib/server/task-references";

const toCountMap = (rows: { _id: string; count: number }[]) => Object.fromEntries(rows.map((row) => [row._id, row.count]));
const countBy = (field: string) => [{ $group: { _id: `$${field}`, count: { $sum: 1 } } }, { $sort: { _id: 1 as const } }];

function activityPipeline(scope: Record<string, unknown>, label: Record<string, unknown>) {
  return [
    { $match: scope },
    { $project: { activities: 1, ...label } },
    { $unwind: "$activities" },
    { $sort: { "activities.createdAt": -1 } },
    { $limit: 8 },
    { $project: { _id: 0, recordId: "$_id", recordName: "$recordName", eventType: "$activities.type", actorName: "$activities.actorName", createdAt: "$activities.createdAt" } },
  ];
}

export const GET = withCrmAuth(async (request, user) => {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  const range = parseReportRange(params);
  if (!range) return NextResponse.json({ error: "Use valid UTC dates no more than 366 days apart, ending no later than today." }, { status: 400 });
  await connectMongo();
  const userId = new Types.ObjectId(user.id);
  const memberScope = user.role === "team_member";
  const leadScope: Record<string, unknown> = { archived: false, ...(memberScope ? { assignedTo: userId } : {}) };
  const clientScope: Record<string, unknown> = { archived: false, ...(memberScope ? { accountOwner: userId } : {}) };
  const projectScope: Record<string, unknown> = { archived: false, ...(memberScope ? { $or: [{ projectManager: userId }, { teamMembers: userId }] } : {}) };
  const taskScope: Record<string, unknown> = memberScope
    ? await teamMemberTaskAccessFilter(userId)
    : { archived: false };
  const cohortScope = { ...leadScope, createdAt: { $gte: range.from, $lt: range.to } };
  const upcomingEdge = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();

  const [
    totalLeads, leadsByStatus, newLeads, convertedLeads, leadBuckets, leadsBySource, services,
    activeClients, projectsByStatus, progress, tasksByStatus, tasksByPriority, completedTasks,
    overdueTasks, upcomingTasks, overdueFollowUps, upcomingFollowUps, leadConflictCount,
    conversionConflictCount, recentLeadActivity, recentClientActivity, recentProjectActivity,
    recentTaskActivity, workload, activeWorkforce,
  ] = await Promise.all([
    Lead.countDocuments(leadScope),
    Lead.aggregate([{ $match: leadScope }, ...countBy("status")]),
    Lead.countDocuments(cohortScope),
    Lead.countDocuments({ ...cohortScope, convertedClientId: { $ne: null } }),
    Lead.aggregate([{ $match: cohortScope }, { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt", timezone: "UTC" } }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Lead.aggregate([{ $match: cohortScope }, ...countBy("source")]),
    Lead.aggregate([{ $match: cohortScope }, { $unwind: { path: "$interestedServices", preserveNullAndEmptyArrays: false } }, { $group: { _id: { lead: "$_id", service: "$interestedServices" } } }, { $group: { _id: "$_id.service", count: { $sum: 1 } } }, { $sort: { count: -1, _id: 1 } }]),
    Client.countDocuments({ ...clientScope, status: "Active" }),
    Project.aggregate([{ $match: projectScope }, ...countBy("status")]),
    Project.aggregate([{ $match: projectScope }, { $group: { _id: null, average: { $avg: "$progress" }, count: { $sum: 1 } } }]),
    Task.aggregate([{ $match: taskScope }, ...countBy("status")]),
    Task.aggregate([{ $match: taskScope }, ...countBy("priority")]),
    Task.countDocuments({ ...taskScope, status: "Completed", completedAt: { $gte: range.from, $lt: range.to } }),
    Task.countDocuments({ ...taskScope, status: { $ne: "Completed" }, dueDate: { $lt: now } }),
    Task.find({ ...taskScope, status: { $ne: "Completed" }, dueDate: { $gte: now, $lte: upcomingEdge } }).select("title status priority dueDate assignee").populate("assignee", "name").sort({ dueDate: 1 }).limit(8).lean(),
    Lead.countDocuments({ ...leadScope, nextFollowUpAt: { $lt: now } }),
    Lead.find({ ...leadScope, nextFollowUpAt: { $gte: now, $lte: upcomingEdge } }).select("name company status nextFollowUpAt").sort({ nextFollowUpAt: 1 }).limit(8).lean(),
    LeadConflict.countDocuments({ status: "pending", createdAt: { $gte: range.from, $lt: range.to }, ...(memberScope ? { matchedLeadIds: { $in: await Lead.find(leadScope).distinct("_id") } } : {}) }),
    ClientConversionConflict.countDocuments({ status: "pending", createdAt: { $gte: range.from, $lt: range.to }, ...(memberScope ? { leadId: { $in: await Lead.find(leadScope).distinct("_id") } } : {}) }),
    Lead.aggregate(activityPipeline(leadScope, { recordName: "$name" }) as never[]),
    Client.aggregate(activityPipeline(clientScope, { recordName: { $ifNull: ["$companyName", "$contactName"] } }) as never[]),
    Project.aggregate(activityPipeline(projectScope, { recordName: "$name" }) as never[]),
    Task.aggregate(activityPipeline(taskScope, { recordName: "$title" }) as never[]),
    memberScope ? Task.aggregate([{ $match: taskScope }, { $group: { _id: "$assignee", assigned: { $sum: 1 }, completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } }, overdue: { $sum: { $cond: [{ $and: [{ $ne: ["$status", "Completed"] }, { $lt: ["$dueDate", now] }] }, 1, 0] } } } }]) : Task.aggregate([{ $match: taskScope }, { $group: { _id: "$assignee", assigned: { $sum: 1 }, completed: { $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } }, overdue: { $sum: { $cond: [{ $and: [{ $ne: ["$status", "Completed"] }, { $lt: ["$dueDate", now] }] }, 1, 0] } } } }, { $lookup: { from: CrmUser.collection.name, localField: "_id", foreignField: "_id", as: "member" } }, { $unwind: { path: "$member", preserveNullAndEmptyArrays: true } }, { $project: { assigned: 1, completed: 1, overdue: 1, name: { $ifNull: ["$member.name", "Unassigned"] } } }, { $sort: { name: 1 } }]),
    memberScope ? Promise.resolve([]) : CrmUser.find({ active: true }).select("name").sort({ name: 1 }).lean(),
  ]);

  const recentActivity = [...recentLeadActivity.map((entry) => ({ ...entry, recordType: "lead", href: "/admin/leads" })), ...recentClientActivity.map((entry) => ({ ...entry, recordType: "client", href: `/admin/clients/${entry.recordId}` })), ...recentProjectActivity.map((entry) => ({ ...entry, recordType: "project", href: `/admin/projects/${entry.recordId}` })), ...recentTaskActivity.map((entry) => ({ ...entry, recordType: "task", href: `/admin/tasks/${entry.recordId}` }))].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 12);
  const taskStatusCounts = toCountMap(tasksByStatus);
  const projectStatusCounts = toCountMap(projectsByStatus);
  const workloadRows = workload.map((entry: { _id?: Types.ObjectId; assigned: number; completed: number; overdue: number; name?: string }) => ({ userId: entry._id ? String(entry._id) : null, name: entry.name, assigned: entry.assigned, completed: entry.completed, overdue: entry.overdue }));
  const workloadByUser = new Map(workloadRows.map((item) => [item.userId, item]));
  if (!memberScope) for (const member of activeWorkforce) {
    const id = String(member._id);
    if (!workloadByUser.has(id)) workloadRows.push({ userId: id, name: member.name, assigned: 0, completed: 0, overdue: 0 });
  }
  workloadRows.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
  return NextResponse.json({
    range: { from: range.fromDay, toExclusive: range.toDay, timezone: "UTC" },
    definitions: { totalLeads: "Current non-archived leads in your accessible records.", newLeads: "Leads created in the selected UTC date range; both selected calendar days are included.", conversionRate: "Leads in the selected creation-date cohort with a linked convertedClientId divided by all leads created in that range; null means no leads in the cohort.", completedTasks: "Tasks completedAt in the selected UTC date range.", pendingTasks: "Current non-archived tasks whose status is not Completed.", overdueTasks: "Non-completed, non-archived tasks with dueDate before the current server time.", teamWorkload: "Assigned and overdue are current non-archived task counts; completed is the current task status, not a historical date-range total." },
    kpis: { totalLeads, newLeads, convertedLeads, conversionRate: conversionRate(convertedLeads, newLeads), activeClients, activeProjects: Object.entries(projectStatusCounts).filter(([status]) => !["Completed", "Cancelled"].includes(status)).reduce((sum, [, count]) => sum + count, 0), completedTasks, pendingTasks: Object.entries(taskStatusCounts).filter(([status]) => status !== "Completed").reduce((sum, [, count]) => sum + count, 0), overdueTasks, overdueFollowUps },
    leadsByStatus: toCountMap(leadsByStatus), projectsByStatus: projectStatusCounts, tasksByStatus: taskStatusCounts, tasksByPriority: toCountMap(tasksByPriority), leadsOverTime: monthlyBuckets(range.from, range.to, leadBuckets), leadsBySource: toCountMap(leadsBySource), servicesInterest: services.map((row) => ({ service: row._id, count: row.count })), projectProgress: { count: progress[0]?.count ?? 0, average: progress.length ? Math.round(progress[0].average) : null }, duplicateConflicts: { leads: leadConflictCount, conversions: conversionConflictCount }, upcomingTasks, upcomingFollowUps, recentActivity,
    teamWorkload: memberScope ? workloadRows.map(({ assigned, completed, overdue }) => ({ assigned, completed, overdue })) : workloadRows,
  });
}, ["administrator", "manager", "team_member"]);
