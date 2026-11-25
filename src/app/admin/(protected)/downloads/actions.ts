"use server";

import { put, del } from "@vercel/blob";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import {
  adminGetDownload,
  createDownload,
  deleteDownload,
  updateDownload,
  type DownloadInput,
} from "@/lib/data/downloads";

export type DownloadFormState = { error?: string } | undefined;

async function parseForm(
  formData: FormData,
  existingFile?: { fileUrl: string; fileFilename: string },
): Promise<DownloadInput | { error: string }> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;

  if (!title || !category) {
    return { error: "Title and category are required." };
  }
  if (publishedAtRaw && Number.isNaN(publishedAt?.getTime())) {
    return { error: "Publish date is invalid." };
  }

  let fileUrl = existingFile?.fileUrl ?? "";
  let fileFilename = existingFile?.fileFilename ?? "";
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    try {
      const blob = await put(file.name, file, { access: "public", addRandomSuffix: true });
      fileUrl = blob.url;
      fileFilename = file.name;
    } catch {
      return {
        error:
          "Upload failed: file storage isn't configured yet. Set BLOB_READ_WRITE_TOKEN (see .env.local) and try again.",
      };
    }
  }
  if (!fileUrl) {
    return { error: "Choose a file to upload." };
  }

  return { title, description: description || null, category, fileUrl, fileFilename, publishedAt, sortOrder };
}

export async function createDownloadAction(
  _prevState: DownloadFormState,
  formData: FormData,
): Promise<DownloadFormState> {
  await getCurrentAdmin();
  const parsed = await parseForm(formData);
  if ("error" in parsed) return parsed;

  await createDownload(parsed);
  updateTag("downloads-list");
  redirect("/admin/downloads");
}

export async function updateDownloadAction(
  id: string,
  existingFile: { fileUrl: string; fileFilename: string },
  _prevState: DownloadFormState,
  formData: FormData,
): Promise<DownloadFormState> {
  await getCurrentAdmin();
  const parsed = await parseForm(formData, existingFile);
  if ("error" in parsed) return parsed;

  await updateDownload(id, parsed);
  updateTag("downloads-list");
  redirect("/admin/downloads");
}

export async function deleteDownloadAction(id: string) {
  await getCurrentAdmin();

  const item = await adminGetDownload(id);
  if (item) {
    try {
      await del(item.fileUrl);
    } catch {
      // Blob already gone — fine, we still want to remove the DB row below.
    }
  }

  await deleteDownload(id);
  updateTag("downloads-list");
  redirect("/admin/downloads");
}
