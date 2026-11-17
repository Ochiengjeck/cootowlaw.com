"use client";

import { TrashIcon } from "@/lib/icons";

export function DeleteButton({
  confirmMessage,
  onDelete,
  label = "Delete",
}: {
  confirmMessage: string;
  onDelete: () => void | Promise<void>;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm(confirmMessage)) {
          onDelete();
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-2.5 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40"
    >
      <TrashIcon className="h-4 w-4" />
      {label}
    </button>
  );
}
