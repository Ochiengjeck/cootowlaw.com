type IconProps = { className?: string };

function Icon({ className, d }: IconProps & { d: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
    </svg>
  );
}

/** Briefcase — used for empty-state cards (careers, etc). */
export const BriefcaseIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M3 13.5V18a1 1 0 001 1h16a1 1 0 001-1v-4.5M3 13.5V9a1 1 0 011-1h16a1 1 0 011 1v4.5M3 13.5h18M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2"
  />
);

/** Calendar glyph — used next to dates (news list/detail). */
export const CalendarIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
  />
);

/** Map pin — used next to office addresses. */
export const MapPinIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M12 21s-7-6.2-7-11.2A7 7 0 0119 9.8C19 15 12 21 12 21zm0-8.5a2.7 2.7 0 100-5.4 2.7 2.7 0 000 5.4z"
  />
);

/** Phone handset — used next to office telephone numbers. */
export const PhoneIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z"
  />
);

/** Document — used for the privacy-policy empty state. */
export const DocumentIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
);

/** Generic person silhouette — placeholder for a team member with no photo. */
export const PersonIcon = (p: IconProps) => (
  <Icon {...p} d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" />
);

/** Envelope — used next to office email addresses. */
export const MailIcon = (p: IconProps) => (
  <Icon {...p} d="M4 6h16v12H4V6zm0 0l8 7 8-7" />
);

/** Clock — used next to office hours. */
export const ClockIcon = (p: IconProps) => (
  <Icon {...p} d="M12 7v5l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
);

/* --- Admin backoffice icon set --- */

/** Grid/overview glyph — dashboard nav item. */
export const DashboardIcon = (p: IconProps) => (
  <Icon {...p} d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
);

/** Two-person silhouette — People nav item (plural, distinct from PersonIcon). */
export const PeopleIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M9 11a3 3 0 100-6 3 3 0 000 6zm0 2c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4zm7-5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm1 1.5c-.5-.1-1-.15-1.5-.1 1.8.8 3 2.4 3 4.6v2h4v-2c0-2.3-2.5-4-5.5-4.5z"
  />
);

/** Scales of justice — Practice Areas nav item. */
export const ScaleIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M12 3v18m-7 0h14M12 3L5 8m7-5l7 5M3 8l2 5a2.5 2.5 0 005 0l-2-5H3zm14 0l2 5a2.5 2.5 0 01-5 0l2-5h1z"
  />
);

/** Eye — Our Vision card on the About page. */
export const EyeIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
  />
);

/** Office building — Offices nav item. */
export const BuildingIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M4 21V5a1 1 0 011-1h8a1 1 0 011 1v16M4 21h16M4 21V10l6-3m8 14v-8a1 1 0 00-1-1h-4M8 8h.01M8 12h.01M8 16h.01"
  />
);

/** Handshake — Clientele nav item. */
export const HandshakeIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M2 12l4-4 3 3 4-4 3 3 4-4-4 7-3-2-4 4-3-3-4 1zm4-4l4 7 2-2m4-5l-4 7-2-2"
  />
);

/** Open book — Landmark Briefs nav item. */
export const BookOpenIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M12 6c-1.5-1.3-3.5-2-6-2-1 0-1.5.1-2 .3v13.2c.5-.2 1-.3 2-.3 2.5 0 4.5.7 6 2m0-13c1.5-1.3 3.5-2 6-2 1 0 1.5.1 2 .3v13.2c-.5-.2-1-.3-2-.3-2.5 0-4.5.7-6 2m0-13v13"
  />
);

/** Newspaper — News nav item. */
export const NewspaperIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M4 5a1 1 0 011-1h10a1 1 0 011 1v13a2 2 0 002 2M4 5v13a2 2 0 002 2h12M4 5h12v6H4m14 9a2 2 0 002-2V9a1 1 0 00-1-1h-3m-11 4h4m-4 3h4"
  />
);

/** Inbox tray — Applications nav item. */
export const InboxIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M4 12h4l2 3h4l2-3h4M4 12l1.5-6.5A1 1 0 016.46 4h11.08a1 1 0 01.96 1.5L20 12M4 12v6a1 1 0 001 1h14a1 1 0 001-1v-6"
  />
);

/** Chat bubble — Messages nav item. */
export const ChatBubbleIcon = (p: IconProps) => (
  <Icon {...p} d="M21 11.5a8.4 8.4 0 01-8.9 8.4 9 9 0 01-3-.5L4 21l1.6-4.8A8.4 8.4 0 013 11.5 8.4 8.4 0 0112 3a8.5 8.5 0 019 8.5z" />
);

