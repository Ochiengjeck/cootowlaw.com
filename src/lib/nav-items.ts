export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; items: NavItem[] };

/** Dropdown groups shown in the header — the group's own label always doubles as its first item. */
export const navGroups: NavGroup[] = [
  {
    label: "About",
    items: [
      { href: "/about", label: "About" },
      { href: "/history", label: "Our History" },
      { href: "/people", label: "People" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    label: "Practice Areas",
    items: [
      { href: "/practices", label: "Practice Areas" },
      { href: "/cases", label: "Landmark Briefs" },
      { href: "/clientele", label: "Clientele" },
    ],
  },
];

export const navLinks: NavItem[] = [
  { href: "/news", label: "News" },
  { href: "/digest", label: "Legal Digest" },
  { href: "/downloads", label: "Downloads" },
  { href: "/offices", label: "Offices" },
];

export const mainNavItems: NavItem[] = [...navGroups.flatMap((group) => group.items), ...navLinks];

export function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Shared "active page" chip styling for the desktop pill nav (direct links and group labels alike). */
export function navChipClass(active: boolean, scrolled: boolean) {
  const base = "rounded-full px-3 py-1.5 text-sm transition-colors duration-200";
  if (scrolled) {
    return `${base} ${
      active
        ? "bg-white/15 font-semibold text-gold-400"
        : "font-medium text-white/90 hover:bg-white/5 hover:text-gold-400"
    }`;
  }
  return `${base} ${
    active
      ? "bg-purple-600/10 font-bold text-purple-700"
      : "font-bold text-purple-600 hover:bg-purple-600/5 hover:text-purple-700"
  }`;
}
