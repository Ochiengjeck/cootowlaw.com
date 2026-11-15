import "server-only";
import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { attorneys, attorneyPracticeAreas, practiceAreas, offices, media } from "@/lib/db/schema";
import type { AttorneyTier } from "@/lib/db/schema";

export type AttorneyInput = {
  slug: string;
  name: string;
  title: string;
  tier: AttorneyTier;
  bioHtml: string | null;
  credentials: string | null;
  email: string | null;
  phone: string | null;
  officeId: string | null;
  photoId: string | null;
  sortOrder: number;
  isActive: boolean;
  practiceAreaIds: string[];
};

// --- Public, cached reads ---

export async function getAttorneys() {
  "use cache";
  cacheTag("attorneys-list");
  const rows = await db
    .select({ attorney: attorneys, photo: media })
    .from(attorneys)
    .leftJoin(media, eq(attorneys.photoId, media.id))
    .where(eq(attorneys.isActive, true))
    .orderBy(asc(attorneys.tier), asc(attorneys.sortOrder));

  return rows.map((r) => ({ ...r.attorney, photo: r.photo }));
}

export async function getAttorneyBySlug(slug: string) {
  "use cache";
  cacheTag(`attorney:${slug}`);

  const rows = await db
    .select({
      attorney: attorneys,
      office: offices,
      photo: media,
    })
    .from(attorneys)
    .leftJoin(offices, eq(attorneys.officeId, offices.id))
    .leftJoin(media, eq(attorneys.photoId, media.id))
    .where(eq(attorneys.slug, slug))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const practiceAreaRows = await db
    .select({ practiceArea: practiceAreas })
    .from(attorneyPracticeAreas)
    .innerJoin(practiceAreas, eq(attorneyPracticeAreas.practiceAreaId, practiceAreas.id))
    .where(eq(attorneyPracticeAreas.attorneyId, row.attorney.id));

  return {
    ...row.attorney,
    office: row.office,
    photo: row.photo,
    practiceAreas: practiceAreaRows.map((r) => r.practiceArea),
  };
}

// --- Admin, uncached ---

export async function adminListAttorneys() {
  return db.select().from(attorneys).orderBy(asc(attorneys.tier), asc(attorneys.sortOrder));
}

export async function adminGetAttorney(id: string) {
  const rows = await db.select().from(attorneys).where(eq(attorneys.id, id)).limit(1);
  const attorney = rows[0];
  if (!attorney) return null;

  const practiceAreaRows = await db
    .select({ practiceAreaId: attorneyPracticeAreas.practiceAreaId })
    .from(attorneyPracticeAreas)
    .where(eq(attorneyPracticeAreas.attorneyId, id));

  return { ...attorney, practiceAreaIds: practiceAreaRows.map((r) => r.practiceAreaId) };
}

export async function createAttorney(input: AttorneyInput) {
  const { practiceAreaIds, ...rest } = input;
  const id = randomUUID();
  await db.insert(attorneys).values({ id, ...rest });
  if (practiceAreaIds.length > 0) {
    await db
      .insert(attorneyPracticeAreas)
      .values(practiceAreaIds.map((practiceAreaId) => ({ attorneyId: id, practiceAreaId })));
  }
  return { id };
}

export async function updateAttorney(id: string, input: AttorneyInput) {
  const { practiceAreaIds, ...rest } = input;
  await db
    .update(attorneys)
    .set({ ...rest, updatedAt: new Date() })
    .where(eq(attorneys.id, id));

  await db.delete(attorneyPracticeAreas).where(eq(attorneyPracticeAreas.attorneyId, id));
  if (practiceAreaIds.length > 0) {
    await db
      .insert(attorneyPracticeAreas)
      .values(practiceAreaIds.map((practiceAreaId) => ({ attorneyId: id, practiceAreaId })));
  }
}

export async function deleteAttorney(id: string) {
  await db.delete(attorneyPracticeAreas).where(eq(attorneyPracticeAreas.attorneyId, id));
  await db.delete(attorneys).where(eq(attorneys.id, id));
}
