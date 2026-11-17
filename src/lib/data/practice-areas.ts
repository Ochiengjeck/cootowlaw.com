import "server-only";
import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { practiceAreas, media } from "@/lib/db/schema";

export type PracticeAreaInput = {
  slug: string;
  name: string;
  summary: string;
  descriptionHtml: string;
  servicesList: string[];
  heroImageId: string | null;
  sortOrder: number;
};

// --- Public, cached reads ---

export async function getPracticeAreas() {
  "use cache";
  cacheTag("practice-areas-list");
  const rows = await db
    .select({ practiceArea: practiceAreas, heroImage: media })
    .from(practiceAreas)
    .leftJoin(media, eq(practiceAreas.heroImageId, media.id))
    .orderBy(asc(practiceAreas.sortOrder));

  return rows.map((r) => ({ ...r.practiceArea, heroImage: r.heroImage }));
}

export async function getPracticeAreaBySlug(slug: string) {
  "use cache";
  cacheTag(`practice-area:${slug}`);
  const rows = await db
    .select({ practiceArea: practiceAreas, heroImage: media })
    .from(practiceAreas)
    .leftJoin(media, eq(practiceAreas.heroImageId, media.id))
    .where(eq(practiceAreas.slug, slug))
    .limit(1);

  if (!rows[0]) return null;
  return { ...rows[0].practiceArea, heroImage: rows[0].heroImage };
}

// --- Admin, uncached reads/writes (authorization enforced by the caller) ---

export async function adminListPracticeAreas() {
  await connection();
  return db.select().from(practiceAreas).orderBy(asc(practiceAreas.sortOrder));
}

export async function adminGetPracticeArea(id: string) {
  await connection();
  const rows = await db.select().from(practiceAreas).where(eq(practiceAreas.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createPracticeArea(input: PracticeAreaInput) {
  const id = randomUUID();
  await db.insert(practiceAreas).values({ id, ...input });
  return { id };
}

export async function updatePracticeArea(id: string, input: PracticeAreaInput) {
  await db
    .update(practiceAreas)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(practiceAreas.id, id));
}

export async function deletePracticeArea(id: string) {
  await db.delete(practiceAreas).where(eq(practiceAreas.id, id));
}
