import "server-only";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { siteSettings, media } from "@/lib/db/schema";

const homeHeroMedia = alias(media, "home_hero_media");
const aboutHeroMedia = alias(media, "about_hero_media");

export type SettingsInput = {
  firmName: string;
  tagline: string;
  foundedYear: number;
  aboutHtml: string;
  missionHtml: string;
  coreValues: string[];
  advocAfricaBlurb: string | null;
  staffingStats: Record<string, { associates: number; paralegals: number }> | null;
  socialLinks: Record<string, string>;
  logoId: string | null;
  homeHeroImageId: string | null;
  aboutHeroImageId: string | null;
  careersHtml: string | null;
  privacyPolicyHtml: string | null;
};

export async function getSiteSettings() {
  "use cache";
  cacheTag("site-settings");
  const rows = await db
    .select({
      settings: siteSettings,
      homeHeroImage: homeHeroMedia,
      aboutHeroImage: aboutHeroMedia,
    })
    .from(siteSettings)
    .leftJoin(homeHeroMedia, eq(siteSettings.homeHeroImageId, homeHeroMedia.id))
    .leftJoin(aboutHeroMedia, eq(siteSettings.aboutHeroImageId, aboutHeroMedia.id))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  return { ...row.settings, homeHeroImage: row.homeHeroImage, aboutHeroImage: row.aboutHeroImage };
}

export async function adminGetSiteSettings() {
  const rows = await db.select().from(siteSettings).limit(1);
  return rows[0] ?? null;
}

export async function updateSiteSettings(id: string, input: SettingsInput) {
  await db
    .update(siteSettings)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(siteSettings.id, id));
}
