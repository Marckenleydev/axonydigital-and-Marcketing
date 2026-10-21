import "server-only";

import { createHmac } from "node:crypto";
import PublicLeadLimit from "@/models/PublicLeadLimit";

const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 10;

type LimitResult = { _id: string; count: number; resetAt: Date; expiresAt: Date };
type LimitCollection = {
  findOneAndUpdate(filter: { _id: string }, update: Record<string, unknown>[], options: { upsert: true; returnDocument: "after"; includeResultMetadata: false }): Promise<LimitResult | null>;
};

export function getRequestAddress(request: Request) {
  const chain = request.headers.get("x-forwarded-for")?.split(",").map((part) => part.trim()).filter(Boolean);
  const forwarded = chain?.at(-1);
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function allowPublicLead(request: Request) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET is not configured.");
  const addressHash = createHmac("sha256", secret).update(`public-lead:${getRequestAddress(request)}`).digest("hex");
  const now = new Date();
  const resetAt = new Date(now.getTime() + WINDOW_MS);
  const activeWindow = { $gt: ["$resetAt", now] };
  const collection = PublicLeadLimit.collection as unknown as LimitCollection;
  const result = await collection.findOneAndUpdate({ _id: addressHash }, [{ $set: {
    count: { $cond: [activeWindow, { $add: [{ $ifNull: ["$count", 0] }, 1] }, 1] },
    resetAt: { $cond: [activeWindow, "$resetAt", resetAt] },
    expiresAt: { $cond: [activeWindow, "$expiresAt", new Date(resetAt.getTime() + WINDOW_MS)] },
  } }], { upsert: true, returnDocument: "after", includeResultMetadata: false });
  return Boolean(result && result.count <= LIMIT);
}
