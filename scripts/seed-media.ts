// Links the asset files copied into public/images/ (from the WordPress backup) to
// their DB records. Run after `npm run seed`. Idempotent: clears and re-inserts the
// `media` rows it owns (identified by url prefix "/images/") each time, then re-wires
// the FKs — safe to re-run after copying new files.
import { randomUUID } from "node:crypto";
import { eq, like } from "drizzle-orm";
import { db } from "../src/lib/db";
import { media, attorneys, clients, offices, practiceAreas, newsPosts, siteSettings } from "../src/lib/db/schema";

async function insertMedia(url: string, alt: string) {
  const id = randomUUID();
  await db.insert(media).values({ id, url, alt });
  return id;
}

async function main() {
  console.log("Seeding media…");
  await db.delete(media).where(like(media.url, "/images/%"));

  // Logo (stored for reference only — the live site uses a new design-system mark,
  // not this raster original, per the "full redesign" decision).
  const oldLogoId = await insertMedia(
    "/images/logo/logo.png",
    "Cootow & Associates Advocates — original logo (archival, not used live)",
  );
  const oldLogoSquareId = await insertMedia(
    "/images/logo/logo-square.png",
    "Cootow & Associates Advocates — original logo mark, square crop (archival)",
  );

  // Hero images
  const homeHeroId = await insertMedia("/images/hero/home-hero.webp", "Cootow & Associates Advocates office");
  // Note: the old "about-banner.webp" staff group photo is intentionally not wired to
  // anything anymore — the client asked for it to be removed from both the People and
  // About pages in favour of the firm logo / category navigation.
  // "our-firm.webp" (group partners photo) is kept here archival-only too, for the
  // same reason — it's no longer referenced by the homepage or practices page, which
  // now use "/images/hero/purple-gold-legal-skyline.png" instead (client request,
  // Nov 2026: replace the partners photo with an industry/firm-branded image).
  await insertMedia("/images/hero/our-firm.webp", "Cootow & Associates Advocates — our firm (archival)");

  await db.update(siteSettings).set({ homeHeroImageId: homeHeroId, updatedAt: new Date() });
  console.log("  site_settings hero image wired");

  // Office photos
  const officePhotos: Record<string, string> = {
    nairobi: "/images/offices/nairobi.jpg",
    mombasa: "/images/offices/mombasa.jpg",
  };
  let officeCount = 0;
  for (const [slug, url] of Object.entries(officePhotos)) {
    const heroImageId = await insertMedia(url, `${slug[0].toUpperCase()}${slug.slice(1)} skyline`);
    const result = await db
      .update(offices)
      .set({ heroImageId, updatedAt: new Date() })
      .where(eq(offices.slug, slug));
    if (result[0].affectedRows > 0) officeCount++;
  }
  console.log(`  office photos wired: ${officeCount}/${Object.keys(officePhotos).length}`);

  // Practice area photos (stock photography, one per practice area).
  // Litigation/Arbitration and Corporate/Asset-tracing reuse the two
  // identity-free, firm-branded images below instead of their original stock
  // photos — those showed identifiable people and were swapped out for
  // copyright reasons (client request, Nov 2026).
  const practiceAreaPhotos: Record<string, string> = {
    "conveyancing-real-estate": "/images/practices/conveyancing-real-estate.jpg",
    litigation: "/images/hero/justice-statue.jpg",
    "asset-tracing-recoveries": "/images/hero/purple-gold-legal-skyline.png",
    "banking-finance": "/images/practices/banking-finance.jpg",
    arbitration: "/images/hero/justice-statue.jpg",
    "intellectual-property-law": "/images/practices/intellectual-property-law.jpg",
    "corporate-commercial-law": "/images/hero/purple-gold-legal-skyline.png",
  };
  let practiceCount = 0;
  for (const [slug, url] of Object.entries(practiceAreaPhotos)) {
    const heroImageId = await insertMedia(url, "");
    const result = await db
      .update(practiceAreas)
      .set({ heroImageId, updatedAt: new Date() })
      .where(eq(practiceAreas.slug, slug));
    if (result[0].affectedRows > 0) practiceCount++;
  }
  const practiceNames = await db
    .select({ id: practiceAreas.id, name: practiceAreas.name, heroImageId: practiceAreas.heroImageId })
    .from(practiceAreas);
  for (const pa of practiceNames) {
    if (pa.heroImageId) {
      await db.update(media).set({ alt: pa.name }).where(eq(media.id, pa.heroImageId));
    }
  }
  console.log(`  practice area photos wired: ${practiceCount}/${Object.keys(practiceAreaPhotos).length}`);

  // Client logos
  const clientLogos: Record<string, string> = {
    "KCB Bank Kenya Limited": "/images/clients/kcb.jpg",
    "UBA Limited": "/images/clients/uba.jpg",
    "Parliamentary Service Commission": "/images/clients/parliament-of-kenya.png",
    "Independent Electoral and Boundaries Commission (IEBC)": "/images/clients/iebc.jpg",
    "APA Insurance Ltd": "/images/clients/apa.png",
    "Bamburi Cement Ltd": "/images/clients/bamburi.jpg",
    "Kenfreight (E.A) Ltd": "/images/clients/Kenfreight.png",
    "Voyager Beach Resort": "/images/clients/voyager.jpg",
  };
  for (const [name, url] of Object.entries(clientLogos)) {
    const logoId = await insertMedia(url, `${name} logo`);
    await db.update(clients).set({ logoId, updatedAt: new Date() }).where(eq(clients.name, name));
  }
  console.log(`  client logos wired: ${Object.keys(clientLogos).length}`);

  // News post cover images
  const newsCoverImages: Record<string, string> = {
    "re-introduce-estate-duty-to-fund-the-big-four": "/images/news/estate-duty-gavel.jpg",
  };
  let newsCount = 0;
  for (const [slug, url] of Object.entries(newsCoverImages)) {
    const coverImageId = await insertMedia(url, "");
    const result = await db
      .update(newsPosts)
      .set({ coverImageId, updatedAt: new Date() })
      .where(eq(newsPosts.slug, slug));
    if (result[0].affectedRows > 0) newsCount++;
  }
  console.log(`  news cover images wired: ${newsCount}/${Object.keys(newsCoverImages).length}`);

  // Attorney headshots (only confidently name-matched files — see conversation notes;
  // only Hellen Akoth Omollo has no verified photo and keeps the initials-avatar fallback)
  const attorneyPhotos: Record<string, string> = {
    "patrick-ochwa": "/images/team/patrick-ochwa.webp",
    "samuel-ouma": "/images/team/samuel-ouma.webp",
    "job-weloba": "/images/team/job-weloba.webp",
    "augustus-wafula": "/images/team/augustus-wafula.webp",
    "eva-wangui-kahiti": "/images/team/eva-wangui-kahiti.webp",
    "faith-sulwe": "/images/team/faith-sulwe.webp",
    "lenin-awino": "/images/team/lenin-awino.webp",
    "elsie-oile": "/images/team/elsie-oile.jpeg",
    "clara-atsanga": "/images/team/clara-atsanga.jpg",
    "valerie-mboya": "/images/team/valerie-mboya.jpg",
    "lucky-kaingu-kangwangu": "/images/team/lucky-kaingu-kangwangu.webp",
    "john-mwanzia-mutambuki": "/images/team/john-mwanzia-mutambuki.webp",
    "beatrice-kariuki-ruguru": "/images/team/beatrice-kariuki-ruguru.webp",
    "emily-shitoko": "/images/team/emily-shitoko.webp",
    "alfred-soita": "/images/team/alfred-soita.webp",
    "nicholas-baraza": "/images/team/nicholas-baraza.webp",
    "sally-chepkemboi": "/images/team/sally-chepkemboi.webp",
    "evana-adema-ambeni-mukonjero": "/images/team/evana-adema-ambeni-mukonjero.webp",
    "irene-nakiete-kihara": "/images/team/irene-nakiete-kihara.webp",
    "maurice-ochieng-odongo": "/images/team/maurice-ochieng-odongo.webp",
    "nelson-mwachambi-nyiro": "/images/team/nelson-mwachambi-nyiro.webp",
    "roselyne-alwar": "/images/team/roselyne-alwar.webp",
    "ruth-ndunge-matheka": "/images/team/ruth-ndunge-matheka.webp",
    "sylvia-rebecca-gombe-ndeleko": "/images/team/sylvia-rebecca-gombe-ndeleko.webp",
    "yvonne-omollo": "/images/team/yvonne-omollo.jpg",
  };
  let count = 0;
  for (const [slug, url] of Object.entries(attorneyPhotos)) {
    const photoId = await insertMedia(url, "");
    const result = await db
      .update(attorneys)
      .set({ photoId, updatedAt: new Date() })
      .where(eq(attorneys.slug, slug));
    if (result[0].affectedRows > 0) count++;
  }
  console.log(`  attorney photos wired: ${count}/${Object.keys(attorneyPhotos).length}`);

  // Fill in the photo alt text now that we know each attorney's name
  const withPhotos = await db
    .select({ id: attorneys.id, name: attorneys.name, photoId: attorneys.photoId })
    .from(attorneys);
  for (const a of withPhotos) {
    if (a.photoId) {
      await db.update(media).set({ alt: `${a.name} portrait` }).where(eq(media.id, a.photoId));
    }
  }

  console.log("Media seed complete.");
  console.log(`(Archival-only: ${oldLogoId ? 1 : 0} + ${oldLogoSquareId ? 1 : 0} original logo files stored but not wired to any active page.)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
