import { createCaseBriefAction } from "../actions";
import { CaseBriefForm } from "../case-brief-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListClients } from "@/lib/data/clients";
import { adminListMedia } from "@/lib/data/media";

export default async function NewCaseBriefPage() {
  const [practiceAreas, clients, mediaItems] = await Promise.all([
    adminListPracticeAreas(),
    adminListClients(),
    adminListMedia(),
  ]);

  return (
    <div>
      <AdminPageHeader title="New landmark brief" />
      <CaseBriefForm
        action={createCaseBriefAction}
        practiceAreas={practiceAreas}
        clients={clients}
        mediaItems={mediaItems}
        submitLabel="Create"
      />
    </div>
  );
}
