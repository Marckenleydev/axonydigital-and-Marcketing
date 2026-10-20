import type { ReactNode } from "react";
import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import Parallax from "@/components/Parallax";
import {
  SearchAdMock,
  YouTubeAdMock,
  DisplayAdMock,
  ShoppingAdMock,
  DemandGenMock,
  PerformanceMaxMock,
  LocalAdMock,
} from "@/components/ads/Mockups";
import { adShowcase, type AdFormatId } from "@/lib/content";
import { cn } from "@/lib/utils";

const mockups: Record<AdFormatId, { node: ReactNode; label: string; stage: string }> = {
  search: { node: <SearchAdMock />, label: "Illustrative mockup of a Google Search results page with a sponsored listing", stage: "from-sky-200/70 to-sky-100/30" },
  youtube: { node: <YouTubeAdMock />, label: "Illustrative mockup of an in-stream YouTube video ad with a call-to-action", stage: "from-rose-200/70 to-orange-100/30" },
  display: { node: <DisplayAdMock />, label: "Illustrative mockup of display banner ads on a website and in a mobile app", stage: "from-lime-200/80 to-emerald-100/30" },
  shopping: { node: <ShoppingAdMock />, label: "Illustrative mockup of Google Shopping product listings with prices", stage: "from-amber-200/70 to-yellow-100/30" },
  demandgen: { node: <DemandGenMock />, label: "Illustrative mockup of Demand Gen ads in YouTube, Discover and Gmail", stage: "from-fuchsia-200/60 to-violet-100/30" },
  pmax: { node: <PerformanceMaxMock />, label: "Illustrative diagram of Performance Max distributing creative assets across Google channels", stage: "from-neutral-300/70 to-neutral-200/30" },
  local: { node: <LocalAdMock />, label: "Illustrative mockup of a local business ad in Google Maps", stage: "from-teal-200/70 to-cyan-100/30" },
};

export default function AdsShowcase({ z = 40 }: { z?: number }) {
  return (
    <Panel id="ads" labelledBy="ads-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-ink/60">{adShowcase.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="ads-title" className="display mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5rem)]">
          {adShowcase.heading}
        </Reveal>
        <Rise delay={0.1} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-ink/70">{adShowcase.intro}</p>
        </Rise>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
          {adShowcase.formats.map((f, i) => {
            const m = mockups[f.id];
            const flip = i % 2 === 1;
            return (
              <article key={f.id} className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                <div className={cn("md:col-span-5", flip && "md:order-2")}>
                  <Rise group stagger={0.08} y={24}>
                    <p className="font-display text-6xl leading-none text-ink/20 md:text-7xl">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display mt-5 text-[clamp(1.9rem,3.4vw,2.8rem)]">{f.title}</h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-ink/70">{f.description}</p>
                    <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13px] font-semibold">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-lime-deep" />
                      Objective: {f.objective}
                    </p>
                  </Rise>
                </div>

                <div className={cn("md:col-span-7", flip && "md:order-1")}>
                  <Rise y={48} start="top 85%">
                    <div className={cn("rounded-[2rem] bg-gradient-to-br p-4 sm:p-8 md:p-10", m.stage)}>
                      <Parallax distance={18}>
                        <div role="img" aria-label={m.label}>
                          <div aria-hidden="true">{m.node}</div>
                        </div>
                      </Parallax>
                    </div>
                  </Rise>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-24 max-w-3xl text-[13px] leading-relaxed text-ink/50 md:mt-32">{adShowcase.disclaimer}</p>
      </div>
    </Panel>
  );
}
