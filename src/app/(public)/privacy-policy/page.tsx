import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { DocumentIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      </Reveal>

      {settings?.privacyPolicyHtml ? (
        <Reveal delay={80}>
          <div
            className="rich-text mt-8"
            dangerouslySetInnerHTML={{ __html: settings.privacyPolicyHtml }}
          />
        </Reveal>
      ) : (
        <Reveal delay={80}>
          <EmptyState
            icon={<DocumentIcon className="h-6 w-6" />}
            title="Privacy policy coming soon"
            description={
              <>
                Our privacy policy is being finalised. In the meantime, please contact{" "}
                <a href="mailto:info@cootowlaw.com" className="text-purple-600 hover:underline">
                  info@cootowlaw.com
                </a>{" "}
                with any questions about how we handle your data.
              </>
            }
          />
        </Reveal>
      )}
    </div>
  );
}
