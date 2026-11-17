import type { ReactNode } from "react";
import { Card } from "./card";
import { IconBox } from "./icon-box";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card className="mt-8 flex flex-col items-center p-10 text-center">
      <IconBox>{icon}</IconBox>
      <h2 className="font-serif text-lg font-semibold text-charcoal">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-slate">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </Card>
  );
}
