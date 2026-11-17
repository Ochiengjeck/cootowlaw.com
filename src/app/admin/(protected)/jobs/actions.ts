"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  createJobPosting,
  deleteJobPosting,
  updateJobPosting,
  type JobPostingInput,
} from "@/lib/data/job-postings";

export type JobPostingFormState = { error?: string } | undefined;

function parseForm(formData: FormData): JobPostingInput | { error: string } {
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim() || null;
  const location = String(formData.get("location") ?? "").trim();
  const employmentType = String(formData.get("employmentType") ?? "").trim() || null;
  const summary = String(formData.get("summary") ?? "").trim();
  const descriptionHtml = String(formData.get("descriptionHtml") ?? "").trim();
  const isOpen = formData.get("isOpen") === "on";
  const sortOrderRaw = String(formData.get("sortOrder") ?? "0").trim();
  const sortOrder = Number(sortOrderRaw) || 0;

  if (!slug || !title || !location || !summary || !descriptionHtml) {
    return { error: "Slug, title, location, summary, and description are required." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug may only contain lowercase letters, numbers, and hyphens." };
  }

  return {
    slug,
    title,
    department,
    location,
    employmentType,
    summary,
    descriptionHtml,
    isOpen,
    sortOrder,
  };
}

export async function createJobPostingAction(
  _prevState: JobPostingFormState,
  formData: FormData,
): Promise<JobPostingFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createJobPosting(parsed);
  updateTag("job-postings-list");
  updateTag(`job-posting:${parsed.slug}`);
  redirect("/admin/jobs");
}

export async function updateJobPostingAction(
  id: string,
  oldSlug: string,
  _prevState: JobPostingFormState,
  formData: FormData,
): Promise<JobPostingFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateJobPosting(id, parsed);
  updateTag("job-postings-list");
  updateTag(`job-posting:${oldSlug}`);
  if (parsed.slug !== oldSlug) {
    updateTag(`job-posting:${parsed.slug}`);
  }
  redirect("/admin/jobs");
}

export async function deleteJobPostingAction(id: string, slug: string) {
  await getCurrentAdmin();
  await deleteJobPosting(id);
  updateTag("job-postings-list");
  updateTag(`job-posting:${slug}`);
  redirect("/admin/jobs");
}
