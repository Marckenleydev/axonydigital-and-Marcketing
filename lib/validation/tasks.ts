import { z } from "zod";
export const TASK_STATUSES = ["Todo", "In Progress", "Blocked", "Completed"] as const;
export const TASK_PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;
const id = z.string().regex(/^[a-f\d]{24}$/i);
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const dates = z.object({ startDate: z.coerce.date().nullable().optional(), dueDate: z.coerce.date().nullable().optional() });
const relations = z.object({ lead: id.optional().or(z.literal("")), client: id.optional().or(z.literal("")), project: id.optional().or(z.literal("")) });
const base = z.object({
  title: z.string().trim().min(2).max(180), description: optionalText(5000), status: z.enum(TASK_STATUSES).default("Todo"),
  priority: z.enum(TASK_PRIORITIES).default("Medium"), assignee: id.optional().or(z.literal("")),
  ...dates.shape, ...relations.shape, notes: optionalText(10000),
});
export const createTaskSchema = base.refine((value) => Boolean(value.lead || value.client || value.project), "Link the task to at least one CRM record.").refine((value) => !value.startDate || !value.dueDate || value.dueDate >= value.startDate, "Due date must be on or after the start date.");
export const updateTaskSchema = base.partial().extend({
  archived: z.boolean().optional(), status: z.enum(TASK_STATUSES).optional(), priority: z.enum(TASK_PRIORITIES).optional(),
  lead: id.optional().or(z.literal("")), client: id.optional().or(z.literal("")), project: id.optional().or(z.literal("")),
}).refine((value) => Object.keys(value).length > 0, "Provide at least one field to update.").refine((value) => !value.startDate || !value.dueDate || value.dueDate >= value.startDate, "Due date must be on or after the start date.");
export const taskListQuerySchema = z.object({
  q: z.string().trim().max(120).default(""), status: z.enum(TASK_STATUSES).optional(), priority: z.enum(TASK_PRIORITIES).optional(),
  assignee: id.optional(), client: id.optional(), project: id.optional(), lead: id.optional(), due: z.enum(["overdue", "soon", "any"]).optional(),
  archived: z.enum(["true", "false"]).default("false"), sort: z.enum(["createdAt", "updatedAt", "title", "dueDate", "status", "priority"]).default("dueDate"),
  order: z.enum(["asc", "desc"]).default("asc"), page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(25),
});
export const taskCommentSchema = z.object({ comment: z.string().trim().min(1).max(3000) });
export const teamListQuerySchema = z.object({ q: z.string().trim().max(120).default(""), role: z.enum(["administrator", "manager", "team_member"]).optional(), active: z.enum(["true", "false"]).optional(), page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(25), sort: z.enum(["name", "email", "role", "createdAt"]).default("name"), order: z.enum(["asc", "desc"]).default("asc") });
export const updateTeamMemberSchema = z.object({ role: z.enum(["administrator", "manager", "team_member"]).optional(), active: z.boolean().optional() }).refine((value) => Object.keys(value).length > 0, "Provide a role or active status to update.");
export const notificationUpdateSchema = z.object({ read: z.boolean().optional(), dismissed: z.boolean().optional() }).refine((value) => Object.keys(value).length > 0, "Provide a notification update.");
