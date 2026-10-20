"use client";

import { useId, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

type Item = { q: string; a: string };

/**
 * Accessible accordion (button + aria-expanded + labelled region). The open/close is a CSS grid-rows
 * transition, so no animation library is involved. Opening changes the panel height, so ScrollTrigger
 * is refreshed afterwards to keep the stacking math correct.
 */
export default function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  function toggle(i: number) {
    setOpen((cur) => (cur === i ? null : i));
    window.setTimeout(() => ScrollTrigger.refresh(), 450);
  }

  return (
    <div className="divide-y divide-ink/12 border-y border-ink/12">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="display text-[1.4rem] md:text-[1.75rem]">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-full border border-ink/20 text-xl leading-none transition-transform duration-300 ${isOpen ? "rotate-45 bg-ink text-bone" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`faq-panel grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-ink/70">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
