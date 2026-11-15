import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(26,24,30,0.18)] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:scale-x-0 before:bg-purple-600 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`${cardClass} ${className ?? ""}`} {...props} />;
}

export function CardLink({ className, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={`${cardClass} block ${className ?? ""}`} {...props} />;
}
