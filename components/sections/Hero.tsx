import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import Parallax from "@/components/Parallax";
import HeroDashboard from "@/components/HeroDashboard";
import { hero, logos, certifications } from "@/lib/content";

export default function Hero() {
  const loop = [...logos, ...logos];
  return (
    <Panel id="top" labelledBy="hero-title" tone="dark" z={10} innerClassName="flex min-h-svh flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_85%_10%,rgba(200,244,58,0.13),transparent_60%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,88px_88px,88px_88px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-5 pb-12 pt-32 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <Rise>
            <p className="eyebrow text-lime">{hero.eyebrow}</p>
          </Rise>
          <h1 id="hero-title" className="mt-6">
            <Reveal as="span" variant="chars" trigger="load" delay={0.15} className="display block text-[clamp(3rem,8.4vw,7.2rem)]">
              {hero.headlineA}
            </Reveal>
            <Reveal as="span" variant="chars" trigger="load" delay={0.45} className="display block text-[clamp(3rem,8.4vw,7.2rem)] italic text-lime">
              {hero.headlineB}
            </Reveal>
          </h1>
          <Rise delay={0.9} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-bone/70 md:text-xl">{hero.sub}</p>
          </Rise>
          <Rise delay={1.1} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              {hero.primaryCta}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a href="/services" className="text-[15px] font-medium text-bone/80 underline decoration-white/30 underline-offset-8 transition-colors hover:text-lime hover:decoration-lime">
              {hero.secondaryCta}
            </a>
          </Rise>
          <Rise delay={1.25} className="mt-5">
            <p className="text-sm text-bone/50">{hero.reassurance}</p>
          </Rise>
        </div>

        <Parallax distance={28}>
          <HeroDashboard />
        </Parallax>
      </div>

      {/* Social proof strip, kept inside the first screen */}
      <div className="relative border-t border-white/10 py-7">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-bone/55 md:justify-start">
            <span className="eyebrow !text-[10px] text-bone/40">Trusted by growing brands · Certified</span>
            {certifications.map((c) => (
              <span key={c} className="rounded-full border border-white/15 px-3 py-1 text-bone/75">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="marquee-track items-center gap-14 pr-14" aria-label="Selected clients">
            {loop.map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= logos.length ? true : undefined}
                className={`${i >= logos.length ? "marquee-dup " : ""}shrink-0 font-display text-2xl tracking-tight text-bone/45 md:text-3xl`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
