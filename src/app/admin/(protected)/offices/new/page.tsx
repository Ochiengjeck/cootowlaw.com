import { connection } from "next/server";
import { createOfficeAction } from "../actions";
import { OfficeForm } from "../office-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListMedia } from "@/lib/data/media";

export default async function NewOfficePage() {
  await connection();
  const mediaItems = await adminListMedia();

  return (
    <div>
      <AdminPageHeader title="New office" />
      <OfficeForm action={createOfficeAction} mediaItems={mediaItems} submitLabel="Create" />
    </div>
  );
}
