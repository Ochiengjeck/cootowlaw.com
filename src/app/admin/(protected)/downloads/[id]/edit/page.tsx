import { notFound } from "next/navigation";
import { adminGetDownload } from "@/lib/data/downloads";
import { updateDownloadAction } from "../../actions";
import { DownloadForm } from "../../download-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditDownloadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await adminGetDownload(id);
  if (!item) notFound();

  const action = updateDownloadAction.bind(null, item.id, {
    fileUrl: item.fileUrl,
    fileFilename: item.fileFilename,
  });

  return (
    <div>
      <AdminPageHeader title={`Edit ${item.title}`} />
      <DownloadForm
        action={action}
        defaultValues={{
          title: item.title,
          description: item.description,
          category: item.category,
          fileFilename: item.fileFilename,
          publishedAt: item.publishedAt,
          sortOrder: item.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
