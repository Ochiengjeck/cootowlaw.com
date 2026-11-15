"use client";

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
      className="text-sm font-medium text-destructive hover:text-destructive/80"
    >
      {label}
    </button>
  );
}
