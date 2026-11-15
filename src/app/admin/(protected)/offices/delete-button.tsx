"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteOfficeAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete office "${slug}"? This cannot be undone.`}
      onDelete={() => deleteOfficeAction(id, slug)}
    />
  );
}
