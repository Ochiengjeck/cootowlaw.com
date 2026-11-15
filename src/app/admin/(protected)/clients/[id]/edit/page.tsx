import { notFound } from "next/navigation";
import { adminGetClient } from "@/lib/data/clients";
import { adminListMedia } from "@/lib/data/media";
import { updateClientAction } from "../../actions";
import { ClientForm } from "../../client-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [client, mediaItems] = await Promise.all([adminGetClient(id), adminListMedia()]);
  if (!client) notFound();

  const action = updateClientAction.bind(null, client.id);

  return (
    <div>
      <AdminPageHeader title={`Edit ${client.name}`} />
      <ClientForm
        action={action}
        mediaItems={mediaItems}
        defaultValues={{
          name: client.name,
          industry: client.industry,
          website: client.website,
          logoId: client.logoId,
          sortOrder: client.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
