import "server-only";
import { randomUUID } from "node:crypto";
import { asc, desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { downloads } from "@/lib/db/schema";

export type DownloadInput = {
  title: string;
  description: string | null;
  category: string;
  fileUrl: string;
  fileFilename: string;
  publishedAt: Date | null;
  sortOrder: number;
};

export async function getDownloads() {
  "use cache";
  cacheTag("downloads-list");
  return db
    .select()
    .from(downloads)
    .where(isNotNull(downloads.publishedAt))
    .orderBy(asc(downloads.category), asc(downloads.sortOrder));
}

export async function adminListDownloads() {
  await connection();
  return db.select().from(downloads).orderBy(desc(downloads.createdAt));
}

export async function adminGetDownload(id: string) {
  await connection();
  const rows = await db.select().from(downloads).where(eq(downloads.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createDownload(input: DownloadInput) {
  const id = randomUUID();
  await db.insert(downloads).values({ id, ...input });
  return { id };
}

export async function updateDownload(id: string, input: DownloadInput) {
  await db
    .update(downloads)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(downloads.id, id));
}

export async function deleteDownload(id: string) {
  await db.delete(downloads).where(eq(downloads.id, id));
}
