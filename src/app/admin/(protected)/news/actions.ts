"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createNewsPost,
  deleteNewsPost,
  updateNewsPost,
  type NewsPostInput,
} from "@/lib/data/news";

export type NewsPostFormState = { error?: string } | undefined;

function parseForm(formData: FormData): NewsPostInput | { error: string } {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const bodyHtml = String(formData.get("bodyHtml") ?? "").trim();
  const coverImageId = String(formData.get("coverImageId") ?? "").trim() || null;
  const authorId = String(formData.get("authorId") ?? "").trim() || null;
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;

  if (!slug || !title || !excerpt || !bodyHtml) {
    return { error: "Slug, title, excerpt, and body are required." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug may only contain lowercase letters, numbers, and hyphens." };
  }
  if (publishedAtRaw && Number.isNaN(publishedAt?.getTime())) {
    return { error: "Publish date is invalid." };
  }

  return { slug, title, excerpt, bodyHtml, coverImageId, authorId, publishedAt };
}

export async function createNewsPostAction(
  _prevState: NewsPostFormState,
  formData: FormData,
): Promise<NewsPostFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createNewsPost(parsed);
  updateTag("news-posts-list");
  updateTag(`news-post:${parsed.slug}`);
  redirect("/admin/news");
}

export async function updateNewsPostAction(
  id: string,
  oldSlug: string,
  _prevState: NewsPostFormState,
  formData: FormData,
): Promise<NewsPostFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateNewsPost(id, parsed);
  updateTag("news-posts-list");
  updateTag(`news-post:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`news-post:${parsed.slug}`);
  }
  redirect("/admin/news");
}

export async function deleteNewsPostAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deleteNewsPost(id);
  updateTag("news-posts-list");
  updateTag(`news-post:${slug}`);
  redirect("/admin/news");
}
