import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCaseBriefs } from "@/lib/data/case-briefs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { excerpt } from "@/lib/excerpt";

export const metadata: Metadata = { title: "Landmark Briefs" };

function byline(courtReference: string, practiceAreaName: string | undefined) {
  return [courtReference, practiceAreaName].filter(Boolean).join(" · ");
}

export default async function CasesPage() {
  const briefs = await getCaseBriefs();
  const [lead, ...rest] = briefs;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Our track record"
          title="Landmark Briefs"
          description="A selection of significant matters our advocates have handled."
        />
      </Reveal>

      {lead && (
        <Reveal delay={80}>
          <Link href={`/cases/${lead.slug}`} className="group mt-12 block">
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
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
                  {byline(lead.courtReference, lead.practiceArea?.name)}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-charcoal group-hover:text-purple-700 sm:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {excerpt(lead.summaryHtml, 220)}
                </p>
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
          {rest.map((brief, i) => (
            <Reveal key={brief.id} delay={Math.min(120 + i * 60, 400)}>
              <Link href={`/cases/${brief.slug}`} className="group block py-6">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                    {byline(brief.courtReference, brief.practiceArea?.name)}
                  </p>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-purple-700">
                      {brief.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate">
                      {excerpt(brief.summaryHtml, 160)}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
