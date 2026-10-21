import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/server/mongodb";
import { allowPublicLead } from "@/lib/server/public-lead-rate-limit";
import { receivePublicLead } from "@/lib/server/leads";
import { readBoundedJson } from "@/lib/server/request-body";
import { publicLeadSchema } from "@/lib/validation/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readBoundedJson(request, 16 * 1024);
  if (!body.ok) return NextResponse.json({ error: body.reason === "too_large" ? "Request is too large." : "Invalid request. Please review the form and try again." }, { status: body.reason === "too_large" ? 413 : 400 });
  const raw = body.value;

  // Preserve the existing honeypot behavior: return success to likely bots.
  if (raw && typeof raw === "object" && "company" in raw && typeof raw.company === "string" && raw.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  try {
    await connectMongo();
    if (!(await allowPublicLead(request))) {
      return NextResponse.json({ error: "Too many requests. Please wait a little and try again." }, { status: 429 });
    }
    const parsed = publicLeadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please review the form and try again." }, { status: 400 });
    }
    await receivePublicLead(parsed.data);
    // Keep the existing optional webhook integration as a secondary delivery
    // path. MongoDB remains the source of truth if this notification is down.
    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      try {
        const endpoint = new URL(webhook);
        if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) {
          throw new Error("Webhook endpoint must be a credential-free HTTPS URL.");
        }
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: parsed.data.name,
            email: parsed.data.email,
            website: parsed.data.website,
            budget: parsed.data.budget,
            services: parsed.data.services,
            receivedAt: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(5_000),
          redirect: "error",
        });
      } catch (error) {
        console.error("Lead webhook notification failed:", error instanceof Error ? error.name : "unknown error");
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Public lead submission failed:", error instanceof Error ? error.name : "unknown error");
    return NextResponse.json({ error: "We couldn't send that just now. Please try again." }, { status: 503 });
  }
}
