"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deletePracticeAreaAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete practice area "${slug}"? This cannot be undone.`}
      onDelete={() => deletePracticeAreaAction(id, slug)}
    />
  );
}
