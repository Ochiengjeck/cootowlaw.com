"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteJobPostingAction } from "./actions";

export function DeleteButton({ id, slug }: { id: string; slug: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete job posting "${slug}"? This cannot be undone.`}
      onDelete={() => deleteJobPostingAction(id, slug)}
    />
  );
}
