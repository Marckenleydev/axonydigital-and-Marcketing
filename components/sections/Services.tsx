import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { services } from "@/lib/content";

const icons = [
  // SEO: magnifier + trend
  <path key="seo" d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21M7.5 12l2.2-2.2 2 2L14.5 9" />,
  // Performance: target
  <g key="ppc"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></g>,
  // Content: pen
  <path key="content" d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10zM13.5 7.5l3 3" />,
  // CRO: funnel
  <path key="cro" d="M3 5h18l-7 8v6l-4-2v-4z" />,
];

export default function Services() {
  return (
    <Panel id="services" labelledBy="services-title" tone="dark" z={30} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{services.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="services-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {services.heading}
        </Reveal>

        <Rise group stagger={0.12} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s, i) => (
            <article
              key={s.title}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-lime/50 hover:bg-white/[0.06]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-lime/10 text-lime">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[i]}
                </svg>
              </span>
              <h3 className="display mt-8 text-[1.8rem]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/70">{s.outcome}</p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[14px] text-bone/60">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-lime" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}
