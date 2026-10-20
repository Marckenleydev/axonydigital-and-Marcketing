import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this in. Pretend success so bots learn nothing.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    website: clean(body.website, 200),
    budget: clean(body.budget, 80),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL.test(lead.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!/^[^\s]+\.[^\s]{2,}/.test(lead.website)) return NextResponse.json({ error: "Please enter your website address." }, { status: 400 });
  if (!lead.budget) return NextResponse.json({ error: "Please choose a budget range." }, { status: 400 });

  // Delivery: set LEAD_WEBHOOK_URL (Zapier, Make, Slack, HubSpot form endpoint, your CRM, etc.).
  // Without it the lead is accepted but not stored anywhere, so configure this before launch.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Lead delivery failed", err);
      return NextResponse.json({ error: "We couldn't send that just now. Please try again." }, { status: 502 });
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.warn("LEAD_WEBHOOK_URL is not set; lead was not delivered anywhere.");
  }

  return NextResponse.json({ ok: true });
}
