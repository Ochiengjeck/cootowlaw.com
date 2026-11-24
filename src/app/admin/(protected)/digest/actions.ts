"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createDigestPost,
  deleteDigestPost,
  updateDigestPost,
  type DigestPostInput,
} from "@/lib/data/digest";

export type DigestPostFormState = { error?: string } | undefined;

function parseForm(formData: FormData): DigestPostInput | { error: string } {
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

export async function createDigestPostAction(
  _prevState: DigestPostFormState,
  formData: FormData,
): Promise<DigestPostFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createDigestPost(parsed);
  updateTag("digest-posts-list");
  updateTag(`digest-post:${parsed.slug}`);
  redirect("/admin/digest");
}

export async function updateDigestPostAction(
  id: string,
  oldSlug: string,
  _prevState: DigestPostFormState,
  formData: FormData,
): Promise<DigestPostFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateDigestPost(id, parsed);
  updateTag("digest-posts-list");
  updateTag(`digest-post:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`digest-post:${parsed.slug}`);
  }
  redirect("/admin/digest");
}

export async function deleteDigestPostAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deleteDigestPost(id);
  updateTag("digest-posts-list");
  updateTag(`digest-post:${slug}`);
  redirect("/admin/digest");
}
