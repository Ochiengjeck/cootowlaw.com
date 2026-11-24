import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDigestPostBySlug } from "@/lib/data/digest";
import { Reveal } from "@/components/ui/reveal";
import { HeroBanner } from "@/components/ui/hero-banner";

// No generateStaticParams: the Digest is a brand-new, currently-empty content type,
// and Cache Components requires at least one real param when the export is present
// (an empty array is a build error). Omitting it is documented as valid — the route
// just renders per-request instead of being prerendered — and sidesteps a recurring
// build break if digest posts are ever all removed. Can add it back once there's a
// steady base of published issues to prerender.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDigestPostBySlug(slug);
  return { title: post?.title ?? "Legal Digest" };
}

export default async function DigestPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getDigestPostBySlug(slug);
  if (!post || !post.publishedAt) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/digest"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All Digest Issues
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Legal Digest
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
        <HeroBanner
          src={post.coverImage.url}
          alt={post.coverImage.alt || post.title}
          delay={140}
          heightClassName="h-48 sm:h-80"
          roundedClassName=""
        />
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
