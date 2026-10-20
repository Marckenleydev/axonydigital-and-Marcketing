"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Fixed pill header: brand, three page links, one conversion action. */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-3 top-3 z-[100] md:inset-x-6 md:top-5">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-ink/75 py-2 pl-5 pr-2 text-bone shadow-lg shadow-black/20 backdrop-blur-xl">
           <Link href="/" onClick={() => setOpen(false)} className="font-display text-xl leading-none tracking-tight">
            {site.short}
            <span className="text-lime">.</span>
            <span className="ml-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-bone/60">Digital</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-medium text-bone/70 transition-colors hover:text-bone",
                  pathname === l.href && "bg-white/10 text-bone",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="rounded-full bg-lime px-4 py-2 text-[13px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] md:px-5"
            >
              Free audit
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
              className="grid size-9 place-items-center rounded-full border border-white/15 md:hidden"
            >
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span className={cn("absolute left-0 h-px w-4 bg-bone transition-all", open ? "top-1 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-4 bg-bone transition-all", open ? "top-1 -rotate-45" : "top-2.5")} />
              </span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Mobile"
          hidden={!open}
          className="mt-2 rounded-3xl border border-white/10 bg-ink/95 p-3 text-bone shadow-xl backdrop-blur-xl md:hidden"
        >
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === l.href ? "page" : undefined}
              className={cn(
                "block rounded-2xl px-4 py-3.5 font-display text-2xl",
                pathname === l.href ? "bg-white/10 text-lime" : "text-bone/85",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
