import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDigestPosts } from "@/lib/data/digest";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CalendarIcon } from "@/lib/icons";
import { SubscribeForm } from "./subscribe-form";

export const metadata: Metadata = { title: "Legal Digest" };

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function DigestPage() {
  const posts = await getDigestPosts();
  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Stay informed"
          title="Legal Digest"
          description="Periodic roundups of legal and regulatory developments relevant to our clients."
        />
      </Reveal>

      <Reveal delay={40}>
        <div className="mt-8">
          <SubscribeForm />
        </div>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal>
          <EmptyState
            icon={<CalendarIcon className="h-6 w-6" />}
            title="No digest issues published yet"
            description="Subscribe above and check back soon for our first roundup."
          />
        </Reveal>
      ) : (
        <>
          {lead && (
            <Reveal delay={80}>
              <Link href={`/digest/${lead.slug}`} className="group mt-12 block">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-5 sm:items-center sm:gap-10">
                  {lead.coverImage && (
                    <div className="relative h-56 overflow-hidden sm:col-span-2 sm:h-72">
                      <Image
                        src={lead.coverImage.url}
                        alt={lead.coverImage.alt || lead.title}
                        fill
                        sizes="(min-width: 640px) 400px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className={lead.coverImage ? "sm:col-span-3" : "sm:col-span-5"}>
                    {lead.publishedAt && (
                      <time className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-600">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {formatDate(lead.publishedAt)}
                      </time>
                    )}
                    <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-charcoal group-hover:text-purple-700 sm:text-3xl">
                      {lead.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{lead.excerpt}</p>
                    <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-700">
                      Continue reading
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-14 divide-y divide-border border-y border-border">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={Math.min(120 + i * 60, 400)}>
                  <Link href={`/digest/${post.slug}`} className="group block py-6">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[9rem_1fr] sm:gap-8">
                      {post.publishedAt && (
                        <time className="text-xs font-semibold uppercase tracking-wider text-slate">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-purple-700">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate">{post.excerpt}</p>
                      </div>
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
