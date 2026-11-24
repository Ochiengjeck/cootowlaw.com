"use client";

import { DeleteButton as SharedDeleteButton } from "@/components/admin/delete-button";
import { deleteSubscriberAction } from "./actions";

export function DeleteButton({ id, email }: { id: string; email: string }) {
  return (
    <SharedDeleteButton
      confirmMessage={`Remove "${email}" from the digest subscriber list?`}
      onDelete={() => deleteSubscriberAction(id)}
      label="Remove"
    />
  );
}
