import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import FaqList from "@/components/FaqList";
import { faqs } from "@/lib/content";

export default function Faq({ z = 80 }: { z?: number }) {
  return (
    <Panel id="faq" labelledBy="faq-title" tone="light" z={z} innerClassName="px-5 py-28 pb-40 md:px-8 md:py-40 md:pb-52">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Rise>
            <p className="eyebrow text-ink/60">{faqs.eyebrow}</p>
          </Rise>
          <Reveal as="h2" id="faq-title" className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">
            {faqs.heading}
          </Reveal>
        </div>
        <Rise>
          <FaqList items={faqs.items} />
        </Rise>
      </div>
    </Panel>
  );
}
