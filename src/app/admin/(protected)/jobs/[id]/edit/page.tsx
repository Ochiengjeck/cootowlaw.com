import { notFound } from "next/navigation";
import { adminGetJobPosting } from "@/lib/data/job-postings";
import { updateJobPostingAction } from "../../actions";
import { JobPostingForm } from "../../job-posting-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditJobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const posting = await adminGetJobPosting(id);
  if (!posting) notFound();

  const action = updateJobPostingAction.bind(null, posting.id, posting.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${posting.title}`} />
      <JobPostingForm
        action={action}
        defaultValues={{
          slug: posting.slug,
          title: posting.title,
          department: posting.department,
          location: posting.location,
          employmentType: posting.employmentType,
          summary: posting.summary,
          descriptionHtml: posting.descriptionHtml,
          isOpen: posting.isOpen,
          sortOrder: posting.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
