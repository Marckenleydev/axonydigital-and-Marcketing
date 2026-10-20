import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { aboutPage } from "@/lib/pages";

export default function Values({ z = 30 }: { z?: number }) {
  const { values } = aboutPage;
  return (
    <Panel id="values" labelledBy="values-title" tone="dark" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{values.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="values-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {values.heading}
        </Reveal>
        <Rise group stagger={0.12} className="mt-16 grid gap-4 md:grid-cols-2">
          {values.items.map((v, i) => (
            <article key={v.title} className="flex gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
              <p className="font-display text-5xl leading-none text-lime">0{i + 1}</p>
              <div>
                <h3 className="display text-[1.8rem]">{v.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-bone/70">{v.text}</p>
              </div>
            </article>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}
