"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RiseProps = {
  as?: ElementType;
  /** Animate each direct child in sequence instead of the wrapper itself. */
  group?: boolean;
  delay?: number;
  stagger?: number;
  y?: number;
  start?: string;
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Fade + short upward move on enter. Used for paragraphs, cards and mockups. */
export default function Rise({
  as: Tag = "div",
  group = false,
  delay = 0,
  stagger = 0.1,
  y = 36,
  start = "top 88%",
  id,
  className,
  children,
}: RiseProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          group ? Array.from(el.children) : el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: EASE.rise,
            delay,
            stagger: group ? stagger : 0,
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn(group ? "rise-group" : "rise", className)}>
      {children}
    </Tag>
  );
}
