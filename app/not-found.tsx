import Panel from "@/components/Panel";
import Reveal from "@/components/Reveal";
import Rise from "@/components/Rise";
import Link from "next/link";

export default function NotFound() {
  return (
    <Panel labelledBy="page-title" tone="dark" z={10} innerClassName="px-5 pb-24 pt-40 md:px-8 md:pb-32 md:pt-52">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_34rem_at_85%_0%,rgba(200,244,58,0.13),transparent_60%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,88px_88px,88px_88px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Rise>
          <p className="eyebrow text-lime">404</p>
        </Rise>
        <h1 id="page-title" className="mt-6 max-w-5xl">
          <Reveal as="span" variant="chars" trigger="load" delay={0.1} className="display block text-[clamp(2.8rem,7.6vw,6.4rem)]">
            Page not found
          </Reveal>
        </h1>
        <Rise delay={0.7} className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-bone/70 md:text-xl">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </Rise>
        <Rise delay={1} className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-6 py-3 text-lime transition-colors hover:bg-lime/20"
          >
            Go back home
          </Link>
        </Rise>
      </div>
    </Panel>
  );
}
