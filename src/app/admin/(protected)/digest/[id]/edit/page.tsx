import { notFound } from "next/navigation";
import { adminGetDigestPost } from "@/lib/data/digest";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { adminListMedia } from "@/lib/data/media";
import { updateDigestPostAction } from "../../actions";
import { DigestForm } from "../../digest-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditDigestPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, authors, mediaItems] = await Promise.all([
    adminGetDigestPost(id),
    adminListAttorneys(),
    adminListMedia(),
  ]);
  if (!post) notFound();

  const action = updateDigestPostAction.bind(null, post.id, post.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${post.title}`} />
      <DigestForm
        action={action}
        authors={authors}
        mediaItems={mediaItems}
        defaultValues={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          bodyHtml: post.bodyHtml,
          coverImageId: post.coverImageId,
          authorId: post.authorId,
          publishedAt: post.publishedAt,
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
