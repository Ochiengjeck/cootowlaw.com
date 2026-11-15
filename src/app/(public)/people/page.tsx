import type { Metadata } from "next";
import Link from "next/link";
import { getAttorneys } from "@/lib/data/attorneys";
import type { AttorneyTier } from "@/lib/db/schema";
import { Avatar } from "@/components/avatar";
import { PartnerCard } from "@/components/partner-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "People" };

const TIER_SECTIONS: { tier: AttorneyTier; id: string; label: string }[] = [
  { tier: "partner", id: "partners", label: "Partners" },
  { tier: "associate", id: "associates", label: "Associates" },
  { tier: "staff", id: "staff", label: "Management & Support Staff" },
];

export default async function PeoplePage() {
  const attorneys = await getAttorneys();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Our team" title="People" />

      <nav
        aria-label="Jump to section"
        className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {TIER_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-purple-500 hover:text-purple-600"
          >
            {section.label}
          </a>
        ))}
      </nav>

      {TIER_SECTIONS.map((section) => {
        const people = attorneys.filter((a) => a.tier === section.tier);
        if (people.length === 0) return null;
        const isPartnerTier = section.tier === "partner";

        return (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-20">
            <h2 className="font-serif text-2xl font-semibold text-charcoal">{section.label}</h2>

            {isPartnerTier ? (
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person) => (
                  <PartnerCard key={person.id} attorney={person} />
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person) => (
                  <Link
                    key={person.id}
                    href={`/people/${person.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
                  >
                    <Avatar
                      name={person.name}
                      photo={person.photo}
                      size={56}
                      className="shrink-0 ring-4 ring-purple-50"
                    />
                    <div>
                      <h3 className="font-serif text-base font-semibold text-charcoal group-hover:text-purple-600">
                        {person.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate">{person.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
