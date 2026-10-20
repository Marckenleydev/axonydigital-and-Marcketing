"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE, MOTION_OK_DESKTOP } from "@/lib/gsap";

/**
 * Turns every `[data-panel]` inside it into a stacking layer.
 *
 * - Each panel is pinned (pinSpacing: false) once its bottom edge reaches the viewport
 *   bottom, so tall panels are read in full before being covered, and the next panel slides over it.
 * - While the next panel travels up, the panel underneath scales back slightly and darkens
 *   (a shade overlay is animated rather than the content opacity, which keeps text crisp).
 * - Desktop/tablet with motion allowed only. On phones and with reduced motion the panels simply
 *   stack in normal flow, so there is no pinning to fight the browser's own scrolling.
 */
export default function StackedPage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK_DESKTOP, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root.current);

        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          if (!next) return; // last panel is never covered, so it is never pinned

          const inner = panel.querySelector<HTMLElement>("[data-panel-inner]");
          const shade = panel.querySelector<HTMLElement>("[data-panel-shade]");

          ScrollTrigger.create({
            trigger: panel,
            start: () => (panel.offsetHeight > window.innerHeight + 1 ? "bottom bottom" : "top top"),
            // A compact panel is covered after scrolling its own height, a tall one after one viewport.
            end: () => `+=${Math.min(panel.offsetHeight, window.innerHeight)}`,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          if (inner) gsap.set(inner, { transformOrigin: "50% 100%" });

          const depth = gsap.timeline({
            defaults: { ease: EASE.scrub },
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          if (inner) depth.to(inner, { scale: 0.94, yPercent: -2 }, 0);
          if (shade) depth.to(shade, { opacity: 0.55 }, 0);
        });

        // Fonts and late layout shifts change panel heights; re-measure once everything has settled.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh);
        return () => window.removeEventListener("load", refresh);
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
