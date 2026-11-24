import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getNewsPosts } from "@/lib/data/news";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CalendarIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "News" };

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const posts = await getNewsPosts();
  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Insights"
          title="News"
          description="Commentary, updates, and insights from our advocates."
        />
      </Reveal>

      {posts.length === 0 ? (
        <Reveal>
          <EmptyState
            icon={<CalendarIcon className="h-6 w-6" />}
            title="No articles published yet"
            description="Check back soon for updates and insights from our advocates."
          />
        </Reveal>
      ) : (
        <>
          {lead && (
            <Reveal delay={80}>
              <Link
                href={`/news/${lead.slug}`}
                className="group relative mt-12 flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white transition-transform duration-300 hover:-translate-y-0.5 sm:p-10"
              >
                {lead.coverImage ? (
                  <Image
                    src={lead.coverImage.url}
                    alt={lead.coverImage.alt || lead.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-purple-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                <div className="relative max-w-2xl">
                  {lead.publishedAt && (
                    <time className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {formatDate(lead.publishedAt)}
                    </time>
                  )}
                  <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                    {lead.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{lead.excerpt}</p>
                  <span className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 group-hover:text-white">
                    Continue reading
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={Math.min(120 + i * 60, 400)}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
                  >
                    {post.coverImage ? (
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={post.coverImage.url}
                          alt={post.coverImage.alt || post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-44 w-full items-center justify-center bg-muted text-purple-600/30">
                        <CalendarIcon className="h-10 w-10" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {post.publishedAt && (
                        <time className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-charcoal group-hover:text-purple-700">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                        Continue reading
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
