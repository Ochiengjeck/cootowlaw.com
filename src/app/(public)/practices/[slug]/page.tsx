import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPracticeAreaBySlug, getPracticeAreas } from "@/lib/data/practice-areas";

export async function generateStaticParams() {
  const practiceAreas = await getPracticeAreas();
  return practiceAreas.map((pa) => ({ slug: pa.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practiceArea = await getPracticeAreaBySlug(slug);
  return { title: practiceArea?.name ?? "Practice Area" };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practiceArea = await getPracticeAreaBySlug(slug);
  if (!practiceArea) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/practices"
        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
      >
        &larr; All Practice Areas
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
        {practiceArea.name}
      </h1>

      <div
        className="rich-text mt-6"
        dangerouslySetInnerHTML={{ __html: practiceArea.descriptionHtml }}
      />

      {practiceArea.servicesList.length > 0 && (
        <>
          <h2 className="mt-10 font-serif text-xl font-semibold text-charcoal">Our services</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {practiceArea.servicesList.map((service) => (
              <li
                key={service}
                className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-charcoal"
              >
                {service}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-12 rounded-2xl bg-charcoal p-8 text-white">
        <p className="text-sm text-white/70">
          Need advice in this area?{" "}
          <Link href="/offices" className="font-semibold text-gold-400 hover:text-white">
            Contact one of our offices
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
