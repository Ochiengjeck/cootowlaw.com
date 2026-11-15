"use server";

import path from "node:path";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { adminGetMedia, createMedia, deleteMedia } from "@/lib/data/media";

export type UploadState = { error?: string } | undefined;

const PUBLIC_URL_PREFIX = "/images/uploads";

// Overridable because a standalone Next.js build serves /public from a *copy*
// made at deploy time (e.g. .next/standalone/public), not the source tree —
// set MEDIA_UPLOAD_DIR to that copy's absolute path in production.
function uploadDir() {
  return process.env.MEDIA_UPLOAD_DIR ?? path.join(process.cwd(), "public", "images", "uploads");
}

function safeFilename(originalName: string) {
  const ext = path.extname(originalName).slice(0, 10);
  const base = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 80);
  return `${Date.now()}-${base || "file"}${ext}`;
}

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

  const dir = uploadDir();
  await mkdir(dir, { recursive: true });

  const filename = safeFilename(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(/* turbopackIgnore: true */ dir, filename), bytes);

  await createMedia({ url: `${PUBLIC_URL_PREFIX}/${filename}`, alt });
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  await getCurrentAdmin();

  const item = await adminGetMedia(id);
  if (item && item.url.startsWith(`${PUBLIC_URL_PREFIX}/`)) {
    const filename = item.url.slice(PUBLIC_URL_PREFIX.length + 1);
    try {
      await unlink(path.join(/* turbopackIgnore: true */ uploadDir(), filename));
    } catch {
      // File already gone — fine, we still want to remove the DB row below.
    }
  }

  await deleteMedia(id);
  revalidatePath("/admin/media");
}
