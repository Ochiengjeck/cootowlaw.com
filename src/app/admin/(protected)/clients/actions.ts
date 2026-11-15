"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { createClient, deleteClient, updateClient, type ClientInput } from "@/lib/data/clients";

export type ClientFormState = { error?: string } | undefined;

function parseForm(formData: FormData): ClientInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim() || null;
  const logoId = String(formData.get("logoId") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (!name || !industry) {
    return { error: "Name and industry are required." };
  }

  return { name, industry, website, logoId, sortOrder };
}

export async function createClientAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await createClient(parsed);
  updateTag("clients-list");
  redirect("/admin/clients");
}

export async function updateClientAction(
  id: string,
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  await getCurrentAdmin();
  const parsed = parseForm(formData);
  if ("error" in parsed) return parsed;

  await updateClient(id, parsed);
  updateTag("clients-list");
  redirect("/admin/clients");
}

export async function deleteClientAction(id: string) {
  await getCurrentAdmin();
  await deleteClient(id);
  updateTag("clients-list");
  redirect("/admin/clients");
}
