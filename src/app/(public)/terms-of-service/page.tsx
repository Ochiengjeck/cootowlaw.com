import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { DocumentIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "Terms of Service" };

export default async function TermsOfServicePage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow="Legal" title="Terms of Service" />
      </Reveal>

      {settings?.termsOfServiceHtml ? (
        <Reveal delay={80}>
          <div
            className="rich-text mt-8"
            dangerouslySetInnerHTML={{ __html: settings.termsOfServiceHtml }}
          />
        </Reveal>
      ) : (
        <Reveal delay={80}>
          <EmptyState
            icon={<DocumentIcon className="h-6 w-6" />}
            title="Terms of Service coming soon"
            description={
              <>
                Our terms of service are being finalised. In the meantime, please contact{" "}
                <a href="mailto:info@cootowlaw.com" className="text-purple-600 hover:underline">
                  info@cootowlaw.com
                </a>{" "}
                with any questions about using this site.
              </>
            }
          />
        </Reveal>
      )}
    </div>
  );
}
