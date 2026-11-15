// Links the asset files copied into public/images/ (from the WordPress backup) to
// their DB records. Run after `npm run seed`. Idempotent: clears and re-inserts the
// `media` rows it owns (identified by url prefix "/images/") each time, then re-wires
// the FKs — safe to re-run after copying new files.
import { randomUUID } from "node:crypto";
import { eq, like } from "drizzle-orm";
import { db } from "../src/lib/db";
import { media, attorneys, clients, siteSettings } from "../src/lib/db/schema";

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
  const aboutHeroId = await insertMedia("/images/hero/about-banner.webp", "Cootow & Associates Advocates team");
  await insertMedia("/images/hero/our-firm.webp", "Cootow & Associates Advocates — our firm");

  await db
    .update(siteSettings)
    .set({ homeHeroImageId: homeHeroId, aboutHeroImageId: aboutHeroId, updatedAt: new Date() });
  console.log("  site_settings hero images wired");

  // Client logos (only confidently-identified real matches — see conversation notes;
  // the other 6 clients have no verified logo asset and stay text-only)
  const clientLogos: Record<string, string> = {
    "KCB Bank Kenya Limited": "/images/clients/kcb.jpg",
    "APA Insurance Ltd": "/images/clients/apa.png",
  };
  for (const [name, url] of Object.entries(clientLogos)) {
    const logoId = await insertMedia(url, `${name} logo`);
    await db.update(clients).set({ logoId, updatedAt: new Date() }).where(eq(clients.name, name));
  }
  console.log(`  client logos wired: ${Object.keys(clientLogos).length}`);

  // Attorney headshots (only confidently name-matched files — see conversation notes;
  // 8 of 26 people have no verified photo and keep the initials-avatar fallback)
  const attorneyPhotos: Record<string, string> = {
    "patrick-ochwa": "/images/team/patrick-ochwa.webp",
    "samuel-ouma": "/images/team/samuel-ouma.webp",
    "job-weloba": "/images/team/job-weloba.webp",
    "augustus-wafula": "/images/team/augustus-wafula.webp",
    "eva-wangui-kahiti": "/images/team/eva-wangui-kahiti.webp",
    "lenin-awino": "/images/team/lenin-awino.webp",
    "elsie-oile": "/images/team/elsie-oile.jpeg",
    "lucky-kaingu-kangwangu": "/images/team/lucky-kaingu-kangwangu.webp",
    "john-mwanzia-mutambuki": "/images/team/john-mwanzia-mutambuki.webp",
    "emily-shitoko": "/images/team/emily-shitoko.webp",
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
