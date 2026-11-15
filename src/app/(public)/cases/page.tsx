import type { Metadata } from "next";
import Link from "next/link";
import { getCaseBriefs } from "@/lib/data/case-briefs";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "Landmark Briefs" };

export default async function CasesPage() {
  const rows = await getCaseBriefs();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Our track record"
        title="Landmark Briefs"
        description="A selection of significant matters our advocates have handled."
      />

      <div className="mt-10 space-y-4">
        {rows.map(({ caseBrief, practiceArea }) => (
          <Link
            key={caseBrief.id}
            href={`/cases/${caseBrief.slug}`}
            className="group block rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600">
              <span>{caseBrief.courtReference}</span>
              {practiceArea && (
                <>
                  <span aria-hidden="true" className="text-slate">
                    &middot;
                  </span>
                  <span className="text-slate">{practiceArea.name}</span>
                </>
              )}
            </div>
            <h2 className="mt-2 font-serif text-lg font-semibold text-charcoal">{caseBrief.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
