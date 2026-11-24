"use client";

import { useState } from "react";
import Link from "next/link";
import { navGroups, navLinks, isActiveHref } from "@/lib/nav-items";

export function MobileNav({
  transparent,
  pathname,
}: {
  transparent?: boolean;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className={`flex h-11 w-11 items-center justify-center transition-colors ${
          transparent ? "text-white hover:text-gold-400" : "text-charcoal hover:text-purple-600"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-border bg-alabaster shadow-[0_8px_30px_-12px_rgba(26,24,30,0.3)]"
        >
          <nav className="flex flex-col px-4 py-2">
            {navGroups.map((group) => {
              const groupActive = group.items.some((item) => isActiveHref(pathname, item.href));
              return (
                <details key={group.label} className="group border-b border-border/60 py-1" open={groupActive}>
                  <summary
                    aria-current={groupActive ? "page" : undefined}
                    className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-2 py-3 text-base font-medium [&::-webkit-details-marker]:hidden ${
                      groupActive ? "bg-purple-50 text-purple-700" : "text-charcoal"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {groupActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />}
                      {group.label}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-slate transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="flex flex-col gap-1 pb-3 pl-3">
                    {group.items.map((item) => {
                      const active = isActiveHref(pathname, item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-11 items-center gap-2 text-sm font-medium ${
                            active ? "text-purple-600" : "text-slate hover:text-purple-600"
                          }`}
                        >
                          {active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />}
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              );
            })}
            {navLinks.map((item) => {
              const active = isActiveHref(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2 border-b border-border/60 px-2 text-base font-medium ${
                    active ? "rounded-lg bg-purple-50 text-purple-600" : "text-charcoal hover:text-purple-600"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />}
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/offices"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-base font-semibold text-gold-600"
            >
              Contact &rarr;
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
