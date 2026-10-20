import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import Parallax from "@/components/Parallax";
import { bio } from "@/lib/bio";

export function BioHero({ z = 10 }: { z?: number }) {
  return (
    <Panel labelledBy="bio-title" tone="dark" z={z} innerClassName="flex min-h-svh items-center px-5 pb-20 pt-28 md:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_34rem_at_85%_0%,rgba(200,244,58,0.13),transparent_60%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,88px_88px,88px_88px]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Rise>
            <p className="eyebrow text-lime">
              {bio.role} · {bio.studio}
            </p>
          </Rise>
          <h1 id="bio-title" className="mt-6">
            <Reveal as="span" variant="chars" trigger="load" delay={0.1} className="display block text-[clamp(3.2rem,10vw,8.5rem)] leading-[1]">
              {bio.name}
            </Reveal>
          </h1>
          <Rise delay={0.6} className="mt-8 max-w-xl">
            <p className="text-xl leading-relaxed text-bone/75 md:text-2xl">{bio.intro}</p>
          </Rise>
        </div>

        <Parallax distance={24}>
          {/* Swap for a real portrait with next/image when you have one. */}
          <div
            aria-hidden="true"
            className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-[2.5rem] bg-lime text-ink"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,11,10,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,11,10,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <span className="display relative text-[clamp(9rem,24vw,16rem)] italic leading-none">{bio.initial}</span>
          </div>
        </Parallax>
      </div>
    </Panel>
  );
}

export function BioStory({ z = 20 }: { z?: number }) {
  return (
    <Panel labelledBy="story-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p id="story-title" className="eyebrow text-ink/60">
            About me
          </p>
        </Rise>
        <Reveal as="p" variant="scrub" className="display mt-8 max-w-5xl text-[clamp(2rem,5vw,4.25rem)]">
          {bio.statement}
        </Reveal>
        <Rise group stagger={0.14} className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 md:gap-16">
          {bio.story.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed text-ink/75">
              {p}
            </p>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}

export function BioFocus({ z = 30 }: { z?: number }) {
  const { focus } = bio;
  return (
    <Panel labelledBy="focus-title" tone="dark" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{focus.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="focus-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {focus.heading}
        </Reveal>
        <Rise group stagger={0.12} className="mt-16 grid gap-4 md:grid-cols-3">
          {focus.items.map((f, i) => (
            <article key={f.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-display text-5xl leading-none text-lime">0{i + 1}</p>
              <h3 className="display mt-8 text-[1.8rem]">{f.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/70">{f.text}</p>
            </article>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}

export function BioStack({ z = 40 }: { z?: number }) {
  const { stack } = bio;
  return (
    <Panel labelledBy="stack-title" tone="light" z={z} fill={false} innerClassName="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-ink/60">{stack.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="stack-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {stack.heading}
        </Reveal>
        <Rise group stagger={0.07} y={24} className="mt-12 flex flex-wrap gap-3">
          {stack.items.map((s) => (
            <span key={s} className="rounded-full border border-ink/20 px-6 py-3 font-display text-2xl md:text-3xl">
              {s}
            </span>
          ))}
        </Rise>
      </div>
    </Panel>
  );
}

export function BioWork({ z = 50 }: { z?: number }) {
  const { work } = bio;
  return (
    <Panel labelledBy="work-title" tone="dark" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{work.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="work-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {work.heading}
        </Reveal>
        <Rise group stagger={0.1} y={24} className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {work.items.map((w) => (
            <div key={w.name} className="flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-8">
              <p className="display text-[clamp(1.8rem,3.6vw,3rem)]">{w.name}</p>
              <p className="text-[15px] text-bone/60 md:text-right">{w.kind}</p>
            </div>
          ))}
        </Rise>

        {(bio.email || bio.links.length > 0) && (
          <Rise className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
            {bio.email && (
              <a href={`mailto:${bio.email}`} className="text-lime underline decoration-lime/30 underline-offset-8 hover:decoration-lime">
                {bio.email}
              </a>
            )}
            {bio.links.map((l) => (
              <a key={l.href} href={l.href} rel="noopener noreferrer" className="text-bone/75 transition-colors hover:text-lime">
                {l.label}
              </a>
            ))}
          </Rise>
        )}
      </div>
    </Panel>
  );
}

export function BioFooter() {
  return (
    <footer data-panel style={{ zIndex: 90 }} className="relative -mt-8 rounded-t-[2rem] bg-bone px-5 py-10 text-ink shadow-[0_-30px_70px_-25px_rgba(0,0,0,0.45)] md:rounded-t-[2.75rem] md:px-8">
      <p className="mx-auto max-w-6xl text-[12px] text-ink/50">
        © {new Date().getFullYear()} {bio.name}
      </p>
    </footer>
  );
}
