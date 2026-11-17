"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { NavItem } from "@/lib/nav-items";

function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavGroup({
  label,
  items,
  pathname,
  scrolled,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  scrolled: boolean;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const isGroupActive = items.some((item) => isActiveHref(pathname, item.href));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && ref.current.open && !ref.current.contains(e.target as Node)) {
        ref.current.open = false;
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function closeMenu() {
    if (ref.current) ref.current.open = false;
  }

  return (
    <details ref={ref} className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-1 text-sm transition-colors [&::-webkit-details-marker]:hidden ${
          scrolled
            ? `font-medium ${isGroupActive ? "text-gold-500" : "text-white/90 hover:text-gold-400"}`
            : `font-bold ${isGroupActive ? "text-purple-700" : "text-purple-600 hover:text-purple-700"}`
        }`}
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="absolute left-0 top-full z-10 mt-3 w-52 rounded-2xl border border-border bg-white p-2 shadow-[0_20px_50px_-15px_rgba(26,24,30,0.25)]">
        {items.map((item) => {
          const active = isActiveHref(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-purple-50 text-purple-700" : "text-charcoal hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
