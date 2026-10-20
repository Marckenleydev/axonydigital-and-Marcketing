import Link from "next/link";
import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";

type CtaBandProps = {
  z: number;
  heading?: string;
  text?: string;
  button?: string;
  tone?: "dark" | "light";
};

/** Compact closing call-to-action that leads to the contact page. */
export default function CtaBand({
  z,
  heading = "Ready to see where your next customers are hiding?",
  text = "Book a free audit. We'll review your channels and send a practical plan, with no obligation.",
  button = "Book your free audit",
  tone = "dark",
}: CtaBandProps) {
  const dark = tone === "dark";
  return (
    <Panel labelledBy="cta-title" tone={tone} z={z} fill={false} innerClassName="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <Reveal as="h2" id="cta-title" className="display text-[clamp(2.2rem,5.4vw,4.4rem)]">
            {heading}
          </Reveal>
          <Rise delay={0.1} className="mt-6 max-w-xl">
            <p className={dark ? "text-lg text-bone/70" : "text-lg text-ink/70"}>{text}</p>
          </Rise>
        </div>
        <Rise delay={0.15}>
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold transition-transform duration-300 hover:scale-[1.03] ${dark ? "bg-lime text-ink" : "bg-ink text-bone"}`}
          >
            {button}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Rise>
      </div>
    </Panel>
  );
}
