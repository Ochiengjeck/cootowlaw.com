"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { updateSiteSettings, type SettingsInput } from "@/lib/data/settings";
import { adminListOffices } from "@/lib/data/offices";

export type SettingsFormState = { error?: string } | undefined;

function parseForm(formData: FormData, officeSlugs: string[]): SettingsInput | { error: string } {
  const firmName = String(formData.get("firmName") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const foundedYear = Number(formData.get("foundedYear") ?? 0);
  const aboutHtml = String(formData.get("aboutHtml") ?? "").trim();
  const missionHtml = String(formData.get("missionHtml") ?? "").trim();
  const coreValues = String(formData.get("coreValues") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const advocAfricaBlurb = String(formData.get("advocAfricaBlurb") ?? "").trim() || null;
  const careersHtml = String(formData.get("careersHtml") ?? "").trim() || null;
  const privacyPolicyHtml = String(formData.get("privacyPolicyHtml") ?? "").trim() || null;
  const logoId = String(formData.get("logoId") ?? "").trim() || null;
  const homeHeroImageId = String(formData.get("homeHeroImageId") ?? "").trim() || null;
  const aboutHeroImageId = String(formData.get("aboutHeroImageId") ?? "").trim() || null;

  const socialLinks: Record<string, string> = {};
  for (const line of String(formData.get("socialLinks") ?? "").split("\n")) {
    const [platform, ...rest] = line.split(":");
    const url = rest.join(":").trim();
    if (platform?.trim() && url) {
      socialLinks[platform.trim().toLowerCase()] = url;
    }
  }

  const staffingStats: Record<string, { associates: number; paralegals: number }> = {};
  for (const slug of officeSlugs) {
    const associates = Number(formData.get(`staffing_${slug}_associates`) ?? 0);
    const paralegals = Number(formData.get(`staffing_${slug}_paralegals`) ?? 0);
    if (associates > 0 || paralegals > 0) {
      staffingStats[slug] = { associates, paralegals };
    }
  }

  if (!firmName || !tagline || !foundedYear || !aboutHtml || !missionHtml) {
    return {
      error: "Firm name, tagline, founded year, about, and mission are required.",
    };
  }

  return {
    firmName,
    tagline,
    foundedYear,
    aboutHtml,
    missionHtml,
    coreValues,
    advocAfricaBlurb,
    staffingStats: Object.keys(staffingStats).length > 0 ? staffingStats : null,
    socialLinks,
    logoId,
    homeHeroImageId,
    aboutHeroImageId,
    careersHtml,
    privacyPolicyHtml,
  };
}

export async function updateSettingsAction(
  id: string,
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await getCurrentAdmin();
  const offices = await adminListOffices();
  const parsed = parseForm(
    formData,
    offices.map((o) => o.slug),
  );
  if ("error" in parsed) return parsed;

  await updateSiteSettings(id, parsed);
  updateTag("site-settings");
  redirect("/admin/settings");
}
