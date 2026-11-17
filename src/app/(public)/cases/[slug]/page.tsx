import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBriefBySlug, getCaseBriefs } from "@/lib/data/case-briefs";
import { Reveal } from "@/components/ui/reveal";

export async function generateStaticParams() {
  const briefs = await getCaseBriefs();
  return briefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brief = await getCaseBriefBySlug(slug);
  return { title: brief?.title ?? "Landmark Brief" };
}

export default async function CaseBriefPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brief = await getCaseBriefBySlug(slug);
  if (!brief) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/cases"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All Landmark Briefs
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            Our track record
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
            {brief.title}
          </h1>
          <p className="mt-2 text-sm text-slate">
            {brief.courtReference}
            {brief.practiceArea && (
              <>
                <span className="px-2 text-border">|</span>
                <Link href={`/practices/${brief.practiceArea.slug}`} className="hover:text-purple-600">
                  {brief.practiceArea.name}
                </Link>
              </>
            )}
          </p>
        </div>
      </Reveal>

      {brief.coverImage && (
        <Reveal delay={140}>
          <div className="relative mt-8 h-56 w-full overflow-hidden sm:h-80">
            <Image
              src={brief.coverImage.url}
              alt={brief.coverImage.alt || brief.title}
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
          dangerouslySetInnerHTML={{ __html: brief.summaryHtml }}
        />
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-10 rounded-2xl bg-charcoal p-8 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400">
            Outcome
          </span>
          <div
            className="rich-text on-dark mt-4 text-sm"
            dangerouslySetInnerHTML={{ __html: brief.outcomeHtml }}
          />
        </div>
      </Reveal>
    </div>
  );
}
