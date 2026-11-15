import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className={`w-full text-left text-sm ${className ?? ""}`} {...props} />
    </div>
  );
}

export function Thead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      className={`border-b border-border bg-surface text-xs uppercase tracking-wide text-slate ${className ?? ""}`}
      {...props}
    />
  );
}

export function Th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return <th className={`px-4 py-3 font-semibold ${className ?? ""}`} {...props} />;
}

export function Td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return <td className={`px-4 py-3 text-charcoal ${className ?? ""}`} {...props} />;
}

export function Tr({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={`border-b border-border last:border-0 hover:bg-surface/60 ${className ?? ""}`}
      {...props}
    />
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="p-6 text-sm text-slate">{children}</p>;
}
