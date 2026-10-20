import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { clientsPage } from "@/lib/clients";
import { certifications, site } from "@/lib/content";

export default function ClientWall({ z = 20 }: { z?: number }) {
  const { wall } = clientsPage;
  return (
    <Panel id="clients" labelledBy="wall-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-ink/60">{wall.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="wall-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {wall.heading}
        </Reveal>

        <Rise group stagger={0.07} y={28} className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {wall.clients.map((c) => (
            <div
              key={c.name}
              className="group flex aspect-[4/3] flex-col justify-between rounded-3xl border border-ink/10 bg-bone-deep/50 p-5 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-bone md:p-6"
            >
              <span className="text-[11px] uppercase tracking-widest text-ink/45 transition-colors group-hover:text-lime">{c.sector}</span>
              <span className="display text-[1.6rem] leading-tight md:text-[2rem]">{c.name}</span>
            </div>
          ))}
        </Rise>

        <Rise className="mt-14 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-8">
          <span className="eyebrow !text-[10px] mr-2 text-ink/50">Accreditations</span>
          {certifications.map((c) => (
            <span key={c} className="rounded-full border border-ink/20 px-4 py-1.5 text-[13px] font-medium">
              {c}
            </span>
          ))}
        </Rise>

        {site.showPlaceholderNotice && <p className="mt-8 text-[12px] text-ink/45">{wall.notice}</p>}
      </div>
    </Panel>
  );
}
