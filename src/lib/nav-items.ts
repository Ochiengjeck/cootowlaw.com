export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; items: NavItem[] };

/** Dropdown groups shown in the header — the group's own label always doubles as its first item. */
export const navGroups: NavGroup[] = [
  {
    label: "About",
    items: [
      { href: "/about", label: "About" },
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
  { href: "/offices", label: "Offices" },
];

export const mainNavItems: NavItem[] = [...navGroups.flatMap((group) => group.items), ...navLinks];
