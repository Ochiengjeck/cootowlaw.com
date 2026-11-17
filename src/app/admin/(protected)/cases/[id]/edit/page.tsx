import { notFound } from "next/navigation";
import { adminGetCaseBrief } from "@/lib/data/case-briefs";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListClients } from "@/lib/data/clients";
import { adminListMedia } from "@/lib/data/media";
import { updateCaseBriefAction } from "../../actions";
import { CaseBriefForm } from "../../case-brief-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditCaseBriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [caseBrief, practiceAreas, clients, mediaItems] = await Promise.all([
    adminGetCaseBrief(id),
    adminListPracticeAreas(),
    adminListClients(),
    adminListMedia(),
  ]);
  if (!caseBrief) notFound();

  const action = updateCaseBriefAction.bind(null, caseBrief.id, caseBrief.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${caseBrief.title}`} />
      <CaseBriefForm
        action={action}
        practiceAreas={practiceAreas}
        clients={clients}
        mediaItems={mediaItems}
        defaultValues={{
          slug: caseBrief.slug,
          title: caseBrief.title,
          courtReference: caseBrief.courtReference,
          summaryHtml: caseBrief.summaryHtml,
          outcomeHtml: caseBrief.outcomeHtml,
          practiceAreaId: caseBrief.practiceAreaId,
          clientId: caseBrief.clientId,
          coverImageId: caseBrief.coverImageId,
          year: caseBrief.year,
          sortOrder: caseBrief.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
