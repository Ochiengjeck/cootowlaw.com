import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Privacy Policy</h1>

      {settings?.privacyPolicyHtml ? (
        <div
          className="rich-text mt-8"
          dangerouslySetInnerHTML={{ __html: settings.privacyPolicyHtml }}
        />
      ) : (
        <p className="mt-8 text-slate">
          Our privacy policy is being finalised. In the meantime, please contact{" "}
          <a href="mailto:info@cootowlaw.com" className="text-purple-600 hover:underline">
            info@cootowlaw.com
          </a>{" "}
          with any questions about how we handle your data.
        </p>
      )}
    </div>
  );
}
