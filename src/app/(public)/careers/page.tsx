import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Join us" title="Work with us" />
      <div
        className="rich-text mt-6"
        dangerouslySetInnerHTML={{
          __html:
            settings?.careersHtml ??
            "<p>We don't have open vacancies at the moment. Please check back later.</p>",
        }}
      />
    </div>
  );
}
