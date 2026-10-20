"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Stops mobile address-bar resizes from re-triggering a full refresh mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** One timing language for the whole page. */
export const EASE = {
  reveal: "power4.out",
  rise: "power3.out",
  scrub: "none",
} as const;

/** Motion is only added when the visitor has not asked for less of it. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_OK_DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
