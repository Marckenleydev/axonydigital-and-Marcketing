import { z } from "zod";
import { LEAD_PRIORITIES, LEAD_SERVICES } from "@/lib/validation/leads";

export const PROJECT_STATUSES = ["Planning", "In Progress", "On Hold", "Review", "Completed", "Cancelled"] as const;
const optional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const id = z.string().regex(/^[a-f\d]{24}$/i);
const fields = z.object({ name: z.string().trim().min(2).max(160), description: optional(5000), client: id,
  services: z.array(z.enum(LEAD_SERVICES)).max(LEAD_SERVICES.length).default([]), projectManager: id.optional().or(z.literal("")),
  teamMembers: z.array(id).max(100).default([]), budget: z.coerce.number().finite().min(0).max(1_000_000_000).nullable().optional(),
  startDate: z.coerce.date().nullable().optional(), dueDate: z.coerce.date().nullable().optional(),
  status: z.enum(PROJECT_STATUSES).default("Planning"), priority: z.enum(LEAD_PRIORITIES).default("Normal"),
  progress: z.coerce.number().int().min(0).max(100).default(0), deliverables: z.array(z.string().trim().min(1).max(300)).max(100).default([]), internalNotes: optional(10000) });
export const createProjectSchema = fields.refine((v) => !v.startDate || !v.dueDate || v.dueDate >= v.startDate, "Due date must be on or after the start date.");
export const updateProjectSchema = fields.partial().extend({ archived: z.boolean().optional(), services: z.array(z.enum(LEAD_SERVICES)).max(LEAD_SERVICES.length).optional(), teamMembers: z.array(id).max(100).optional(), deliverables: z.array(z.string().trim().min(1).max(300)).max(100).optional(), status: z.enum(PROJECT_STATUSES).optional(), priority: z.enum(LEAD_PRIORITIES).optional() }).refine((v) => Object.keys(v).length > 0, "Provide at least one field to update.").refine((v) => !v.startDate || !v.dueDate || v.dueDate >= v.startDate, "Due date must be on or after the start date.");
export const projectListQuerySchema = z.object({ q: z.string().trim().max(120).default(""), status: z.enum(PROJECT_STATUSES).optional(), priority: z.enum(LEAD_PRIORITIES).optional(), client: id.optional(), owner: id.optional(), archived: z.enum(["true", "false"]).default("false"), sort: z.enum(["createdAt", "updatedAt", "name", "dueDate", "status", "priority"]).default("createdAt"), order: z.enum(["asc", "desc"]).default("desc"), page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(25) });
