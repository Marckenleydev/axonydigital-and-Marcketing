import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = {
  id?: string;
  /** id of the heading that names this section (for assistive tech). */
  labelledBy?: string;
  tone: "dark" | "light";
  /** Stacking order: later panels must have a higher number. */
  z: number;
  /** Full viewport height (default). Set false for compact bands such as a CTA strip. */
  fill?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/**
 * A full-height layer in the stack. Background lives on the panel, content in
 * [data-panel-inner] (which is what scales back), and [data-panel-shade] is the depth overlay.
 * Contains no hooks, so it renders on the server.
 */
export default function Panel({ id, labelledBy, tone, z, fill = true, className, innerClassName, children }: PanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-panel
      style={{ zIndex: z }}
      className={cn(
        "relative -mt-8 overflow-clip rounded-t-[2rem] md:rounded-t-[2.75rem]",
        fill && "min-h-svh",
        "shadow-[0_-30px_70px_-25px_rgba(0,0,0,0.45)] first:mt-0 first:rounded-t-none first:shadow-none",
        tone === "dark" ? "bg-ink text-bone" : "bg-bone text-ink",
        className,
      )}
    >
      <div data-panel-inner className={cn("relative", innerClassName)}>
        {children}
      </div>
      <div
        data-panel-shade
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
      />
    </section>
  );
}
