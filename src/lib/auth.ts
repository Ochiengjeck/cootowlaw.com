import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findAdminById } from "@/lib/data/admins";
import type { AdminRole } from "@/lib/db/schema";

export type CurrentAdmin = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin> {
  "use cache: private";

  const { adminId } = await getSession();
  if (!adminId) {
    redirect("/admin/login");
  }

  const admin = await findAdminById(adminId);
  if (!admin) {
    redirect("/admin/login");
  }

  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}
