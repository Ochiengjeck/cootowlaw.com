import type { ReactNode } from "react";

export function IconBox({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-600 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-charcoal">
      {children}
    </div>
  );
}
