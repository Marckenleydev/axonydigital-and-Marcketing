import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import LeadForm from "@/components/LeadForm";
import { contact, site } from "@/lib/content";

type ContactProps = {
  z?: number;
  /** Render the page's main heading as <h1> and show direct contact details. */
  page?: boolean;
};

export default function Contact({ z = 70, page = false }: ContactProps) {
  return (
    <Panel id="contact" labelledBy="contact-title" tone="dark" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_32rem_at_15%_0%,rgba(200,244,58,0.14),transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <Rise>
            <p className="eyebrow text-lime">{contact.eyebrow}</p>
          </Rise>
          <Reveal as={page ? "h1" : "h2"} id="contact-title" className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">
            {contact.heading}
          </Reveal>
          <Rise delay={0.1} className="mt-8 max-w-lg">
            <p className="text-lg leading-relaxed text-bone/70">{contact.sub}</p>
          </Rise>
          <Rise group stagger={0.1} className="mt-10 space-y-4">
            {contact.perks.map((p) => (
              <p key={p} className="flex gap-3.5 text-[15.5px] text-bone/85">
                <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-[11px] font-bold text-ink">
                  ✓
                </span>
                {p}
              </p>
            ))}
          </Rise>

          {page && (
            <Rise delay={0.1} className="mt-12 border-t border-white/10 pt-8">
              <p className="eyebrow !text-[10px] text-bone/45">Prefer email?</p>
              <a href={`mailto:${site.email}`} className="display mt-2 inline-block text-3xl text-lime underline decoration-lime/30 underline-offset-8 transition-colors hover:decoration-lime">
                {site.email}
              </a>
              <p className="mt-3 text-[14px] text-bone/55">We reply {site.responseTime}.</p>
            </Rise>
          )}
        </div>

        <Rise y={48}>
          <LeadForm />
        </Rise>
      </div>
    </Panel>
  );
}
