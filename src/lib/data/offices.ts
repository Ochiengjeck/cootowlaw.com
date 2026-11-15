import "server-only";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { offices } from "@/lib/db/schema";

export type OfficeInput = {
  slug: string;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  phone: string;
  email: string;
  officeHours: string | null;
  mapEmbedUrl: string | null;
  heroImageId: string | null;
  sortOrder: number;
};

// --- Public, cached reads ---

export async function getOffices() {
  "use cache";
  cacheTag("offices-list");
  return db.select().from(offices).orderBy(asc(offices.sortOrder));
}

export async function getOfficeBySlug(slug: string) {
  "use cache";
  cacheTag(`office:${slug}`);
  const rows = await db.select().from(offices).where(eq(offices.slug, slug)).limit(1);
  return rows[0] ?? null;
}

// --- Admin, uncached ---

export async function adminListOffices() {
  return db.select().from(offices).orderBy(asc(offices.sortOrder));
}

export async function adminGetOffice(id: string) {
  const rows = await db.select().from(offices).where(eq(offices.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createOffice(input: OfficeInput) {
  const rows = await db.insert(offices).values(input).returning({ id: offices.id });
  return rows[0];
}

export async function updateOffice(id: string, input: OfficeInput) {
  await db
    .update(offices)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(offices.id, id));
}

export async function deleteOffice(id: string) {
  await db.delete(offices).where(eq(offices.id, id));
}
