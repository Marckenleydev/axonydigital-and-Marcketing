import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import { aboutPage } from "@/lib/pages";
import { site } from "@/lib/content";

export default function Team({ z = 40 }: { z?: number }) {
  const { team } = aboutPage;
  return (
    <Panel id="team" labelledBy="team-title" tone="light" z={z} innerClassName="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-ink/60">{team.eyebrow}</p>
        </Rise>
        <Reveal as="h2" id="team-title" className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
          {team.heading}
        </Reveal>
        <Rise group stagger={0.14} className="mt-16 grid gap-5 md:grid-cols-3">
          {team.people.map((p) => (
            <article key={p.name} className="rounded-3xl bg-bone-deep/70 p-7">
              {/* Replace with a real portrait using next/image once you have one. */}
              <div
                aria-hidden="true"
                className="grid aspect-[4/3] place-items-center rounded-2xl bg-ink font-display text-6xl text-lime"
              >
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="display mt-6 text-[1.7rem]">{p.name}</h3>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-ink/50">{p.role}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{p.bio}</p>
            </article>
          ))}
        </Rise>
        {site.showPlaceholderNotice && <p className="mt-10 text-[12px] text-ink/45">{team.notice}</p>}
      </div>
    </Panel>
  );
}
