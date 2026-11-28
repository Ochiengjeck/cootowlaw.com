import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Our History" };

export default async function HistoryPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Our Journey"
          title="Our History"
          description="Two Decades of Growth, Experience and Professional Commitment"
        />
      </Reveal>

      {settings?.historyHtml && (
        <Reveal delay={80}>
          <div
            className="rich-text drop-cap mt-10 text-[17px]"
            dangerouslySetInnerHTML={{ __html: settings.historyHtml }}
          />
        </Reveal>
      )}

      <Reveal delay={160}>
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-charcoal p-8 text-center sm:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--purple-700)_55%,transparent)_0%,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
          />
          <p className="relative font-serif text-xl font-semibold leading-relaxed text-white sm:text-2xl">
            Our past defines our foundation. Our experience informs our counsel. Our future is
            shaped by our commitment to excellence.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
