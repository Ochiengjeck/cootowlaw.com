import type { Metadata } from "next";
import Link from "next/link";
import { getNewsPosts } from "@/lib/data/news";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "News" };

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Insights" title="News" />

      {posts.length === 0 ? (
        <p className="mt-8 text-slate">No articles published yet. Check back soon.</p>
      ) : (
        <div className="mt-10 space-y-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group block rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
            >
              {post.publishedAt && (
                <time className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                  {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <h2 className="mt-2 font-serif text-xl font-semibold text-charcoal">{post.title}</h2>
              <p className="mt-2 text-sm text-slate">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
