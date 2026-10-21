import assert from "node:assert/strict";
import test from "node:test";
import { createLeadSchema, leadListQuerySchema, normalizePhone, publicLeadSchema, updateLeadSchema } from "@/lib/validation/leads";

test("public lead validation normalizes email and phone and preserves selected services", () => {
  const parsed = publicLeadSchema.parse({
    name: "  Jamie Lee ", email: " JAMIE@EXAMPLE.COM ", website: "example.com",
    budget: "AED 5k–15k", phone: "+971 (50) 123-4567", services: ["Website development"], company: "",
  });
  assert.equal(parsed.name, "Jamie Lee");
  assert.equal(parsed.email, "jamie@example.com");
  assert.equal(parsed.phone, "+971501234567");
  assert.deepEqual(parsed.services, ["Website development"]);
});

test("public lead validation rejects invalid email, phone, and service values", () => {
  const invalid = publicLeadSchema.safeParse({
    name: "J", email: "invalid", website: "example.com", budget: "range", phone: "++1234567", services: ["Unsupported"],
  });
  assert.equal(invalid.success, false);
  assert.equal(normalizePhone("+1 (415) 555-0123"), "+14155550123");
});

test("CRM lead requires at least one normalized contact method", () => {
  const result = createLeadSchema.safeParse({ name: "Jamie Lee", source: "Website" });
  assert.equal(result.success, false);
  const valid = createLeadSchema.parse({ name: "Jamie Lee", email: "JAMIE@EXAMPLE.COM", source: "Website" });
  assert.equal(valid.email, "jamie@example.com");
});

test("lead filters enforce bounded pagination and allowlisted sorting", () => {
  assert.equal(leadListQuerySchema.parse({ page: "2", limit: "50", sort: "name", order: "asc" }).limit, 50);
  assert.equal(leadListQuerySchema.safeParse({ limit: "500" }).success, false);
  assert.equal(leadListQuerySchema.safeParse({ sort: "email" }).success, false);
});

test("lead updates require a field and reject unsupported status values", () => {
  assert.equal(updateLeadSchema.safeParse({}).success, false);
  assert.equal(updateLeadSchema.safeParse({ status: "Unknown" }).success, false);
  assert.equal(updateLeadSchema.safeParse({ status: "Qualified" }).success, true);
});
