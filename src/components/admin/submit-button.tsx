import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "border border-border bg-white text-charcoal hover:bg-surface",
  ghost: "text-purple-600 hover:bg-purple-50",
  danger: "bg-destructive text-white hover:bg-destructive/90",
};

const baseClass =
  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 disabled:opacity-60";

export function LinkButton({
  href,
  variant = "primary",
  className,
  ...props
}: { href: string; variant?: ButtonVariant; className?: string } & ComponentPropsWithoutRef<
  typeof Link
>) {
  return (
    <Link
      href={href}
      className={`${baseClass} ${variantClass[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}

export function SubmitButton({
  pending,
  label,
  pendingLabel = "Saving…",
  variant = "primary",
  className,
  ...props
}: {
  pending: boolean;
  label: string;
  pendingLabel?: string;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "type">) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseClass} ${variantClass[variant]} ${className ?? ""}`}
      {...props}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
