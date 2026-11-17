"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavGroup } from "./nav-group";
import { navGroups, navLinks } from "@/lib/nav-items";

function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderShell({
  overHero,
  scrolled,
  pathname,
}: {
  overHero: boolean;
  scrolled: boolean;
  pathname: string;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-b border-white/30 bg-alabaster/55 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo dark={overHero} big={overHero} />
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav
            className={`flex items-center gap-5 rounded-full px-5 py-2.5 shadow-[0_8px_30px_-12px_rgba(26,24,30,0.3)] backdrop-blur-md transition-colors duration-300 ${
              scrolled ? "bg-charcoal" : "bg-alabaster"
            }`}
            aria-label="Primary"
          >
            {navGroups.map((group, i) => (
              <span key={group.label} className="flex items-center gap-5">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className={scrolled ? "text-white/30" : "text-purple-600/30"}
                  >
                    &middot;
                  </span>
                )}
                <NavGroup
                  label={group.label}
                  items={group.items}
                  pathname={pathname}
                  scrolled={scrolled}
                />
              </span>
            ))}
            {navLinks.map((item) => {
              const active = isActiveHref(pathname, item.href);
              return (
                <span key={item.href} className="flex items-center gap-5">
                  <span
                    aria-hidden="true"
                    className={scrolled ? "text-white/30" : "text-purple-600/30"}
                  >
                    &middot;
                  </span>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors ${
                      scrolled
                        ? `font-medium ${active ? "text-gold-500" : "text-white/90 hover:text-gold-400"}`
                        : `font-bold ${active ? "text-purple-700" : "text-purple-600 hover:text-purple-700"}`
                    }`}
                  >
                    {item.label}
                  </Link>
                </span>
              );
            })}
          </nav>

          <Link
            href="/offices"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-charcoal shadow-[0_8px_30px_-12px_rgba(26,24,30,0.3)] transition-colors hover:bg-gold-600"
          >
            Contact
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </Link>
        </div>

        <MobileNav transparent={overHero} pathname={pathname} />
      </div>
    </header>
  );
}

/** Static, non-dynamic fallback rendered while the real header streams in under Cache Components/PPR. */
export function SiteHeaderFallback() {
  return <HeaderShell overHero={false} scrolled={false} pathname="" />;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <HeaderShell overHero={isHome && !scrolled} scrolled={scrolled} pathname={pathname} />;
}
