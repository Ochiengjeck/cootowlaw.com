import type { Metadata } from "next";
import { adminListMedia } from "@/lib/data/media";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PhotoIcon } from "@/lib/icons";
import { UploadForm } from "./upload-form";
import { MediaGrid } from "./media-grid";

export const metadata: Metadata = { title: "Media Library" };

export default async function MediaPage() {
  const items = await adminListMedia();

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Images used across offices, people, clients, news, and site settings."
        icon={<PhotoIcon className="h-5 w-5" />}
      />
      <UploadForm />
      <MediaGrid items={items} />
    </div>
  );
}
