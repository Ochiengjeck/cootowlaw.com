import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPracticeAreaBySlug, getPracticeAreas } from "@/lib/data/practice-areas";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { getPracticeIcon } from "@/lib/practice-icons";

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
      <Reveal>
        <Link
          href="/practices"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All Practice Areas
        </Link>
      </Reveal>

      {practiceArea &&
        (() => {
          const PracticeIcon = getPracticeIcon(practiceArea.slug);
          return (
            <Reveal delay={80}>
              <IconBox>
                <PracticeIcon className="h-6 w-6" />
              </IconBox>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
                {practiceArea.name}
              </h1>
            </Reveal>
          );
        })()}

      {practiceArea.heroImage && (
        <Reveal delay={110}>
          <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
            <Image
              src={practiceArea.heroImage.url}
              alt={practiceArea.heroImage.alt || practiceArea.name}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      <Reveal delay={140}>
        <div
          className="rich-text mt-6"
          dangerouslySetInnerHTML={{ __html: practiceArea.descriptionHtml }}
        />
      </Reveal>

      {practiceArea.servicesList.length > 0 && (
        <Reveal delay={200}>
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
        </Reveal>
      )}

      <Reveal delay={260}>
        <div className="mt-12 rounded-2xl bg-charcoal p-8 text-white">
          <p className="text-sm text-white/70">
            Need advice in this area?{" "}
            <Link href="/offices" className="font-semibold text-gold-400 hover:text-white">
              Contact one of our offices
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
