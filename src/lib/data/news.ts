import "server-only";
import { desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { newsPosts } from "@/lib/db/schema";

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
  return db
    .select()
    .from(newsPosts)
    .where(isNotNull(newsPosts.publishedAt))
    .orderBy(desc(newsPosts.publishedAt));
}

export async function getNewsPostBySlug(slug: string) {
  "use cache";
  cacheTag(`news-post:${slug}`);
  const rows = await db.select().from(newsPosts).where(eq(newsPosts.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function adminListNewsPosts() {
  return db.select().from(newsPosts).orderBy(desc(newsPosts.publishedAt));
}

export async function adminGetNewsPost(id: string) {
  const rows = await db.select().from(newsPosts).where(eq(newsPosts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createNewsPost(input: NewsPostInput) {
  const rows = await db.insert(newsPosts).values(input).returning({ id: newsPosts.id });
  return rows[0];
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
