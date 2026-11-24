"use client";

import { useActionState } from "react";
import type { SettingsFormState } from "./actions";
import { TextField, TextAreaField, NumberField } from "@/components/admin/form-fields";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";
import { CogIcon, DocumentIcon, PeopleIcon, BookOpenIcon, ChatBubbleIcon } from "@/lib/icons";
import type { ReactNode } from "react";

type Office = { slug: string; name: string };
type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: SettingsFormState, formData: FormData) => Promise<SettingsFormState>;
  offices: Office[];
  mediaItems: MediaItem[];
  defaultValues: {
    firmName: string;
    tagline: string;
    foundedYear: number;
    aboutHtml: string;
    missionHtml: string;
    visionHtml: string | null;
    coreValues: string[];
    advocAfricaBlurb: string | null;
    staffingStats: Record<string, { associates: number; paralegals: number }> | null;
    socialLinks: Record<string, string>;
    logoId: string | null;
    homeHeroImageId: string | null;
    aboutHeroImageId: string | null;
    careersHtml: string | null;
    privacyPolicyHtml: string | null;
    termsOfServiceHtml: string | null;
  };
};

function SettingsSection({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
      <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-purple-700">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SettingsForm({ action, offices, mediaItems, defaultValues }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const socialLinksText = Object.entries(defaultValues.socialLinks)
    .map(([platform, url]) => `${platform}: ${url}`)
    .join("\n");

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <SettingsSection icon={<CogIcon className="h-4 w-4" />} title="Firm identity">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Firm name" name="firmName" defaultValue={defaultValues.firmName} required />
          <NumberField
            label="Founded year"
            name="foundedYear"
            defaultValue={String(defaultValues.foundedYear)}
            required
          />
        </div>
        <TextField label="Tagline" name="tagline" defaultValue={defaultValues.tagline} required />
        <ImagePicker
          label="Logo (optional)"
          name="logoId"
          items={mediaItems}
          defaultValue={defaultValues.logoId}
        />
      </SettingsSection>

      <SettingsSection icon={<DocumentIcon className="h-4 w-4" />} title="About page content">
        <RichTextField label="About (HTML allowed)" name="aboutHtml" defaultValue={defaultValues.aboutHtml} />
        <RichTextField
          label="Mission (HTML allowed)"
          name="missionHtml"
          defaultValue={defaultValues.missionHtml}
        />
        <RichTextField
          label="Vision (HTML allowed, optional)"
          name="visionHtml"
          defaultValue={defaultValues.visionHtml ?? ""}
        />
        <TextAreaField
          label="Core values (one per line)"
          name="coreValues"
          defaultValue={defaultValues.coreValues.join("\n")}
          rows={4}
        />
        <TextAreaField
          label="Advoc Africa network blurb (optional)"
          name="advocAfricaBlurb"
          defaultValue={defaultValues.advocAfricaBlurb ?? ""}
          rows={3}
        />
        <ImagePicker
          label="Home page hero image (optional)"
          name="homeHeroImageId"
          items={mediaItems}
          defaultValue={defaultValues.homeHeroImageId}
        />
        <ImagePicker
          label="About page hero image (optional)"
          name="aboutHeroImageId"
          items={mediaItems}
          defaultValue={defaultValues.aboutHeroImageId}
        />
      </SettingsSection>

      {offices.length > 0 && (
        <SettingsSection icon={<PeopleIcon className="h-4 w-4" />} title="Staffing per office">
          {offices.map((office) => (
            <div key={office.slug} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <NumberField
                label={`${office.name} — Associates`}
                name={`staffing_${office.slug}_associates`}
                defaultValue={String(defaultValues.staffingStats?.[office.slug]?.associates ?? 0)}
              />
              <NumberField
                label={`${office.name} — Paralegals`}
                name={`staffing_${office.slug}_paralegals`}
                defaultValue={String(defaultValues.staffingStats?.[office.slug]?.paralegals ?? 0)}
              />
            </div>
          ))}
        </SettingsSection>
      )}

      <SettingsSection icon={<BookOpenIcon className="h-4 w-4" />} title="Other pages">
        <RichTextField
          label="Careers page content (HTML allowed, optional — leave blank to show the 'no open vacancies' message)"
          name="careersHtml"
          defaultValue={defaultValues.careersHtml ?? ""}
        />
        <RichTextField
          label="Privacy policy (HTML allowed, optional)"
          name="privacyPolicyHtml"
          defaultValue={defaultValues.privacyPolicyHtml ?? ""}
        />
        <RichTextField
          label="Terms of Service (HTML allowed, optional)"
          name="termsOfServiceHtml"
          defaultValue={defaultValues.termsOfServiceHtml ?? ""}
        />
      </SettingsSection>

      <SettingsSection icon={<ChatBubbleIcon className="h-4 w-4" />} title="Social links">
        <TextAreaField
          label="One per line, as: platform: url"
          name="socialLinks"
          defaultValue={socialLinksText}
          rows={3}
          help="Example: linkedin: https://linkedin.com/company/cootow-associates"
        />
      </SettingsSection>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="sticky bottom-0 rounded-2xl border border-border bg-white/90 p-4 backdrop-blur">
        <SubmitButton pending={pending} label="Save changes" />
      </div>
    </form>
  );
}
