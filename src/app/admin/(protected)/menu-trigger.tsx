"use client";

import { MenuIcon } from "@/lib/icons";
import { useSidebar } from "./sidebar-context";

/** Mobile-only hamburger button that opens the sidebar drawer. Split out from
 * Topbar (a server component) since it needs the client-only sidebar context. */
export function MenuTrigger() {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Open navigation menu"
      className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-charcoal transition-colors hover:bg-surface lg:hidden"
    >
      <MenuIcon className="h-6 w-6" />
    </button>
  );
}
