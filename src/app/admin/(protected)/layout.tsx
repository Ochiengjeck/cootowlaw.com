import { Suspense, type ReactNode } from "react";
import { connection } from "next/server";
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
  // Every admin page is session-gated and never needs a static shell — force
  // dynamic rendering here so time-sensitive values deep in the tree (e.g.
  // iron-session's cookie TTL check) don't trip Cache Components' prerender
  // analysis on individual admin routes.
  await connection();
  const admin = await getCurrentAdmin();
  return (
    <>
      <Topbar admin={admin} />
      <main className="p-6">{children}</main>
    </>
  );
}
