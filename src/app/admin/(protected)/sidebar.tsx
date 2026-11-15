"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./nav-items";

function isActiveHref(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarShell({ pathname }: { pathname: string }) {
  return (
    <aside className="w-56 shrink-0 border-r border-border bg-white px-4 py-6">
      <p className="px-2 text-sm font-semibold text-purple-700">Cootow Law CMS</p>
      <nav className="mt-6 space-y-1">
        {adminNavItems.map((item) => {
          const active = isActiveHref(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-purple-50 font-medium text-purple-700"
                  : "text-slate hover:bg-surface hover:text-charcoal"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

/** Static, non-dynamic fallback rendered while the real sidebar streams in under Cache Components/PPR. */
export function SidebarFallback() {
  return <SidebarShell pathname="" />;
}

export function Sidebar() {
  const pathname = usePathname();
  return <SidebarShell pathname={pathname} />;
}
