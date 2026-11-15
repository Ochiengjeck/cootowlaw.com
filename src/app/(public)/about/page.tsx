import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data/settings";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "About the Firm" };

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const staffingStats = settings?.staffingStats ?? null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="About the Firm"
        title={settings?.firmName ?? "Cootow & Associates Advocates"}
      />

      {settings?.aboutHeroImage && (
        <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
          <Image
            src={settings.aboutHeroImage.url}
            alt={settings.aboutHeroImage.alt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div
        className="rich-text mt-8"
        dangerouslySetInnerHTML={{ __html: settings?.aboutHtml ?? "" }}
      />

      <h2 className="mt-12 font-serif text-2xl font-semibold text-charcoal">Our Mission</h2>
      <div
        className="rich-text mt-4"
        dangerouslySetInnerHTML={{ __html: settings?.missionHtml ?? "" }}
      />

      {settings && settings.coreValues.length > 0 && (
        <>
          <h2 className="mt-12 font-serif text-2xl font-semibold text-charcoal">Core Values</h2>
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
        </>
      )}

      {staffingStats && (
        <>
          <h2 className="mt-12 font-serif text-2xl font-semibold text-charcoal">Our Offices</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(staffingStats).map(([office, stats]) => (
              <div key={office} className="rounded-2xl border border-border bg-muted p-5">
                <h3 className="font-serif text-lg font-semibold capitalize text-charcoal">{office}</h3>
                <p className="mt-1 text-sm text-slate">
                  {stats.associates} Associates &middot; {stats.paralegals} Paralegals
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {settings?.advocAfricaBlurb && (
        <div className="mt-12 rounded-2xl bg-charcoal p-6 text-sm text-white/70">
          {settings.advocAfricaBlurb}
        </div>
      )}
    </div>
  );
}
