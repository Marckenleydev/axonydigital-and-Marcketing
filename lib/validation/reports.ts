import { z } from "zod";

const daySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, "Enter a valid calendar date.");
const reportQuerySchema = z.object({ from: daySchema.optional(), to: daySchema.optional() }).strict();

export type ReportRange = { from: Date; to: Date; fromDay: string; toDay: string };
export function parseReportRange(params: Record<string, string>, now = new Date()): ReportRange | null {
  const parsed = reportQuerySchema.safeParse(params);
  if (!parsed.success || Boolean(parsed.data.from) !== Boolean(parsed.data.to)) return null;
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const todayDay = today.toISOString().slice(0, 10);
  const defaultTo = todayDay;
  const defaultFrom = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const fromDay = parsed.data.from ?? defaultFrom;
  const inclusiveToDay = parsed.data.to ?? defaultTo;
  const from = new Date(`${fromDay}T00:00:00.000Z`);
  const inclusiveTo = new Date(`${inclusiveToDay}T00:00:00.000Z`);
  const to = new Date(inclusiveTo.getTime() + 24 * 60 * 60 * 1000);
  const span = to.getTime() - from.getTime();
  if (span <= 0 || span > 366 * 24 * 60 * 60 * 1000 || from > today || inclusiveTo > today || inclusiveTo < from) return null;
  return { from, to, fromDay, toDay: to.toISOString().slice(0, 10) };
}

export function conversionRate(converted: number, cohort: number): number | null {
  if (!Number.isFinite(converted) || !Number.isFinite(cohort) || cohort <= 0) return null;
  return Math.round((converted / cohort) * 1000) / 10;
}

export function monthlyBuckets(from: Date, to: Date, counts: { _id: string; count: number }[]) {
  const map = new Map(counts.map((item) => [item._id, item.count]));
  const result: { month: string; count: number }[] = [];
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), 1));
  while (cursor < to) {
    const month = cursor.toISOString().slice(0, 7);
    result.push({ month, count: map.get(month) ?? 0 });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return result;
}
