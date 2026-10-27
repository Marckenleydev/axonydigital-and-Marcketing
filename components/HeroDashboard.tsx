"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";

/**
 * Illustrative performance dashboard for the hero. The numbers are sample figures,
 * labelled as such, not client data.
 */
export default function HeroDashboard() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-line]", { strokeDashoffset: 1, duration: 2.2, ease: "power2.inOut", delay: 0.7 });
        gsap.from("[data-area]", { opacity: 0, duration: 1.4, delay: 1.6, ease: EASE.rise });
        gsap.from("[data-tile]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.12, delay: 0.5, ease: EASE.rise });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="img"
      aria-label="Illustrative marketing performance dashboard showing return on ad spend, cost per lead and a rising revenue chart"
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm md:p-6">
        <div className="flex items-center justify-between text-[11px] text-bone/60">
          <span className="eyebrow !text-[10px]">Campaign overview</span>
          <span>Last 90 days</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5 md:gap-3">
          {[
            { label: "ROAS", value: "4.2x" },
            { label: "Cost / lead", value: "−38%" },
            { label: "Leads", value: "+212" },
          ].map((t) => (
            <div key={t.label} data-tile className="rounded-2xl bg-white/[0.06] p-3">
              <p className="text-[10px] uppercase tracking-wider text-bone/55">{t.label}</p>
              <p className="mt-1 font-display text-2xl leading-none text-lime md:text-3xl">{t.value}</p>
            </div>
          ))}
        </div>

        <svg viewBox="0 0 400 170" className="mt-5 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c8f43a" stopOpacity="0.35" />
              <stop offset="1" stopColor="#c8f43a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#fff" strokeOpacity="0.07" />
          ))}
          <path
            data-area
            d="M0 150 C40 142 62 128 92 120 S150 104 182 90 S240 74 272 56 S340 34 400 14 V170 H0z"
            fill="url(#hero-area)"
          />
          <path
            d="M0 156 C50 152 80 148 120 144 S190 138 240 132 S330 122 400 114"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.28"
            strokeWidth="2"
            strokeDasharray="3 5"
          />
          <path
            data-line
            pathLength={1}
            strokeDasharray={1}
            d="M0 150 C40 142 62 128 92 120 S150 104 182 90 S240 74 272 56 S340 34 400 14"
            fill="none"
            stroke="#c8f43a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <p className="mt-2 text-[10px] text-bone/40">Real-time campaign performance.</p>
      </div>

      <div className="float-y absolute -left-3 -top-4 hidden rounded-2xl border border-white/10 bg-ink-soft px-3.5 py-2.5 text-[11px] shadow-xl md:block">
        <span className="mr-2 inline-block size-1.5 rounded-full bg-lime" />
        New qualified lead · website form
      </div>
    </div>
  );
}
