import { notFound } from "next/navigation";
import { adminGetNewsPost } from "@/lib/data/news";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { adminListMedia } from "@/lib/data/media";
import { updateNewsPostAction } from "../../actions";
import { NewsForm } from "../../news-form";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function EditNewsPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, authors, mediaItems] = await Promise.all([
    adminGetNewsPost(id),
    adminListAttorneys(),
    adminListMedia(),
  ]);
  if (!post) notFound();

  const action = updateNewsPostAction.bind(null, post.id, post.slug);

  return (
    <div>
      <AdminPageHeader title={`Edit ${post.title}`} />
      <NewsForm
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
