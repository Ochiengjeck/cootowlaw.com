"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createAttorney,
  deleteAttorney,
  updateAttorney,
  type AttorneyInput,
} from "@/lib/data/attorneys";
import { attorneyTiers } from "@/lib/db/schema";

export type AttorneyFormState = { error?: string } | undefined;

function parseForm(formData: FormData): AttorneyInput | { error: string } {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const tier = String(formData.get("tier") ?? "");
  const bioHtml = String(formData.get("bioHtml") ?? "").trim() || null;
  const credentials = String(formData.get("credentials") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const officeId = String(formData.get("officeId") ?? "").trim() || null;
  const photoId = String(formData.get("photoId") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const isActive = formData.get("isActive") === "on";
  const practiceAreaIds = formData.getAll("practiceAreaIds").map(String);

  if (!slug || !name || !title) {
    return { error: "Slug, name, and title are required." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug may only contain lowercase letters, numbers, and hyphens." };
  }
  if (!attorneyTiers.includes(tier as (typeof attorneyTiers)[number])) {
    return { error: "Choose a valid tier." };
  }

  return {
    slug,
    name,
    title,
    tier: tier as (typeof attorneyTiers)[number],
    bioHtml,
    credentials,
    email,
    phone,
    officeId,
    photoId,
    sortOrder,
    isActive,
    practiceAreaIds,
  };
}

export async function createAttorneyAction(
  _prevState: AttorneyFormState,
  formData: FormData,
): Promise<AttorneyFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createAttorney(parsed);
  updateTag("attorneys-list");
  updateTag(`attorney:${parsed.slug}`);
  redirect("/admin/attorneys");
}

export async function updateAttorneyAction(
  id: string,
  oldSlug: string,
  _prevState: AttorneyFormState,
  formData: FormData,
): Promise<AttorneyFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateAttorney(id, parsed);
  updateTag("attorneys-list");
  updateTag(`attorney:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`attorney:${parsed.slug}`);
  }
  redirect("/admin/attorneys");
}

export async function deleteAttorneyAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deleteAttorney(id);
  updateTag("attorneys-list");
  updateTag(`attorney:${slug}`);
  redirect("/admin/attorneys");
}
