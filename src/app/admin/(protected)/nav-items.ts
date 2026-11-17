export type NavIconKey =
  | "dashboard"
  | "people"
  | "scale"
  | "building"
  | "handshake"
  | "book"
  | "newspaper"
  | "briefcase"
  | "inbox"
  | "chat"
  | "photo"
  | "cog";

export const adminNavItems = [
  {
    group: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }],
  },
  {
    group: "People & Practice",
    items: [
      { href: "/admin/attorneys", label: "People", icon: "people" },
      { href: "/admin/practice-areas", label: "Practice Areas", icon: "scale" },
      { href: "/admin/offices", label: "Offices", icon: "building" },
      { href: "/admin/clients", label: "Clientele", icon: "handshake" },
      { href: "/admin/cases", label: "Landmark Briefs", icon: "book" },
    ],
  },
  {
    group: "Content",
    items: [
      { href: "/admin/news", label: "News", icon: "newspaper" },
      { href: "/admin/jobs", label: "Job Postings", icon: "briefcase" },
    ],
  },
  {
    group: "Inbox",
    items: [
      { href: "/admin/applications", label: "Applications", icon: "inbox" },
      { href: "/admin/messages", label: "Messages", icon: "chat" },
    ],
  },
  {
    group: "System",
    items: [
      { href: "/admin/media", label: "Media Library", icon: "photo" },
      { href: "/admin/settings", label: "Site Settings", icon: "cog" },
    ],
  },
] as const satisfies { group: string; items: { href: string; label: string; icon: NavIconKey }[] }[];
