import type { Metadata } from "next";
import Link from "next/link";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBox } from "@/components/ui/icon-box";
import { getPracticeIcon } from "@/lib/practice-icons";

export const metadata: Metadata = { title: "Practice Areas" };

export default async function PracticesPage() {
  const practiceAreas = await getPracticeAreas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="What we do"
        title="Practice Areas"
        description="Our advocates cover a broad range of legal disciplines across Eastern Africa."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {practiceAreas.map((pa) => {
          const PracticeIcon = getPracticeIcon(pa.slug);
          return (
            <Link
              key={pa.id}
              href={`/practices/${pa.slug}`}
              className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
            >
              <IconBox>
                <PracticeIcon className="h-6 w-6" />
              </IconBox>
              <h2 className="font-serif text-lg font-semibold text-charcoal">{pa.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">{pa.summary}</p>
              <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                Learn more
                <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
