import "server-only";
import { randomUUID } from "node:crypto";
import { asc, desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { caseBriefs, practiceAreas } from "@/lib/db/schema";

export type CaseBriefInput = {
  slug: string;
  title: string;
  courtReference: string;
  summaryHtml: string;
  outcomeHtml: string;
  practiceAreaId: string | null;
  clientId: string | null;
  year: number | null;
  sortOrder: number;
};

export async function getCaseBriefs() {
  "use cache";
  cacheTag("case-briefs-list");
  return db
    .select({ caseBrief: caseBriefs, practiceArea: practiceAreas })
    .from(caseBriefs)
    .leftJoin(practiceAreas, eq(caseBriefs.practiceAreaId, practiceAreas.id))
    .orderBy(asc(caseBriefs.sortOrder), desc(caseBriefs.year));
}

export async function getCaseBriefBySlug(slug: string) {
  "use cache";
  cacheTag(`case-brief:${slug}`);
  const rows = await db
    .select({ caseBrief: caseBriefs, practiceArea: practiceAreas })
    .from(caseBriefs)
    .leftJoin(practiceAreas, eq(caseBriefs.practiceAreaId, practiceAreas.id))
    .where(eq(caseBriefs.slug, slug))
    .limit(1);
  return rows[0] ?? null;
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
