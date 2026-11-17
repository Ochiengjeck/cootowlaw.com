"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createCaseBrief,
  deleteCaseBrief,
  updateCaseBrief,
  type CaseBriefInput,
} from "@/lib/data/case-briefs";

export type CaseBriefFormState = { error?: string } | undefined;

function parseForm(formData: FormData): CaseBriefInput | { error: string } {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const courtReference = String(formData.get("courtReference") ?? "").trim();
  const summaryHtml = String(formData.get("summaryHtml") ?? "").trim();
  const outcomeHtml = String(formData.get("outcomeHtml") ?? "").trim();
  const practiceAreaId = String(formData.get("practiceAreaId") ?? "").trim() || null;
  const clientId = String(formData.get("clientId") ?? "").trim() || null;
  const coverImageId = String(formData.get("coverImageId") ?? "").trim() || null;
  const yearRaw = String(formData.get("year") ?? "").trim();
  const year = yearRaw ? Number(yearRaw) : null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (!slug || !title || !courtReference || !summaryHtml || !outcomeHtml) {
    return { error: "Slug, title, court reference, summary, and outcome are required." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug may only contain lowercase letters, numbers, and hyphens." };
  }

  return {
    slug,
    title,
    courtReference,
    summaryHtml,
    outcomeHtml,
    practiceAreaId,
    clientId,
    coverImageId,
    year,
    sortOrder,
  };
}

export async function createCaseBriefAction(
  _prevState: CaseBriefFormState,
  formData: FormData,
): Promise<CaseBriefFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createCaseBrief(parsed);
  updateTag("case-briefs-list");
  updateTag(`case-brief:${parsed.slug}`);
  redirect("/admin/cases");
}

export async function updateCaseBriefAction(
  id: string,
  oldSlug: string,
  _prevState: CaseBriefFormState,
  formData: FormData,
): Promise<CaseBriefFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateCaseBrief(id, parsed);
  updateTag("case-briefs-list");
  updateTag(`case-brief:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`case-brief:${parsed.slug}`);
  }
  redirect("/admin/cases");
}

export async function deleteCaseBriefAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deleteCaseBrief(id);
  updateTag("case-briefs-list");
  updateTag(`case-brief:${slug}`);
  redirect("/admin/cases");
}
