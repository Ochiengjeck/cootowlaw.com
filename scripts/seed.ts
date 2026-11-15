// Initial content seed for the Cootow & Associates Advocates rebuild.
// Intended for bootstrapping: re-running resets offices/practice areas/attorneys/
// clients/case briefs/news/settings to this seed data. The bootstrap admin user is
// upserted by email instead, so re-running never locks you out or duplicates it.
//
// Run via `npm run seed`, which passes --env-file=.env.local to tsx so DATABASE_URL
// etc. are set before any module (notably src/lib/db) is loaded.
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../src/lib/db";
import {
  offices,
  practiceAreas,
  attorneys,
  attorneyPracticeAreas,
  clients,
  caseBriefs,
  newsPosts,
  siteSettings,
  adminUsers,
} from "../src/lib/db/schema";
import { officesSeed } from "./seed-data/offices";
import { practiceAreasSeed } from "./seed-data/practiceAreas";
import { attorneysSeed } from "./seed-data/attorneys";
import { clientsSeed } from "./seed-data/clients";
import { caseBriefsSeed } from "./seed-data/caseBriefs";
import { newsPostsSeed } from "./seed-data/newsPosts";
import { settingsSeed } from "./seed-data/settings";

async function main() {
  console.log("Seeding database…");

  // Clear in FK-safe order (children before parents). admin_users is untouched.
  await db.delete(newsPosts);
  await db.delete(caseBriefs);
  await db.delete(attorneyPracticeAreas);
  await db.delete(attorneys);
  await db.delete(clients);
  await db.delete(practiceAreas);
  await db.delete(offices);
  await db.delete(siteSettings);

  const officeBySlug = new Map<string, string>();
  for (const office of officesSeed) {
    const id = randomUUID();
    await db.insert(offices).values({ id, ...office });
    officeBySlug.set(office.slug, id);
  }
  console.log(`  offices: ${officesSeed.length}`);

  const practiceAreaBySlug = new Map<string, string>();
  for (const pa of practiceAreasSeed) {
    const id = randomUUID();
    await db.insert(practiceAreas).values({ id, ...pa });
    practiceAreaBySlug.set(pa.slug, id);
  }
  console.log(`  practice areas: ${practiceAreasSeed.length}`);

  const attorneyBySlug = new Map<string, string>();
  for (const a of attorneysSeed) {
    const id = randomUUID();
    await db.insert(attorneys).values({
      id,
      slug: a.slug,
      name: a.name,
      title: a.title,
      tier: a.tier,
      bioHtml: a.bioHtml,
      credentials: a.credentials,
      officeId: a.officeSlug ? officeBySlug.get(a.officeSlug) ?? null : null,
      sortOrder: a.sortOrder,
    });
    attorneyBySlug.set(a.slug, id);

    for (const paSlug of a.practiceAreaSlugs) {
      const practiceAreaId = practiceAreaBySlug.get(paSlug);
      if (!practiceAreaId) continue;
      await db.insert(attorneyPracticeAreas).values({ attorneyId: id, practiceAreaId });
    }
  }
  console.log(`  attorneys: ${attorneysSeed.length}`);

  const clientByName = new Map<string, string>();
  for (const c of clientsSeed) {
    const id = randomUUID();
    await db.insert(clients).values({ id, ...c });
    clientByName.set(c.name, id);
  }
  console.log(`  clients: ${clientsSeed.length}`);

  for (const c of caseBriefsSeed) {
    await db.insert(caseBriefs).values({
      slug: c.slug,
      title: c.title,
      courtReference: c.courtReference,
      summaryHtml: c.summaryHtml,
      outcomeHtml: c.outcomeHtml,
      practiceAreaId: practiceAreaBySlug.get(c.practiceAreaSlug) ?? null,
      year: c.year,
      sortOrder: c.sortOrder,
    });
  }
  console.log(`  case briefs: ${caseBriefsSeed.length}`);

  for (const n of newsPostsSeed) {
    await db.insert(newsPosts).values(n);
  }
  console.log(`  news posts: ${newsPostsSeed.length}`);

  await db.insert(siteSettings).values(settingsSeed);
  console.log("  site settings: 1");

  const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (adminEmail && adminPassword) {
    const existing = await db
      .select({ id: adminUsers.id })
      .from(adminUsers)
      .where(eq(adminUsers.email, adminEmail.toLowerCase()))
      .limit(1);

    if (existing.length === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await db.insert(adminUsers).values({
        email: adminEmail.toLowerCase(),
        passwordHash,
        name: "Site Administrator",
        role: "owner",
      });
      console.log(`  admin user created: ${adminEmail}`);
    } else {
      console.log(`  admin user already exists: ${adminEmail}`);
    }
  } else {
    console.warn("  ADMIN_BOOTSTRAP_EMAIL/PASSWORD not set — skipping admin user creation.");
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
