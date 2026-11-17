import Link from "next/link";
import type { CurrentAdmin } from "@/lib/auth";
import { BellIcon, SignOutIcon } from "@/lib/icons";
import { logout } from "./actions";
import { MenuTrigger } from "./menu-trigger";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Topbar({
  admin,
  pendingCount,
}: {
  admin: CurrentAdmin;
  pendingCount: number;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-white/80 px-4 py-3 backdrop-blur lg:px-6">
      <MenuTrigger />

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/admin/messages"
          aria-label="View pending items"
          className="relative flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate transition-colors hover:bg-surface hover:text-charcoal"
        >
          <BellIcon className="h-5 w-5" />
          {pendingCount > 0 && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gold-500" />
          )}
        </Link>

        <div className="flex items-center gap-2.5 pl-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
            {initials(admin.name)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight text-charcoal">{admin.name}</p>
            <p className="text-xs capitalize leading-tight text-slate">{admin.role}</p>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            aria-label="Sign out"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate transition-colors hover:bg-surface hover:text-charcoal"
          >
            <SignOutIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
