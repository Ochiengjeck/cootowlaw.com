"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteClientAction } from "./actions";

export function DeleteButton({ id, name }: { id: string; name: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Delete client "${name}"? This cannot be undone.`}
      onDelete={() => deleteClientAction(id)}
    />
  );
}
