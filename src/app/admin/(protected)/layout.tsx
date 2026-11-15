import { Suspense, type ReactNode } from "react";
import { getCurrentAdmin } from "@/lib/auth";
import { Sidebar, SidebarFallback } from "./sidebar";
import { Topbar } from "./topbar";

export default function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1">
        <Suspense fallback={<div className="p-6 text-sm text-slate">Loading…</div>}>
          <AuthedShell>{children}</AuthedShell>
        </Suspense>
      </div>
    </div>
  );
}

async function AuthedShell({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();
  return (
    <>
      <Topbar admin={admin} />
      <main className="p-6">{children}</main>
    </>
  );
}
