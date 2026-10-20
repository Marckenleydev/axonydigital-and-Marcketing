import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { testimonials, site } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export default function Testimonials({ z = 60 }: { z?: number }) {
  return (
    <Panel id="testimonials" labelledBy="testimonials-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-ink/60">{testimonials.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="testimonials-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {testimonials.heading}
        </Reveal>

        <Rise group stagger={0.14} className="mt-16 grid gap-5 lg:grid-cols-3">
          {testimonials.items.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-bone">
              <blockquote>
                <p aria-hidden="true" className="font-display text-6xl leading-none text-lime">“</p>
                <p className="display -mt-2 text-[1.55rem] leading-snug">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                {/* Swap this for a real headshot with next/image once you have permission to use one. */}
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-lime font-semibold text-ink">
                  {initials(t.name)}
                </span>
                <span className="text-[14px] leading-snug">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-bone/55">{t.role}</span>
                </span>
                {t.videoUrl && (
                  <a
                    href={t.videoUrl}
                    className="ml-auto shrink-0 rounded-full border border-white/20 px-3.5 py-2 text-[12px] font-semibold transition-colors hover:border-lime hover:text-lime"
                  >
                    Watch <span className="sr-only">{t.name}&rsquo;s video testimonial</span>
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </Rise>

        {site.showPlaceholderNotice && (
          <p className="mt-10 text-[12px] text-ink/45">Sample testimonials shown for layout. Replace with real, permissioned quotes before publishing.</p>
        )}
      </div>
    </Panel>
  );
}
