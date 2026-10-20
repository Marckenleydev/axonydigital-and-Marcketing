import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/Reveal";
import type { LegalDoc } from "@/lib/legal";

/** Plain, readable document layout: no pinning, no scroll effects, just a contents list and text. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="legal-title" className="bg-ink px-5 pb-20 pt-40 text-bone md:px-8 md:pb-28 md:pt-48">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow text-lime">Legal</p>
            <Reveal as="h1" id="legal-title" className="display mt-6 text-[clamp(2.8rem,7vw,5.5rem)]">
              {doc.title}
            </Reveal>
            <p className="mt-6 text-[14px] text-bone/55">Last updated: {doc.updated}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">{doc.intro}</p>
          </div>
        </section>

        <section className="bg-bone px-5 py-16 text-ink md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
            <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow !text-[10px] text-ink/50">Contents</p>
              <ul className="mt-4 space-y-2.5 border-l border-ink/15 text-[14px]">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-ink/65 transition-colors hover:border-ink hover:text-ink">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="max-w-2xl">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-ink/10 pb-10 pt-10 first:pt-0 last:border-none">
                  <h2 className="display text-[1.9rem] md:text-[2.2rem]">{s.heading}</h2>
                  <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-ink/75">
                    {s.body.map((b, i) =>
                      typeof b === "string" ? (
                        <p key={i}>{b}</p>
                      ) : (
                        <ul key={i} className="space-y-2.5">
                          {b.list.map((li) => (
                            <li key={li} className="flex gap-3">
                              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-lime-deep" />
                              {li}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
      <Footer stacked={false} />
    </>
  );
}
