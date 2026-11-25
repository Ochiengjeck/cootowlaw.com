"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createPracticeArea,
  deletePracticeArea,
  updatePracticeArea,
  type PracticeAreaInput,
  type PracticeAreaService,
} from "@/lib/data/practice-areas";

export type PracticeAreaFormState = { error?: string } | undefined;

function parseForm(formData: FormData): PracticeAreaInput | { error: string } {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const descriptionHtml = String(formData.get("descriptionHtml") ?? "").trim();
  const servicesList: PracticeAreaService[] = [];
  for (const line of String(formData.get("servicesList") ?? "").split("\n")) {
    const [name, ...rest] = line.split(":");
    const description = rest.join(":").trim();
    if (name?.trim()) {
      servicesList.push({ name: name.trim(), description });
    }
  }
  const heroImageId = String(formData.get("heroImageId") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (!slug || !name || !summary || !descriptionHtml) {
    return { error: "Slug, name, summary, and description are required." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug may only contain lowercase letters, numbers, and hyphens." };
  }

  return { slug, name, summary, descriptionHtml, servicesList, heroImageId, sortOrder };
}

export async function createPracticeAreaAction(
  _prevState: PracticeAreaFormState,
  formData: FormData,
): Promise<PracticeAreaFormState> {
  await getCurrentAdmin();

  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createPracticeArea(parsed);
  updateTag("practice-areas-list");
  updateTag(`practice-area:${parsed.slug}`);
  redirect("/admin/practice-areas");
}

export async function updatePracticeAreaAction(
  id: string,
  oldSlug: string,
  _prevState: PracticeAreaFormState,
  formData: FormData,
): Promise<PracticeAreaFormState> {
  await getCurrentAdmin();

  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updatePracticeArea(id, parsed);
  updateTag("practice-areas-list");
  updateTag(`practice-area:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`practice-area:${parsed.slug}`);
  }
  redirect("/admin/practice-areas");
}

export async function deletePracticeAreaAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deletePracticeArea(id);
  updateTag("practice-areas-list");
  updateTag(`practice-area:${slug}`);
  redirect("/admin/practice-areas");
}
