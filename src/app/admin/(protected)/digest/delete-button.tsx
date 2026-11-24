"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteDigestPostAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete digest issue "${slug}"? This cannot be undone.`}
      onDelete={() => deleteDigestPostAction(id, slug)}
    />
  );
}
