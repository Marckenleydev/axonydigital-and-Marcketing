"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, EASE, MOTION_OK_DESKTOP } from "@/lib/gsap";

/** Gentle scroll-linked drift for large visuals. Desktop + motion-allowed only. */
export default function Parallax({
  children,
  distance = 36,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK_DESKTOP, () => {
        gsap.fromTo(
          el,
          { y: distance },
          {
            y: -distance,
            ease: EASE.scrub,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
