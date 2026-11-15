import { notFound } from "next/navigation";
import { adminGetOffice } from "@/lib/data/offices";
import { adminListMedia } from "@/lib/data/media";
import { updateOfficeAction } from "../../actions";
import { OfficeForm } from "../../office-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditOfficePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [office, mediaItems] = await Promise.all([adminGetOffice(id), adminListMedia()]);
  if (!office) notFound();

  const action = updateOfficeAction.bind(null, office.id, office.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${office.name}`} />
      <OfficeForm
        action={action}
        mediaItems={mediaItems}
        defaultValues={{
          slug: office.slug,
          name: office.name,
          addressLine1: office.addressLine1,
          addressLine2: office.addressLine2,
          city: office.city,
          phone: office.phone,
          email: office.email,
          officeHours: office.officeHours,
          mapEmbedUrl: office.mapEmbedUrl,
          heroImageId: office.heroImageId,
          sortOrder: office.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
