import "server-only";
import { randomUUID } from "node:crypto";
import { asc, desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { caseBriefs, practiceAreas, media } from "@/lib/db/schema";

export type CaseBriefInput = {
  slug: string;
  title: string;
  courtReference: string;
  summaryHtml: string;
  outcomeHtml: string;
  practiceAreaId: string | null;
  clientId: string | null;
  coverImageId: string | null;
  year: number | null;
  sortOrder: number;
};

export async function getCaseBriefs() {
  "use cache";
  cacheTag("case-briefs-list");
  const rows = await db
    .select({ caseBrief: caseBriefs, practiceArea: practiceAreas, coverImage: media })
    .from(caseBriefs)
    .leftJoin(practiceAreas, eq(caseBriefs.practiceAreaId, practiceAreas.id))
    .leftJoin(media, eq(caseBriefs.coverImageId, media.id))
    .orderBy(asc(caseBriefs.sortOrder), desc(caseBriefs.year));

  return rows.map((r) => ({ ...r.caseBrief, practiceArea: r.practiceArea, coverImage: r.coverImage }));
}

export async function getCaseBriefBySlug(slug: string) {
  "use cache";
  cacheTag(`case-brief:${slug}`);
  const rows = await db
    .select({ caseBrief: caseBriefs, practiceArea: practiceAreas, coverImage: media })
    .from(caseBriefs)
    .leftJoin(practiceAreas, eq(caseBriefs.practiceAreaId, practiceAreas.id))
    .leftJoin(media, eq(caseBriefs.coverImageId, media.id))
    .where(eq(caseBriefs.slug, slug))
    .limit(1);

  if (!rows[0]) return null;
  return { ...rows[0].caseBrief, practiceArea: rows[0].practiceArea, coverImage: rows[0].coverImage };
}

export async function adminListCaseBriefs() {
  await connection();
  return db.select().from(caseBriefs).orderBy(asc(caseBriefs.sortOrder));
}

export async function adminGetCaseBrief(id: string) {
  await connection();
  const rows = await db.select().from(caseBriefs).where(eq(caseBriefs.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createCaseBrief(input: CaseBriefInput) {
  const id = randomUUID();
  await db.insert(caseBriefs).values({ id, ...input });
  return { id };
}

export async function updateCaseBrief(id: string, input: CaseBriefInput) {
  await db
    .update(caseBriefs)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(caseBriefs.id, id));
}

export async function deleteCaseBrief(id: string) {
  await db.delete(caseBriefs).where(eq(caseBriefs.id, id));
}
