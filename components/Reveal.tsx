"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  /**
   * lines  – each line slides up through a mask
   * chars  – individual characters slide up through a mask (use sparingly, for hero-scale headlines)
   * words  – words rise and fade in sequence
   * scrub  – words go from dim to full as the visitor scrolls (scroll-linked)
   */
  variant?: "lines" | "chars" | "words" | "scrub";
  /** "scroll" plays when the element enters the viewport, "load" plays immediately. */
  trigger?: "scroll" | "load";
  delay?: number;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Text stays real, selectable, crawlable text in the DOM. SplitText only wraps it in spans and
 * adds aria-label automatically, so headings remain readable by screen readers and search engines.
 * `autoSplit` re-splits on font load and on resize so line breaks never go stale.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "lines",
  trigger = "scroll",
  delay = 0,
  id,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger =
          trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined;

        SplitText.create(el, {
          type: variant === "chars" ? "chars,words" : variant === "lines" ? "lines" : "words",
          mask: variant === "chars" ? "chars" : variant === "lines" ? "lines" : undefined,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });

            if (variant === "scrub") {
              return gsap.fromTo(
                self.words,
                { opacity: 0.14 },
                {
                  opacity: 1,
                  ease: EASE.scrub,
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
                },
              );
            }

            if (variant === "chars") {
              return gsap.from(self.chars, {
                yPercent: 115,
                duration: 1.1,
                ease: EASE.reveal,
                stagger: 0.022,
                delay,
                scrollTrigger,
              });
            }

            if (variant === "words") {
              return gsap.from(self.words, {
                yPercent: 40,
                opacity: 0,
                duration: 0.9,
                ease: EASE.rise,
                stagger: 0.06,
                delay,
                scrollTrigger,
              });
            }

            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: EASE.reveal,
              stagger: 0.09,
              delay,
              scrollTrigger,
            });
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}
