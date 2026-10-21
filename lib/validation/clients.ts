import { z } from "zod";
import { LEAD_SERVICES } from "@/lib/validation/leads";

export const CLIENT_STATUSES = ["Active", "Paused", "Former"] as const;
const optional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const email = z.string().trim().email().max(254).transform((value) => value.toLowerCase()).optional().or(z.literal(""));
const phone = z.string().trim().max(40).transform((value) => value.replace(/[^\d+]/g, "")).refine((value) => !value || /^\+?\d{7,19}$/.test(value), "Enter a valid phone number.").optional().or(z.literal(""));
const id = z.string().regex(/^[a-f\d]{24}$/i);
const fields = z.object({
  contactName: z.string().trim().min(2).max(120), companyName: optional(160), email, phone,
  website: optional(200), industry: optional(100), address: optional(500),
  servicesPurchased: z.array(z.enum(LEAD_SERVICES)).max(LEAD_SERVICES.length).default([]),
  engagementValue: z.coerce.number().finite().min(0).max(1_000_000_000).nullable().optional(),
  billingNotes: optional(5000), accountOwner: id.optional().or(z.literal("")),
  status: z.enum(CLIENT_STATUSES).default("Active"), internalNotes: optional(10000),
});
export const createClientSchema = fields.refine((v) => Boolean(v.email || v.phone), "Add an email address or phone number.");
export const updateClientSchema = fields.partial().extend({ archived: z.boolean().optional(), servicesPurchased: fields.shape.servicesPurchased.optional(), status: z.enum(CLIENT_STATUSES).optional() }).refine((v) => Object.keys(v).length > 0, "Provide at least one field to update.");
export const clientListQuerySchema = z.object({ q: z.string().trim().max(120).default(""), status: z.enum(CLIENT_STATUSES).optional(), service: z.enum(LEAD_SERVICES).optional(), owner: id.optional(), archived: z.enum(["true", "false"]).default("false"), sort: z.enum(["createdAt", "updatedAt", "contactName", "companyName", "engagementValue", "status"]).default("createdAt"), order: z.enum(["asc", "desc"]).default("desc"), page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(25) });
export function normalizeClientPhone(value?: string | null) { if (!value) return undefined; const normalized = value.replace(/[^\d+]/g, ""); return normalized || undefined; }
