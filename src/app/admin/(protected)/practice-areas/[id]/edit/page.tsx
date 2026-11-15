import { notFound } from "next/navigation";
import { adminGetPracticeArea } from "@/lib/data/practice-areas";
import { updatePracticeAreaAction } from "../../actions";
import { PracticeAreaForm } from "../../practice-area-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditPracticeAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const practiceArea = await adminGetPracticeArea(id);
  if (!practiceArea) notFound();

  const action = updatePracticeAreaAction.bind(null, practiceArea.id, practiceArea.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${practiceArea.name}`} />
      <PracticeAreaForm
        action={action}
        defaultValues={{
          slug: practiceArea.slug,
          name: practiceArea.name,
          summary: practiceArea.summary,
          descriptionHtml: practiceArea.descriptionHtml,
          servicesList: practiceArea.servicesList,
          sortOrder: practiceArea.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
