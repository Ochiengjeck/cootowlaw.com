import { createCaseBriefAction } from "../actions";
import { CaseBriefForm } from "../case-brief-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListClients } from "@/lib/data/clients";

export default async function NewCaseBriefPage() {
  const [practiceAreas, clients] = await Promise.all([
    adminListPracticeAreas(),
    adminListClients(),
  ]);

  return (
    <div>
      <AdminPageHeader title="New landmark brief" />
      <CaseBriefForm
        action={createCaseBriefAction}
        practiceAreas={practiceAreas}
        clients={clients}
        submitLabel="Create"
      />
    </div>
  );
}
