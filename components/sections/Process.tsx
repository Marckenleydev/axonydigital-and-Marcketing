import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { servicesPage } from "@/lib/pages";

export default function Process({ z = 30 }: { z?: number }) {
  const { process } = servicesPage;
  return (
    <Panel id="process" labelledBy="process-title" tone="dark" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{process.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="process-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {process.heading}
        </Reveal>

        <Rise group stagger={0.12} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <article key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-display text-6xl leading-none text-lime">{i + 1}</p>
              <h3 className="display mt-8 text-[1.9rem]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/70">{s.text}</p>
            </article>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}
