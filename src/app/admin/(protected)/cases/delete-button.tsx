"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteCaseBriefAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete landmark brief "${slug}"? This cannot be undone.`}
      onDelete={() => deleteCaseBriefAction(id, slug)}
    />
  );
}
