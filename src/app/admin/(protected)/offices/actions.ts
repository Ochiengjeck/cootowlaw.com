"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { createOffice, deleteOffice, updateOffice, type OfficeInput } from "@/lib/data/offices";

export type OfficeFormState = { error?: string } | undefined;

function parseForm(formData: FormData): OfficeInput | { error: string } {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const addressLine1 = String(formData.get("addressLine1") ?? "").trim();
  const addressLine2 = String(formData.get("addressLine2") ?? "").trim() || null;
  const city = String(formData.get("city") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const officeHours = String(formData.get("officeHours") ?? "").trim() || null;
  const mapEmbedUrl = String(formData.get("mapEmbedUrl") ?? "").trim() || null;
  const heroImageId = String(formData.get("heroImageId") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (!slug || !name || !addressLine1 || !city || !phone || !email) {
    return { error: "Slug, name, address, city, phone, and email are required." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug may only contain lowercase letters, numbers, and hyphens." };
  }

  return {
    slug,
    name,
    addressLine1,
    addressLine2,
    city,
    phone,
    email,
    officeHours,
    mapEmbedUrl,
    heroImageId,
    sortOrder,
  };
}

export async function createOfficeAction(
  _prevState: OfficeFormState,
  formData: FormData,
): Promise<OfficeFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createOffice(parsed);
  updateTag("offices-list");
  updateTag(`office:${parsed.slug}`);
  redirect("/admin/offices");
}

export async function updateOfficeAction(
  id: string,
  oldSlug: string,
  _prevState: OfficeFormState,
  formData: FormData,
): Promise<OfficeFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateOffice(id, parsed);
  updateTag("offices-list");
  updateTag(`office:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`office:${parsed.slug}`);
  }
  redirect("/admin/offices");
}

export async function deleteOfficeAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deleteOffice(id);
  updateTag("offices-list");
  updateTag(`office:${slug}`);
  redirect("/admin/offices");
}
