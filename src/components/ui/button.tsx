import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  solid: "bg-gold-500 text-charcoal hover:bg-gold-600",
  ink: "bg-charcoal text-white hover:bg-purple-700",
  outline: "border border-charcoal/15 text-charcoal hover:border-purple-500 hover:text-purple-600",
  "outline-dark": "border border-white/25 text-white hover:border-gold-400 hover:bg-white/10",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors";

export function ButtonLink({
  href,
  variant = "solid",
  className,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<typeof Link> & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`} {...props} />
  );
}

export function Button({
  variant = "solid",
  className,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) {
  return <button className={`${base} ${variants[variant]} ${className ?? ""}`} {...props} />;
}
