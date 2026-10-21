import { z } from "zod";

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"] as const;
export const LEAD_PRIORITIES = ["Low", "Normal", "High", "Urgent"] as const;
export const LEAD_SOURCES = ["Website", "Referral", "Social", "Google", "Partner", "Other"] as const;
export const LEAD_SERVICES = ["Website development", "Meta Ads management", "Google Ads management", "Content production"] as const;

const trimmedOptional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const email = z.string().trim().email().max(254).transform((value) => value.toLowerCase());
const phone = z.string().trim().max(40).transform((value) => value.replace(/[^\d+]/g, "")).refine((value) => /^\+?\d{7,19}$/.test(value), "Enter a valid phone number.");
const urlOrDomain = z.string().trim().max(200).refine((value) => !value || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(value), "Enter a valid website address.");

export const publicLeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email,
  website: urlOrDomain,
  budget: z.string().trim().min(1, "Please choose a budget range.").max(80),
  company: trimmedOptional(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")).transform((value) => value ? value.replace(/[^\d+]/g, "") : undefined).refine((value) => !value || /^\+?\d{7,19}$/.test(value), "Enter a valid phone number."),
  services: z.array(z.enum(LEAD_SERVICES)).max(LEAD_SERVICES.length).optional().default([]),
  message: trimmedOptional(4000),
});

const leadFields = z.object({
  name: z.string().trim().min(2).max(120),
  company: trimmedOptional(160),
  email: email.optional(),
  phone: phone.optional().or(z.literal("")),
  website: urlOrDomain.optional(),
  industry: trimmedOptional(100),
  source: z.enum(LEAD_SOURCES),
  interestedServices: z.array(z.enum(LEAD_SERVICES)).max(LEAD_SERVICES.length).default([]),
  estimatedBudget: trimmedOptional(100),
  status: z.enum(LEAD_STATUSES).default("New"),
  priority: z.enum(LEAD_PRIORITIES).default("Normal"),
  assignedTo: z.string().regex(/^[a-f\d]{24}$/i).optional().or(z.literal("")),
  nextFollowUpAt: z.coerce.date().nullable().optional(),
  notes: trimmedOptional(10000),
});

export const createLeadSchema = leadFields.refine((value) => Boolean(value.email || value.phone), "Add an email address or phone number.");
export const updateLeadSchema = leadFields.partial().extend({
  interestedServices: z.array(z.enum(LEAD_SERVICES)).max(LEAD_SERVICES.length).optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  priority: z.enum(LEAD_PRIORITIES).optional(),
  archived: z.boolean().optional(),
}).refine((value) => Object.keys(value).length > 0, "Provide at least one field to update.");

export const leadListQuerySchema = z.object({
  q: z.string().trim().max(120).optional().default(""),
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
  priority: z.enum(LEAD_PRIORITIES).optional(),
  service: z.enum(LEAD_SERVICES).optional(),
  owner: z.string().regex(/^[a-f\d]{24}$/i).optional(),
  archived: z.enum(["true", "false"]).optional().default("false"),
  sort: z.enum(["createdAt", "updatedAt", "name", "nextFollowUpAt", "priority", "status"]).optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export type PublicLeadInput = z.output<typeof publicLeadSchema>;
export type CreateLeadInput = z.output<typeof createLeadSchema>;
export type UpdateLeadInput = z.output<typeof updateLeadSchema>;

export function normalizePhone(value?: string | null) {
  if (!value) return undefined;
  const normalized = value.replace(/[^\d+]/g, "");
  return normalized || undefined;
}
