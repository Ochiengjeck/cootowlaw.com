import { createClientAction } from "../actions";
import { ClientForm } from "../client-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListMedia } from "@/lib/data/media";

export default async function NewClientPage() {
  const mediaItems = await adminListMedia();

  return (
    <div>
      <AdminPageHeader title="New client" />
      <ClientForm action={createClientAction} mediaItems={mediaItems} submitLabel="Create" />
    </div>
  );
}
