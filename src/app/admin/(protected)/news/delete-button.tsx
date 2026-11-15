"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteNewsPostAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete news post "${slug}"? This cannot be undone.`}
      onDelete={() => deleteNewsPostAction(id, slug)}
    />
  );
}
