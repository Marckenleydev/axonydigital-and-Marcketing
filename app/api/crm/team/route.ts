import { NextResponse } from "next/server";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import CrmUser from "@/models/CrmUser";
import Task from "@/models/Task";
import { teamListQuerySchema } from "@/lib/validation/tasks";

export const GET = withCrmAuth(async (request) => {
  await connectMongo();
  const parsed = teamListQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid team filters." }, { status: 400 });
  const { q, role, active, page, limit, sort, order } = parsed.data;
  const filter: Record<string, any> = {};
  if (role) filter.role = role;
  if (active) filter.active = active === "true";
  if (q) { const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); filter.$or = [{ name: { $regex: escaped, $options: "i" } }, { email: { $regex: escaped, $options: "i" } }]; }
  const direction = order === "asc" ? 1 : -1;
  const [users, total] = await Promise.all([
    CrmUser.find(filter).select("name email role active createdAt updatedAt").sort({ [sort]: direction, _id: direction }).skip((page - 1) * limit).limit(limit).lean(),
    CrmUser.countDocuments(filter),
  ]);
  const ids = users.map((user) => user._id);
  const [taskCounts, openCounts] = await Promise.all([
    Task.aggregate([{ $match: { assignee: { $in: ids }, archived: false } }, { $group: { _id: "$assignee", count: { $sum: 1 } } }]),
    Task.aggregate([{ $match: { assignee: { $in: ids }, archived: false, status: { $ne: "Completed" } } }, { $group: { _id: "$assignee", count: { $sum: 1 } } }]),
  ]);
  const all = new Map(taskCounts.map((row) => [String(row._id), row.count])); const open = new Map(openCounts.map((row) => [String(row._id), row.count]));
  return NextResponse.json({ members: users.map((user) => ({ ...user, assignedTaskCount: all.get(String(user._id)) || 0, openTaskCount: open.get(String(user._id)) || 0 })), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}, ["administrator"]);
