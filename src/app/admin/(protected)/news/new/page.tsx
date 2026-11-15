import { createNewsPostAction } from "../actions";
import { NewsForm } from "../news-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { adminListMedia } from "@/lib/data/media";

export default async function NewNewsPostPage() {
  const [authors, mediaItems] = await Promise.all([adminListAttorneys(), adminListMedia()]);

  return (
    <div>
      <AdminPageHeader title="New news post" />
      <NewsForm
        action={createNewsPostAction}
        authors={authors}
        mediaItems={mediaItems}
        submitLabel="Create"
      />
    </div>
  );
}
