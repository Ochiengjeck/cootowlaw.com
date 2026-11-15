import { createPracticeAreaAction } from "../actions";
import { PracticeAreaForm } from "../practice-area-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewPracticeAreaPage() {
  return (
    <div>
      <AdminPageHeader title="New practice area" />
      <PracticeAreaForm action={createPracticeAreaAction} submitLabel="Create" />
    </div>
  );
}
