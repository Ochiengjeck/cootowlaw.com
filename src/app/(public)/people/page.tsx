import type { Metadata } from "next";
import Image from "next/image";
import { getAttorneys } from "@/lib/data/attorneys";
import type { AttorneyTier } from "@/lib/db/schema";
import { PartnerCard } from "@/components/partner-card";
import { TeamMemberCard } from "@/components/team-member-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

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

      <Reveal delay={60}>
        <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
          <Image
            src="/images/hero/about-banner.webp"
            alt="The Cootow & Associates Advocates team"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={80}>
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
