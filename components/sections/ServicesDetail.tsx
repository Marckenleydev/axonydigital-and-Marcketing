import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { servicesPage } from "@/lib/pages";

export default function ServicesDetail({ z = 20 }: { z?: number }) {
  return (
    <Panel id="what-we-do" labelledBy="detail-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-ink/60">What's included</p>
        </Rise>
        <Reveal as="h2" id="detail-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          Everything you need to grow, nothing you don't.
        </Reveal>

        <div className="mt-16 md:mt-24">
          {servicesPage.details.map((s, i) => (
            <article id={s.id} key={s.id} className="grid gap-8 border-t border-ink/15 py-12 md:grid-cols-12 md:gap-12 md:py-16">
              <Rise className="md:col-span-5" group stagger={0.08} y={24}>
                <p className="font-display text-6xl leading-none text-ink/20">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-[clamp(2rem,3.6vw,3rem)]">{s.title}</h3>
                <p className="mt-5 inline-flex rounded-full border border-ink/15 px-4 py-2 text-[13px] font-semibold">Best for: {s.bestFor}</p>
              </Rise>
              <Rise className="md:col-span-7" group stagger={0.08} y={24}>
                <p className="text-[17px] leading-relaxed text-ink/75">{s.summary}</p>
                <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink/80">
                      <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-lime-deep" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Rise>
            </article>
          ))}
        </div>
      </div>
    </Panel>
  );
}
