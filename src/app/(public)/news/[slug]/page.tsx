import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsPostBySlug, getNewsPosts } from "@/lib/data/news";
import { Reveal } from "@/components/ui/reveal";

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
      <Reveal>
        <Link
          href="/news"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All News
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Insights
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-slate">
            Cootow &amp; Associates Advocates
            <span className="px-2 text-border">|</span>
            {new Date(post.publishedAt).toLocaleDateString("en-KE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Reveal>

      {post.coverImage && (
        <Reveal delay={140}>
          <div className="relative mt-8 h-56 w-full overflow-hidden sm:h-80">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      <Reveal delay={200}>
        <div
          className="rich-text drop-cap mt-10 text-[17px]"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
      </Reveal>
    </div>
  );
}
