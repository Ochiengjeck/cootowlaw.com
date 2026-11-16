"use server";

import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { adminGetMedia, createMedia, deleteMedia } from "@/lib/data/media";

export type UploadState = { error?: string } | undefined;

export async function uploadMediaAction(
  _prevState: UploadState,
  formData: FormData,
): Promise<UploadState> {
  await getCurrentAdmin();

  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload." };
  }
  if (!alt) {
    return { error: "Alt text is required (for accessibility and SEO)." };
  }

  const blob = await put(file.name, file, { access: "public", addRandomSuffix: true });

  await createMedia({ url: blob.url, alt });
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  await getCurrentAdmin();

  const item = await adminGetMedia(id);
  if (item) {
    try {
      await del(item.url);
    } catch {
      // Blob already gone — fine, we still want to remove the DB row below.
    }
  }

  await deleteMedia(id);
  revalidatePath("/admin/media");
}
