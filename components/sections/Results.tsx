import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import CountUp from "@/components/CountUp";
import { results, site } from "@/lib/content";

export default function Results({ z = 50 }: { z?: number }) {
  return (
    <Panel id="results" labelledBy="results-title" tone="dark" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">{results.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="results-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {results.heading}
        </Reveal>

        <Rise group stagger={0.1} className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-y border-white/10 py-12 md:grid-cols-4">
          {results.metrics.map((m) => (
            <div key={m.label}>
              <CountUp
                to={m.to}
                decimals={m.decimals}
                prefix={m.prefix}
                suffix={m.suffix}
                className="display block text-[clamp(2.8rem,7vw,5.5rem)] leading-none text-lime"
              />
              <p className="mt-3 max-w-[14rem] text-[14px] leading-snug text-bone/65">{m.label}</p>
            </div>
          ))}
        </Rise>

        <Rise group stagger={0.14} className="mt-16 grid gap-5 lg:grid-cols-3">
          {results.cases.map((c) => (
            <article key={c.client} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-[1.7rem]">{c.client}</h3>
                <span className="text-[11px] uppercase tracking-widest text-bone/45">{c.sector}</span>
              </div>
              <p className="mt-6 flex items-baseline gap-3 border-b border-white/10 pb-5">
                <span className="display text-5xl leading-none text-lime">{c.metric.value}</span>
                <span className="text-[13px] leading-tight text-bone/60">{c.metric.label}</span>
              </p>
              <dl className="mt-5 space-y-5 text-[14.5px] leading-relaxed">
                <div>
                  <dt className="eyebrow !text-[10px] text-bone/45">Challenge</dt>
                  <dd className="mt-1.5 text-bone/75">{c.challenge}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[10px] text-bone/45">Strategy</dt>
                  <dd className="mt-1.5 text-bone/75">{c.strategy}</dd>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <dt className="eyebrow !text-[10px] text-lime">Outcome</dt>
                  <dd className="mt-1.5 font-medium text-bone">{c.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </Rise>

        {site.showPlaceholderNotice && (
          <p className="mt-10 text-[12px] text-bone/40">
            Sample figures and case studies shown for layout. Replace with verified client results before publishing.
          </p>
        )}
      </div>
    </Panel>
  );
}
