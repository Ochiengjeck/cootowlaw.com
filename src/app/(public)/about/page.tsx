import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data/settings";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "About the Firm" };

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const staffingStats = settings?.staffingStats ?? null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="About the Firm"
          title={settings?.firmName ?? "Cootow & Associates Advocates"}
        />
      </Reveal>

      {settings?.aboutHeroImage && (
        <Reveal delay={60}>
          <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
            <Image
              src={settings.aboutHeroImage.url}
              alt={settings.aboutHeroImage.alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      <Reveal delay={120}>
        <div
          className="rich-text mt-8"
          dangerouslySetInnerHTML={{ __html: settings?.aboutHtml ?? "" }}
        />
      </Reveal>

      <Reveal delay={160}>
        <SectionHeading
          className="mt-12"
          align="left"
          eyebrow="Our purpose"
          title="Our Mission"
        />
        <div
          className="rich-text mt-4"
          dangerouslySetInnerHTML={{ __html: settings?.missionHtml ?? "" }}
        />
      </Reveal>

      {settings && settings.coreValues.length > 0 && (
        <Reveal delay={200}>
          <SectionHeading
            className="mt-12"
            align="left"
            eyebrow="What drives us"
            title="Core Values"
          />
          <ul className="mt-4 flex flex-wrap gap-3">
            {settings.coreValues.map((value) => (
              <li
                key={value}
                className="rounded-full border border-purple-500/20 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700"
              >
                {value}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {staffingStats && (
        <Reveal delay={240}>
          <SectionHeading
            className="mt-12"
            align="left"
            eyebrow="Our people"
            title="Our Offices"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(staffingStats).map(([office, stats]) => (
              <Card key={office} className="bg-muted p-5">
                <h3 className="font-serif text-lg font-semibold capitalize text-charcoal">
                  {office}
                </h3>
                <p className="mt-1 text-sm text-slate">
                  {stats.associates} Associates &middot; {stats.paralegals} Paralegals
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
