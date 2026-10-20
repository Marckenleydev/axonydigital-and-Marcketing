import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { pains } from "@/lib/content";

export default function Pain() {
  return (
    <Panel id="why" labelledBy="pain-title" tone="light" z={20} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p id="pain-title" className="eyebrow text-ink/60">
            {pains.eyebrow}
          </p>
        </Rise>

        <Reveal as="p" variant="scrub" className="display mt-8 max-w-5xl text-[clamp(2rem,5vw,4.25rem)]">
          {pains.scrub}
        </Reveal>

        <Rise group stagger={0.14} className="mt-20 grid gap-5 md:mt-28 md:grid-cols-3">
          {pains.items.map((item, i) => (
            <article key={item.problem} className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-bone-deep/60 p-7 md:p-8">
              <div>
                <p className="font-display text-5xl leading-none text-ink/25">0{i + 1}</p>
                <h3 className="display mt-6 text-[1.7rem] md:text-[1.9rem]">{item.problem}</h3>
              </div>
              <p className="mt-8 border-t border-ink/10 pt-5 text-[15px] leading-relaxed text-ink/70">
                <span className="mr-1 font-semibold text-ink">What we do instead:</span>
                {item.fix}
              </p>
            </article>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}
