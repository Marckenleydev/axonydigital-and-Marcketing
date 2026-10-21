"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-[15px] text-bone placeholder:text-bone/35 transition-colors focus:border-lime focus:bg-white/[0.08] focus:outline-none";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(formData.entries());
    data.services = formData.getAll("services");

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-lime/40 bg-lime/10 p-8 text-center md:p-12">
        <p className="display text-4xl text-lime">You're on the list.</p>
        <p className="mt-4 text-bone/75">
          Thanks. We'll review your site and send your free growth blueprint shortly. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="rounded-3xl border border-white/10 bg-ink-soft p-6 md:p-9">
      <div className="grid gap-5">
        <div>
          <label htmlFor="lead-name" className="mb-2 block text-[13px] font-medium text-bone/75">
            Your name
          </label>
          <input id="lead-name" name="name" type="text" required autoComplete="name" maxLength={120} placeholder="Jane Cooper" className={field} />
        </div>
        <div>
          <label htmlFor="lead-email" className="mb-2 block text-[13px] font-medium text-bone/75">
            Work email
          </label>
          <input id="lead-email" name="email" type="email" required autoComplete="email" maxLength={200} placeholder="jane@company.com" className={field} />
        </div>
        <div>
          <label htmlFor="lead-site" className="mb-2 block text-[13px] font-medium text-bone/75">
            Website
          </label>
          <input id="lead-site" name="website" type="text" inputMode="url" required autoComplete="url" maxLength={200} placeholder="yourcompany.com" className={field} />
        </div>
        <div>
          <label htmlFor="lead-budget" className="mb-2 block text-[13px] font-medium text-bone/75">
            Current monthly marketing budget
          </label>
          <select id="lead-budget" name="budget" required defaultValue="" className={field}>
            <option value="" disabled>
              Select a range
            </option>
            {contact.budgets.map((b) => (
              <option key={b} value={b} className="text-ink">
                {b}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-2 block text-[13px] font-medium text-bone/75">Services you’re interested in <span className="text-bone/40">(optional)</span></legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {["Website development", "Meta Ads management", "Google Ads management", "Content production"].map((service) => (
              <label key={service} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-[13px] text-bone/65">
                <input type="checkbox" name="services" value={service} className="accent-lime" />{service}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="lead-company">Company</label>
          <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1 rounded-full bg-lime px-7 py-4 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : contact.button}
        </button>

        <p aria-live="polite" className={`min-h-5 text-[13px] ${status === "error" ? "text-red-300" : "text-bone/45"}`}>
          {status === "error" ? message : contact.privacy}
        </p>
      </div>
    </form>
  );
}
