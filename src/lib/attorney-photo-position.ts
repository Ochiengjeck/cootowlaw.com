import type { CSSProperties } from "react";

// Horizontal focal-point overrides for attorney headshots whose subject isn't
// centered in the source photo — plain object-fit:cover (which crops from the
// center) would otherwise cut the person out of frame in a narrower portrait box.
// Value is the horizontal "object-position" percentage; omitted slugs use the
// CSS default (centered), which already frames those photos correctly.
const attorneyPhotoFocalX: Record<string, number> = {
  "patrick-ochwa": 80,
  "job-weloba": 90,
  "samuel-ouma": 85,
  "augustus-wafula": 85,
  "john-mwanzia-mutambuki": 39,
  "roselyne-alwar": 73,
};

export function attorneyPhotoStyle(slug: string): CSSProperties | undefined {
  const x = attorneyPhotoFocalX[slug];
  return x === undefined ? undefined : { objectPosition: `${x}% center` };
}
