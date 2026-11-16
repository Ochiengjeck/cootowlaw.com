import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";

export type MediaInput = {
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
};

export async function adminListMedia() {
  await connection();
  return db.select().from(media).orderBy(desc(media.uploadedAt));
}

export async function adminGetMedia(id: string) {
  await connection();
  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createMedia(input: MediaInput) {
  const id = randomUUID();
  await db.insert(media).values({ id, ...input });
  return { id };
}

export async function deleteMedia(id: string) {
  await db.delete(media).where(eq(media.id, id));
}
