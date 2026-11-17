import { createPracticeAreaAction } from "../actions";
import { PracticeAreaForm } from "../practice-area-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListMedia } from "@/lib/data/media";

export default async function NewPracticeAreaPage() {
  const mediaItems = await adminListMedia();

  return (
    <div>
      <AdminPageHeader title="New practice area" />
      <PracticeAreaForm action={createPracticeAreaAction} mediaItems={mediaItems} submitLabel="Create" />
    </div>
  );
}
