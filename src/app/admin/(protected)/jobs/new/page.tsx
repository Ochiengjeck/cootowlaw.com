import { connection } from "next/server";
import { createJobPostingAction } from "../actions";
import { JobPostingForm } from "../job-posting-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function NewJobPostingPage() {
  await connection();

  return (
    <div>
      <AdminPageHeader title="New job posting" />
      <JobPostingForm action={createJobPostingAction} submitLabel="Create" />
    </div>
  );
}
