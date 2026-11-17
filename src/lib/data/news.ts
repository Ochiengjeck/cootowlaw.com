import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { newsPosts, media } from "@/lib/db/schema";

export type NewsPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  coverImageId: string | null;
  authorId: string | null;
  publishedAt: Date | null;
};

export async function getNewsPosts() {
  "use cache";
  cacheTag("news-posts-list");
  const rows = await db
    .select({ post: newsPosts, coverImage: media })
    .from(newsPosts)
    .leftJoin(media, eq(newsPosts.coverImageId, media.id))
    .where(isNotNull(newsPosts.publishedAt))
    .orderBy(desc(newsPosts.publishedAt));

  return rows.map((r) => ({ ...r.post, coverImage: r.coverImage }));
}

export async function getNewsPostBySlug(slug: string) {
  "use cache";
  cacheTag(`news-post:${slug}`);
  const rows = await db
    .select({ post: newsPosts, coverImage: media })
    .from(newsPosts)
    .leftJoin(media, eq(newsPosts.coverImageId, media.id))
    .where(eq(newsPosts.slug, slug))
    .limit(1);

  if (!rows[0]) return null;
  return { ...rows[0].post, coverImage: rows[0].coverImage };
}

export async function adminListNewsPosts() {
  await connection();
  return db.select().from(newsPosts).orderBy(desc(newsPosts.publishedAt));
}

export async function adminGetNewsPost(id: string) {
  await connection();
  const rows = await db.select().from(newsPosts).where(eq(newsPosts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createNewsPost(input: NewsPostInput) {
  const id = randomUUID();
  await db.insert(newsPosts).values({ id, ...input });
  return { id };
}

export async function updateNewsPost(id: string, input: NewsPostInput) {
  await db
    .update(newsPosts)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(newsPosts.id, id));
}

export async function deleteNewsPost(id: string) {
  await db.delete(newsPosts).where(eq(newsPosts.id, id));
}
