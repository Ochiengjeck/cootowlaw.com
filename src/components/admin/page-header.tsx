import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-serif text-2xl font-semibold text-charcoal">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
