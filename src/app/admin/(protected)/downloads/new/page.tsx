import { createDownloadAction } from "../actions";
import { DownloadForm } from "../download-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewDownloadPage() {
  return (
    <div>
      <AdminPageHeader title="New download" />
      <DownloadForm action={createDownloadAction} submitLabel="Create" />
    </div>
  );
}
