import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAttorneyBySlug, getAttorneys } from "@/lib/data/attorneys";
import { Avatar } from "@/components/avatar";

const TIER_LABEL: Record<string, string> = {
  partner: "Partner",
  associate: "Associate",
  staff: "Staff",
};

export async function generateStaticParams() {
  const attorneys = await getAttorneys();
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attorney = await getAttorneyBySlug(slug);
  return { title: attorney?.name ?? "Our People" };
}

export default async function AttorneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const attorney = await getAttorneyBySlug(slug);
  if (!attorney) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/people"
        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
      >
        &larr; All People
      </Link>

      <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar name={attorney.name} photo={attorney.photo} size={96} className="ring-4 ring-purple-50" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
            {TIER_LABEL[attorney.tier]}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
            {attorney.name}
          </h1>
          <p className="mt-1 text-slate">{attorney.title}</p>
          {attorney.office && (
            <p className="mt-1 text-sm text-slate">{attorney.office.name}</p>
          )}
        </div>
      </div>

      {attorney.bioHtml && (
        <div className="rich-text mt-8" dangerouslySetInnerHTML={{ __html: attorney.bioHtml }} />
      )}

      {attorney.credentials && (
        <div className="mt-8 rounded-2xl border border-border bg-muted p-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-charcoal">
            Credentials
          </h2>
          <p className="mt-2 text-sm text-slate">{attorney.credentials}</p>
        </div>
      )}

      {attorney.practiceAreas.length > 0 && (
        <div className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-charcoal">Practice Areas</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {attorney.practiceAreas.map((pa) => (
              <Link
                key={pa.id}
                href={`/practices/${pa.slug}`}
                className="rounded-full border border-purple-500/20 bg-purple-50 px-4 py-2 text-sm text-purple-700 transition-colors hover:bg-purple-500 hover:text-white"
              >
                {pa.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
