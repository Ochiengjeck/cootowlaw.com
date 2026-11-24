"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteDownloadAction } from "./actions";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete download "${title}"? This cannot be undone.`}
      onDelete={() => deleteDownloadAction(id)}
    />
  );
}
