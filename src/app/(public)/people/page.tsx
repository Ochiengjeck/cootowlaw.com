import type { Metadata } from "next";
import { getAttorneys } from "@/lib/data/attorneys";
import type { AttorneyTier } from "@/lib/db/schema";
import { PartnerCard } from "@/components/partner-card";
import { TeamMemberCard } from "@/components/team-member-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CardLink } from "@/components/ui/card";

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
      <Reveal>
        <SectionHeading eyebrow="Our team" title="People" />
      </Reveal>

      <Reveal delay={80}>
        <nav aria-label="Jump to section" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TIER_SECTIONS.map((section) => {
            const count = attorneys.filter((a) => a.tier === section.tier).length;
            if (count === 0) return null;
            return (
              <CardLink key={section.id} href={`#${section.id}`} className="p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                  {count} {count === 1 ? "Person" : "People"}
                </span>
                <h2 className="mt-2 font-serif text-xl font-semibold text-charcoal">
                  {section.label}
                </h2>
                <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                  View
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </CardLink>
            );
          })}
        </nav>
      </Reveal>

      {TIER_SECTIONS.map((section) => {
        const people = attorneys.filter((a) => a.tier === section.tier);
        if (people.length === 0) return null;
        const isPartnerTier = section.tier === "partner";

        return (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-20">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-charcoal">{section.label}</h2>
            </Reveal>

            {isPartnerTier ? (
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person, i) => (
                  <Reveal key={person.id} delay={Math.min(i * 60, 300)}>
                    <PartnerCard attorney={person} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person, i) => (
                  <Reveal key={person.id} delay={Math.min(i * 60, 300)}>
                    <TeamMemberCard person={person} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
