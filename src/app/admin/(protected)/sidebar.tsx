"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import {
  DashboardIcon,
  PeopleIcon,
  ScaleIcon,
  BuildingIcon,
  HandshakeIcon,
  BookOpenIcon,
  NewspaperIcon,
  BriefcaseIcon,
  InboxIcon,
  ChatBubbleIcon,
  PhotoIcon,
  CogIcon,
} from "@/lib/icons";
import { adminNavItems, type NavIconKey } from "./nav-items";
import { useSidebar } from "./sidebar-context";

const iconMap: Record<NavIconKey, (p: { className?: string }) => React.JSX.Element> = {
  dashboard: DashboardIcon,
  people: PeopleIcon,
  scale: ScaleIcon,
  building: BuildingIcon,
  handshake: HandshakeIcon,
  book: BookOpenIcon,
  newspaper: NewspaperIcon,
  briefcase: BriefcaseIcon,
  inbox: InboxIcon,
  chat: ChatBubbleIcon,
  photo: PhotoIcon,
  cog: CogIcon,
};

function isActiveHref(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarShell({ pathname, open }: { pathname: string; open: boolean }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 shrink-0 flex-col bg-charcoal px-4 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Logo dark className="px-2" />
      <nav className="mt-8 flex-1 space-y-6 overflow-y-auto">
        {adminNavItems.map((group) => (
          <div key={group.group}>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              {group.group}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const active = isActiveHref(pathname, item.href);
                const ItemIcon = iconMap[item.icon];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 ${
                      active
                        ? "bg-white/10 text-white before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r before:bg-gold-500"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <ItemIcon
                      className={`h-5 w-5 shrink-0 ${
                        active ? "text-gold-400" : "text-white/50 group-hover:text-white/80"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

/** Static, non-dynamic fallback rendered while the real sidebar streams in under Cache Components/PPR. */
export function SidebarFallback() {
  return <SidebarShell pathname="" open={false} />;
}

export function Sidebar() {
  const pathname = usePathname();
  const { open, close } = useSidebar();

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-charcoal/40 lg:hidden ${open ? "block" : "hidden"}`}
      />
      <SidebarShell pathname={pathname} open={open} />
    </>
  );
}
