import { z } from "zod";

const normalizedEmail = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(254)
  .transform((email) => email.toLowerCase());

export const loginSchema = z.object({
  email: normalizedEmail,
  password: z
    .string()
    .min(1)
    .refine((password) => new TextEncoder().encode(password).length <= 72),
});

export const bootstrapAdminSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: normalizedEmail,
  password: z
    .string()
    .min(8, "Use a password with at least 8 characters.")
    .refine((password) => new TextEncoder().encode(password).length <= 72, {
      message: "Bcrypt passwords must be no more than 72 bytes.",
    }),
});

export type LoginInput = z.output<typeof loginSchema>;
export type BootstrapAdminInput = z.output<typeof bootstrapAdminSchema>;
