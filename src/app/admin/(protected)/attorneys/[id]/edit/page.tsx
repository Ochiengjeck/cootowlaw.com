import { notFound } from "next/navigation";
import { adminGetAttorney } from "@/lib/data/attorneys";
import { adminListOffices } from "@/lib/data/offices";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListMedia } from "@/lib/data/media";
import { updateAttorneyAction } from "../../actions";
import { AttorneyForm } from "../../attorney-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditAttorneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [attorney, offices, practiceAreas, mediaItems] = await Promise.all([
    adminGetAttorney(id),
    adminListOffices(),
    adminListPracticeAreas(),
    adminListMedia(),
  ]);
  if (!attorney) notFound();

  const action = updateAttorneyAction.bind(null, attorney.id, attorney.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${attorney.name}`} />
      <AttorneyForm
        action={action}
        offices={offices}
        practiceAreas={practiceAreas}
        mediaItems={mediaItems}
        defaultValues={{
          slug: attorney.slug,
          name: attorney.name,
          title: attorney.title,
          tier: attorney.tier,
          bioHtml: attorney.bioHtml,
          credentials: attorney.credentials,
          email: attorney.email,
          phone: attorney.phone,
          officeId: attorney.officeId,
          photoId: attorney.photoId,
          sortOrder: attorney.sortOrder,
          isActive: attorney.isActive,
          practiceAreaIds: attorney.practiceAreaIds,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
