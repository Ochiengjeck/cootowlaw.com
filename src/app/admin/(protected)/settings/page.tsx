import { adminGetSiteSettings } from "@/lib/data/settings";
import { adminListOffices } from "@/lib/data/offices";
import { adminListMedia } from "@/lib/data/media";
import { updateSettingsAction } from "./actions";
import { SettingsForm } from "./settings-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CogIcon } from "@/lib/icons";

export default async function SettingsPage() {
  const [settings, offices, mediaItems] = await Promise.all([
    adminGetSiteSettings(),
    adminListOffices(),
    adminListMedia(),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Firm-wide content shown on the homepage, about page, careers page, and privacy policy."
        icon={<CogIcon className="h-5 w-5" />}
      />
      {settings ? (
        <SettingsForm
          action={updateSettingsAction.bind(null, settings.id)}
          offices={offices}
          mediaItems={mediaItems}
          defaultValues={{
            firmName: settings.firmName,
            tagline: settings.tagline,
            foundedYear: settings.foundedYear,
            aboutHtml: settings.aboutHtml,
            missionHtml: settings.missionHtml,
            visionHtml: settings.visionHtml,
            historyHtml: settings.historyHtml,
            coreValues: settings.coreValues,
            advocAfricaBlurb: settings.advocAfricaBlurb,
            staffingStats: settings.staffingStats,
            socialLinks: settings.socialLinks,
            logoId: settings.logoId,
            homeHeroImageId: settings.homeHeroImageId,
            aboutHeroImageId: settings.aboutHeroImageId,
            careersHtml: settings.careersHtml,
            privacyPolicyHtml: settings.privacyPolicyHtml,
            termsOfServiceHtml: settings.termsOfServiceHtml,
          }}
        />
      ) : (
        <p className="text-sm text-slate">
          No site settings row exists yet. Run <code>npm run seed</code> to create the initial
          one.
        </p>
      )}
    </div>
  );
}
