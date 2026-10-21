import "server-only";

import { createHmac } from "node:crypto";
import CrmLoginLimit from "@/models/CrmLoginLimit";

const WINDOW_MS = 15 * 60 * 1000;
const IP_LIMIT = 30;
const ACCOUNT_LIMIT = 8;

type RateLimitRecord = { _id: string; count: number; resetAt: Date; expiresAt: Date };
type RateLimitCollection = {
  findOneAndUpdate(
    filter: { _id: string },
    update: Record<string, unknown>[],
    options: { upsert: true; returnDocument: "after"; includeResultMetadata: false },
  ): Promise<RateLimitRecord | null>;
  deleteOne(filter: { _id: string }): Promise<unknown>;
};

function keyFor(scope: "ip" | "account", value: string) {
  const secret = process.env.AUTH_SECRET;
  const minLength = process.env.NODE_ENV === "production" ? 43 : 32;
  if (!secret || secret.length < minLength) {
    throw new Error(`AUTH_SECRET must be configured with at least ${minLength} characters${process.env.NODE_ENV === "production" ? " in production" : ""}.`);
  }
  return createHmac("sha256", secret).update(`${scope}:${value}`).digest("hex");
}

async function incrementWindow(key: string, now: Date) {
  const resetAt = new Date(now.getTime() + WINDOW_MS);
  const activeWindow = { $gt: ["$resetAt", now] };
  const collection = CrmLoginLimit.collection as unknown as RateLimitCollection;
  const result = await collection.findOneAndUpdate(
    { _id: key },
    [
      {
        $set: {
          count: {
            $cond: [activeWindow, { $add: [{ $ifNull: ["$count", 0] }, 1] }, 1],
          },
          resetAt: { $cond: [activeWindow, "$resetAt", resetAt] },
          expiresAt: {
            $cond: [activeWindow, "$expiresAt", new Date(resetAt.getTime() + WINDOW_MS)],
          },
        },
      },
    ],
    { upsert: true, returnDocument: "after", includeResultMetadata: false },
  );

  if (!result) throw new Error("Failed to update login rate limit.");
  return result.count;
}

export async function consumeLoginAttempt(ip: string, email?: string) {
  const now = new Date();
  const ipCount = await incrementWindow(keyFor("ip", ip), now);
  const accountCount = email
    ? await incrementWindow(keyFor("account", email.toLowerCase()), now)
    : 0;

  return ipCount <= IP_LIMIT && (!email || accountCount <= ACCOUNT_LIMIT);
}

export async function clearAccountLoginAttempts(email: string) {
  const collection = CrmLoginLimit.collection as unknown as RateLimitCollection;
  await collection.deleteOne({ _id: keyFor("account", email.toLowerCase()) });
}
