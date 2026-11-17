import type { ReactNode } from "react";

const toneClass = {
  success: "bg-purple-50 text-purple-700",
  pending: "bg-gold-50 text-gold-600",
  neutral: "bg-surface text-slate",
  danger: "bg-destructive/10 text-destructive",
  info: "border border-border bg-white text-charcoal",
} as const;

export function StatusBadge({
  tone,
  dot = false,
  children,
}: {
  tone: keyof typeof toneClass;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneClass[tone]}`}
    >
      {dot && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
