import Link from "next/link";
import { footer, nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Closing strip. On stacked pages it slides over the last panel like the others;
 * on plain pages (legal) pass stacked={false} for a normal footer.
 */
export default function Footer({ stacked = true }: { stacked?: boolean }) {
  return (
    <footer
      {...(stacked ? { "data-panel": true } : {})}
      style={stacked ? { zIndex: 90 } : undefined}
      className={cn(
        "relative bg-ink px-5 pb-10 pt-14 text-bone md:px-8",
        stacked && "-mt-8 rounded-t-[2rem] shadow-[0_-30px_70px_-25px_rgba(0,0,0,0.45)] md:rounded-t-[2.75rem]",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="display text-[clamp(2.5rem,8vw,5.5rem)] leading-none">
            {site.name}
            <span className="text-lime">.</span>
          </p>
          <nav aria-label="Footer" className="flex flex-col gap-5 text-[13px] text-bone/60 md:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-lime">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-5">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} rel="noopener noreferrer" className="transition-colors hover:text-lime">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-bone/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-lime">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
