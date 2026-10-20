import type { ReactNode } from "react";
import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** Optional italic, accent-coloured second line. */
  accent?: string;
  sub: string;
  z?: number;
  children?: ReactNode;
};

/** Opening dark panel for inner pages. The title is the page's only <h1>. */
export default function PageHero({ eyebrow, title, accent, sub, z = 10, children }: PageHeroProps) {
  return (
    <Panel labelledBy="page-title" tone="dark" z={z} innerClassName="px-5 pb-24 pt-40 md:px-8 md:pb-32 md:pt-52">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_34rem_at_85%_0%,rgba(200,244,58,0.13),transparent_60%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,88px_88px,88px_88px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{eyebrow}</p>
        </Rise>
        <h1 id="page-title" className="mt-6 max-w-5xl">
          <Reveal as="span" variant="chars" trigger="load" delay={0.1} className="display block text-[clamp(2.8rem,7.6vw,6.4rem)]">
            {title}
          </Reveal>
          {accent && (
            <Reveal as="span" variant="chars" trigger="load" delay={0.35} className="display block text-[clamp(2.8rem,7.6vw,6.4rem)] italic text-lime">
              {accent}
            </Reveal>
          )}
        </h1>
        <Rise delay={0.7} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-bone/70 md:text-xl">{sub}</p>
        </Rise>
        {children}
      </div>
    </Panel>
  );
}
