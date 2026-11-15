"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { adminMarkContactSubmissionHandled } from "@/lib/data/contact";

export async function markHandledAction(id: string) {
  await getCurrentAdmin();
  await adminMarkContactSubmissionHandled(id);
  revalidatePath("/admin/messages");
}
