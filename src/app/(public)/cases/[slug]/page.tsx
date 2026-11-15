import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBriefBySlug, getCaseBriefs } from "@/lib/data/case-briefs";

export async function generateStaticParams() {
  const rows = await getCaseBriefs();
  return rows.map(({ caseBrief }) => ({ slug: caseBrief.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const row = await getCaseBriefBySlug(slug);
  return { title: row?.caseBrief.title ?? "Landmark Brief" };
}

export default async function CaseBriefPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await getCaseBriefBySlug(slug);
  if (!row) notFound();
  const { caseBrief, practiceArea } = row;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/cases"
        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
      >
        &larr; All Landmark Briefs
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600">
        <span>{caseBrief.courtReference}</span>
        {practiceArea && (
          <>
            <span aria-hidden="true" className="text-slate">
              &middot;
            </span>
            <Link
              href={`/practices/${practiceArea.slug}`}
              className="text-slate hover:text-purple-600"
            >
              {practiceArea.name}
            </Link>
          </>
        )}
      </div>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
        {caseBrief.title}
      </h1>

      <div
        className="rich-text mt-8"
        dangerouslySetInnerHTML={{ __html: caseBrief.summaryHtml }}
      />

      <div className="mt-8 rounded-2xl bg-charcoal p-8 text-white">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400">
          Outcome
        </span>
        <div
          className="rich-text on-dark mt-4 text-sm"
          dangerouslySetInnerHTML={{ __html: caseBrief.outcomeHtml }}
        />
      </div>
    </div>
  );
}
