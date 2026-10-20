"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type CountUpProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Renders the final number on the server (so it is correct without JS and for crawlers),
 * then counts up on enter. The DOM text node is written directly, so there are no React
 * state updates while scrolling.
 */
export default function CountUp({ to, decimals = 0, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const node = ref.current?.firstChild;
      if (!node) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { value: 0 };
        node.nodeValue = format(0);
        gsap.to(counter, {
          value: to,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
          onUpdate: () => {
            node.nodeValue = format(counter.value);
          },
        });
        return () => {
          node.nodeValue = format(to);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
