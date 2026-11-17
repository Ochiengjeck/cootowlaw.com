import "server-only";
import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { offices, media } from "@/lib/db/schema";

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
  const rows = await db
    .select({ office: offices, heroImage: media })
    .from(offices)
    .leftJoin(media, eq(offices.heroImageId, media.id))
    .orderBy(asc(offices.sortOrder));

  return rows.map((r) => ({ ...r.office, heroImage: r.heroImage }));
}

export async function getOfficeBySlug(slug: string) {
  "use cache";
  cacheTag(`office:${slug}`);
  const rows = await db
    .select({ office: offices, heroImage: media })
    .from(offices)
    .leftJoin(media, eq(offices.heroImageId, media.id))
    .where(eq(offices.slug, slug))
    .limit(1);

  if (!rows[0]) return null;
  return { ...rows[0].office, heroImage: rows[0].heroImage };
}

export async function getOfficeById(id: string) {
  const list = await getOffices();
  return list.find((o) => o.id === id) ?? null;
}

// --- Admin, uncached ---

export async function adminListOffices() {
  await connection();
  return db.select().from(offices).orderBy(asc(offices.sortOrder));
}

export async function adminGetOffice(id: string) {
  await connection();
  const rows = await db.select().from(offices).where(eq(offices.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createOffice(input: OfficeInput) {
  const id = randomUUID();
  await db.insert(offices).values({ id, ...input });
  return { id };
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
