import { connection } from "next/server";
import { createDigestPostAction } from "../actions";
import { DigestForm } from "../digest-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { adminListMedia } from "@/lib/data/media";

export default async function NewDigestPostPage() {
  await connection();
  const [authors, mediaItems] = await Promise.all([adminListAttorneys(), adminListMedia()]);

  return (
    <div>
      <AdminPageHeader title="New digest issue" />
      <DigestForm
        action={createDigestPostAction}
        authors={authors}
        mediaItems={mediaItems}
        submitLabel="Create"
      />
    </div>
  );
}
