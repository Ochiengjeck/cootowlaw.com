export type PhoneNumber = { display: string; href: string };

function toTelHref(formatted: string) {
  return `tel:${formatted.replace(/[^\d+]/g, "")}`;
}

/**
 * Offices often store several numbers in one field, e.g.
 * "+254 (041) 2221243 / 2220442 / 229939 / 2228589, +254 728 273 478".
 * Commas separate distinct numbers (own line); "/" separates extensions that
 * share the leading country/area-code prefix of the first number in the group.
 */
export function parsePhoneLines(raw: string): PhoneNumber[][] {
  return raw
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const parts = segment
        .split("/")
        .map((p) => p.trim())
        .filter(Boolean);

      if (parts.length <= 1) {
        return [{ display: segment, href: toTelHref(segment) }];
      }

      const [first, ...rest] = parts;
      const prefixMatch = first.match(/^(.*\D)?(\d+)$/);
      const prefix = prefixMatch?.[1] ?? "";

      return [
        { display: first, href: toTelHref(first) },
        ...rest.map((digits) => ({ display: digits, href: toTelHref(`${prefix}${digits}`) })),
      ];
    });
}
