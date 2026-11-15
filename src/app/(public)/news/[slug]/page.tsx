import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/data/news";

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  return { title: post?.title ?? "News" };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post || !post.publishedAt) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/news"
        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
      >
        &larr; All News
      </Link>
      <time className="mt-4 block text-xs font-semibold uppercase tracking-wider text-purple-600">
        {new Date(post.publishedAt).toLocaleDateString("en-KE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
        {post.title}
      </h1>
      <div className="rich-text mt-8" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
    </div>
  );
}