/** Photo/image frame — Media Library nav item. */
export const PhotoIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm2 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 16l5-5 4 4 3-3 6 6"
  />
);

/** Gear — Site Settings nav item. */
export const CogIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 13a7.6 7.6 0 000-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 00-1.7-1l-.4-2.4h-3.9l-.4 2.4a7.6 7.6 0 00-1.7 1l-2.3-.9-2 3.4L6.6 11a7.6 7.6 0 000 2l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 001.7 1l.4 2.4h3.9l.4-2.4a7.6 7.6 0 001.7-1l2.3.9 2-3.4-2-1.5z"
  />
);

/** Pencil — row-level edit action. */
export const PencilIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
  />
);

/** Trash — row-level delete action. */
export const TrashIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M4 7h16M10 11v6m4-6v6M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
  />
);

/** Plus — create/new actions. */
export const PlusIcon = (p: IconProps) => <Icon {...p} d="M12 5v14m-7-7h14" />;

/** Hamburger — mobile nav toggle (open state). */
export const MenuIcon = (p: IconProps) => <Icon {...p} d="M4 6h16M4 12h16M4 18h16" />;

/** Close / X — mobile nav toggle (close state), dismiss actions. */
export const XIcon = (p: IconProps) => <Icon {...p} d="M6 6l12 12M18 6L6 18" />;

/** Chevron down — expand/disclosure affordance. */
export const ChevronDownIcon = (p: IconProps) => <Icon {...p} d="M6 9l6 6 6-6" />;

/** Chevron right — breadcrumb/forward affordance. */
export const ChevronRightIcon = (p: IconProps) => <Icon {...p} d="M9 6l6 6-6 6" />;

/** Bell — notification/needs-attention affordance. */
export const BellIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M12 3a5 5 0 00-5 5v3.4c0 .5-.2 1-.5 1.4L5 15h14l-1.5-2.2a2.3 2.3 0 01-.5-1.4V8a5 5 0 00-5-5zM9.5 18a2.5 2.5 0 005 0"
  />
);

/** Sign-out / exit arrow — topbar logout action. */
export const SignOutIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M15 17l5-5-5-5M20 12H9m3 8H5a1 1 0 01-1-1V5a1 1 0 011-1h7"
  />
);

/** Check mark — selected-state badge (e.g. image picker). */
export const CheckIcon = (p: IconProps) => <Icon {...p} d="M5 13l4 4L19 7" />;

/** Magnifying glass — search inputs (e.g. image picker modal). */
export const SearchIcon = (p: IconProps) => (
  <Icon {...p} d="M11 19a8 8 0 100-16 8 8 0 000 16zm9 2l-4.35-4.35" />
);

/* --- Rich-text editor toolbar icons --- */

export const BoldIcon = (p: IconProps) => (
  <Icon {...p} d="M6 4h7a3.5 3.5 0 010 7H6V4zm0 7h8a3.5 3.5 0 010 7H6v-7z" />
);

export const ItalicIcon = (p: IconProps) => (
  <Icon {...p} d="M10 4h8M6 20h8M14 4L10 20" />
);

export const ListIcon = (p: IconProps) => (
  <Icon {...p} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
);

export const ListOrderedIcon = (p: IconProps) => (
  <Icon {...p} d="M10 6h11M10 12h11M10 18h11M4 4v4m0 0H3m1 0h1m-1 4h2l-2 2.5h2M4 17.5h1a1 1 0 010 2H4" />
);

export const LinkIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M9 15l6-6m-4-3l1.5-1.5a3.5 3.5 0 015 5L16 11m-9 2l-1.5 1.5a3.5 3.5 0 005 5L12 18"
  />
);

export const QuoteIcon = (p: IconProps) => (
  <Icon
    {...p}
    d="M7 7a3 3 0 00-3 3v3a1 1 0 001 1h3v-4H6a1 1 0 011-1V7zm10 0a3 3 0 00-3 3v3a1 1 0 001 1h3v-4h-2a1 1 0 011-1V7z"
  />
);

export const UndoIcon = (p: IconProps) => (
  <Icon {...p} d="M9 7L4 12l5 5M4 12h10a6 6 0 010 12h-1" />
);

export const RedoIcon = (p: IconProps) => (
  <Icon {...p} d="M15 7l5 5-5 5M20 12H10a6 6 0 000 12h1" />
);

/** Download arrow — Downloads section (public cards, admin nav). */
export const DownloadIcon = (p: IconProps) => (
  <Icon {...p} d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
);
