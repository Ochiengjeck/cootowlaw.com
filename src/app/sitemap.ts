import type { MetadataRoute } from "next";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { getAttorneys } from "@/lib/data/attorneys";
import { getOffices } from "@/lib/data/offices";
import { getCaseBriefs } from "@/lib/data/case-briefs";
import { getNewsPosts } from "@/lib/data/news";

const BASE_URL = "https://www.cootowlaw.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [practiceAreas, attorneys, offices, caseBriefs, newsPosts] = await Promise.all([
    getPracticeAreas(),
    getAttorneys(),
    getOffices(),
    getCaseBriefs(),
    getNewsPosts(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/practices",
    "/people",
    "/offices",
    "/clientele",
    "/cases",
    "/news",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date() }));

  return [
    ...staticRoutes,
    ...practiceAreas.map((pa) => ({ url: `${BASE_URL}/practices/${pa.slug}` })),
    ...attorneys.map((a) => ({ url: `${BASE_URL}/people/${a.slug}` })),
    ...offices.map((o) => ({ url: `${BASE_URL}/offices/${o.slug}` })),
    ...caseBriefs.map((cb) => ({ url: `${BASE_URL}/cases/${cb.slug}` })),
    ...newsPosts.map((p) => ({ url: `${BASE_URL}/news/${p.slug}` })),
  ];
}
