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
