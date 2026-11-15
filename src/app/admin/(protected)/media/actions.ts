"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { getCurrentAdmin } from "@/lib/auth";
import { createMedia, deleteMedia } from "@/lib/data/media";

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

  const blob = await put(`media/${Date.now()}-${file.name}`, file, { access: "public" });
  await createMedia({ url: blob.url, alt });
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  await getCurrentAdmin();
  await deleteMedia(id);
  revalidatePath("/admin/media");
}
