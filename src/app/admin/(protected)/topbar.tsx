import type { CurrentAdmin } from "@/lib/auth";
import { logout } from "./actions";

export function Topbar({ admin }: { admin: CurrentAdmin }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-white px-6 py-3">
      <span className="text-sm text-slate">
        Signed in as <span className="font-medium text-charcoal">{admin.name}</span> (
        {admin.role})
      </span>
      <form action={logout}>
        <button type="submit" className="text-sm text-slate hover:text-purple-600">
          Sign out
        </button>
      </form>
    </header>
  );
}
