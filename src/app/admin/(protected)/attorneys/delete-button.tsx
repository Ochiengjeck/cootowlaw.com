"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteAttorneyAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete "${slug}"? This cannot be undone.`}
      onDelete={() => deleteAttorneyAction(id, slug)}
    />
  );
}
