import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { aboutPage } from "@/lib/pages";

export default function AboutStory({ z = 20 }: { z?: number }) {
  return (
    <Panel id="story" labelledBy="story-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p id="story-title" className="eyebrow text-ink/60">
            Our story
          </p>
        </Rise>
        <Reveal as="p" variant="scrub" className="display mt-8 max-w-5xl text-[clamp(2rem,5vw,4.25rem)]">
          {aboutPage.statement}
        </Reveal>
        <Rise group stagger={0.14} className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 md:gap-16">
          {aboutPage.story.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed text-ink/75">
              {p}
            </p>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}
