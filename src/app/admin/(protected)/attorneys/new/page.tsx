import { createAttorneyAction } from "../actions";
import { AttorneyForm } from "../attorney-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListOffices } from "@/lib/data/offices";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListMedia } from "@/lib/data/media";

export default async function NewAttorneyPage() {
  const [offices, practiceAreas, mediaItems] = await Promise.all([
    adminListOffices(),
    adminListPracticeAreas(),
    adminListMedia(),
  ]);

  return (
    <div>
      <AdminPageHeader title="New person" />
      <AttorneyForm
        action={createAttorneyAction}
        offices={offices}
        practiceAreas={practiceAreas}
        mediaItems={mediaItems}
        submitLabel="Create"
      />
    </div>
  );
}
