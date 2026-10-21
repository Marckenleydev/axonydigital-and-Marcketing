import assert from "node:assert/strict";
import { test } from "node:test";
import { conversionRate, monthlyBuckets, parseReportRange } from "@/lib/validation/reports";

test("report ranges use inclusive UTC calendar days, default to 365 days, and reject invalid or oversized ranges", () => {
  const now = new Date("2026-10-21T17:30:00.000Z");
  const defaults = parseReportRange({}, now);
  assert.ok(defaults);
  assert.equal(defaults.fromDay, "2025-10-22");
  assert.equal(defaults.toDay, "2026-10-22");
  const oneDay = parseReportRange({ from: "2026-10-21", to: "2026-10-21" }, now);
  assert.ok(oneDay);
  assert.equal(oneDay.from.toISOString(), "2026-10-21T00:00:00.000Z");
  assert.equal(oneDay.to.toISOString(), "2026-10-22T00:00:00.000Z");
  assert.equal(parseReportRange({ from: "2026-10-22", to: "2026-10-22" }, now), null);
  assert.equal(parseReportRange({ from: "2025-10-20", to: "2026-10-21" }, now), null);
  assert.equal(parseReportRange({ from: "2026-02-30", to: "2026-03-01" }, now), null);
  assert.equal(parseReportRange({ from: "2026-10-01" }, now), null);
  assert.equal(parseReportRange({ from: "2026-10-01", to: "2026-10-21", extra: "1" }, now), null);
});

test("conversion rate distinguishes empty cohorts from a true zero and monthly buckets fill missing months", () => {
  assert.equal(conversionRate(0, 0), null);
  assert.equal(conversionRate(0, 5), 0);
  assert.equal(conversionRate(1, 3), 33.3);
  const months = monthlyBuckets(new Date("2026-01-15T00:00:00Z"), new Date("2026-04-01T00:00:00Z"), [{ _id: "2026-01", count: 2 }, { _id: "2026-03", count: 1 }]);
  assert.deepEqual(months, [{ month: "2026-01", count: 2 }, { month: "2026-02", count: 0 }, { month: "2026-03", count: 1 }]);
});
