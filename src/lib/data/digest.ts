import "server-only";
import { randomUUID } from "node:crypto";
import { desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { connection } from "next/server";
import { db } from "@/lib/db";
import { digestPosts, media } from "@/lib/db/schema";

export type DigestPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  coverImageId: string | null;
  authorId: string | null;
  publishedAt: Date | null;
};

export async function getDigestPosts() {
  "use cache";
  cacheTag("digest-posts-list");
  const rows = await db
    .select({ post: digestPosts, coverImage: media })
    .from(digestPosts)
    .leftJoin(media, eq(digestPosts.coverImageId, media.id))
    .where(isNotNull(digestPosts.publishedAt))
    .orderBy(desc(digestPosts.publishedAt));

  return rows.map((r) => ({ ...r.post, coverImage: r.coverImage }));
}

export async function getDigestPostBySlug(slug: string) {
  "use cache";
  cacheTag(`digest-post:${slug}`);
  const rows = await db
    .select({ post: digestPosts, coverImage: media })
    .from(digestPosts)
    .leftJoin(media, eq(digestPosts.coverImageId, media.id))
    .where(eq(digestPosts.slug, slug))
    .limit(1);

  if (!rows[0]) return null;
  return { ...rows[0].post, coverImage: rows[0].coverImage };
}

export async function adminListDigestPosts() {
  await connection();
  return db.select().from(digestPosts).orderBy(desc(digestPosts.publishedAt));
}

export async function adminGetDigestPost(id: string) {
  await connection();
  const rows = await db.select().from(digestPosts).where(eq(digestPosts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createDigestPost(input: DigestPostInput) {
  const id = randomUUID();
  await db.insert(digestPosts).values({ id, ...input });
  return { id };
}

export async function updateDigestPost(id: string, input: DigestPostInput) {
  await db
    .update(digestPosts)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(digestPosts.id, id));
}

export async function deleteDigestPost(id: string) {
  await db.delete(digestPosts).where(eq(digestPosts.id, id));
}
