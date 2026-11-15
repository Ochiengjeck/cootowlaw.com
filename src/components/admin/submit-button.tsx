import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export function LinkButton({
  href,
  className,
  ...props
}: { href: string; className?: string } & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700 ${className ?? ""}`}
      {...props}
    />
  );
}

export function SubmitButton({
  pending,
  label,
  pendingLabel = "Saving…",
  className,
  ...props
}: {
  pending: boolean;
  label: string;
  pendingLabel?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "type">) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-60 ${className ?? ""}`}
      {...props}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
