import type { ReactNode } from "react";

const toneClass = {
  success: "bg-purple-50 text-purple-700",
  pending: "bg-gold-50 text-gold-600",
  neutral: "bg-surface text-slate",
} as const;

export function StatusBadge({
  tone,
  children,
}: {
  tone: keyof typeof toneClass;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
