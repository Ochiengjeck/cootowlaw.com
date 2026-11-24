"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { deleteDigestSubscriber } from "@/lib/data/digest-subscribers";

export async function deleteSubscriberAction(id: string) {
  await getCurrentAdmin();
  await deleteDigestSubscriber(id);
  revalidatePath("/admin/subscribers");
}
