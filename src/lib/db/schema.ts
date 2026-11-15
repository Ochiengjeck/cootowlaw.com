import { randomUUID } from "node:crypto";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";

function id() {
  return text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID());
}

function timestamps() {
  return {
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  };
}

export const media = sqliteTable("media", {
  id: id(),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  width: integer("width"),
  height: integer("height"),
  blurDataUrl: text("blur_data_url"),
  uploadedAt: integer("uploaded_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const offices = sqliteTable(
  "offices",
  {
    id: id(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    city: text("city").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    officeHours: text("office_hours"),
    mapEmbedUrl: text("map_embed_url"),
    heroImageId: text("hero_image_id").references(() => media.id),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("offices_slug_idx").on(t.slug)],
);

export const practiceAreas = sqliteTable(
  "practice_areas",
  {
    id: id(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    summary: text("summary").notNull(),
    descriptionHtml: text("description_html").notNull(),
    servicesList: text("services_list", { mode: "json" })
      .$type<string[]>()
      .notNull()
      .default([]),
    heroImageId: text("hero_image_id").references(() => media.id),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("practice_areas_slug_idx").on(t.slug)],
);

export const attorneyTiers = ["partner", "associate", "staff"] as const;
export type AttorneyTier = (typeof attorneyTiers)[number];

export const attorneys = sqliteTable(
  "attorneys",
  {
    id: id(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    title: text("title").notNull(),
    tier: text("tier", { enum: attorneyTiers }).notNull(),
    bioHtml: text("bio_html"),
    credentials: text("credentials"),
    email: text("email"),
    phone: text("phone"),
    photoId: text("photo_id").references(() => media.id),
    officeId: text("office_id").references(() => offices.id),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    ...timestamps(),
  },
  (t) => [uniqueIndex("attorneys_slug_idx").on(t.slug)],
);

export const attorneyPracticeAreas = sqliteTable(
  "attorney_practice_areas",
  {
    attorneyId: text("attorney_id")
      .notNull()
      .references(() => attorneys.id, { onDelete: "cascade" }),
    practiceAreaId: text("practice_area_id")
      .notNull()
      .references(() => practiceAreas.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.attorneyId, t.practiceAreaId] })],
);

export const clients = sqliteTable("clients", {
  id: id(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  logoId: text("logo_id").references(() => media.id),
  website: text("website"),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps(),
});

export const caseBriefs = sqliteTable(
  "case_briefs",
  {
    id: id(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    courtReference: text("court_reference").notNull(),
    summaryHtml: text("summary_html").notNull(),
    outcomeHtml: text("outcome_html").notNull(),
    practiceAreaId: text("practice_area_id").references(() => practiceAreas.id),
    clientId: text("client_id").references(() => clients.id),
    year: integer("year"),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("case_briefs_slug_idx").on(t.slug)],
);

export const newsPosts = sqliteTable(
  "news_posts",
  {
    id: id(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    bodyHtml: text("body_html").notNull(),
    coverImageId: text("cover_image_id").references(() => media.id),
    authorId: text("author_id").references(() => attorneys.id),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    ...timestamps(),
  },
  (t) => [uniqueIndex("news_posts_slug_idx").on(t.slug)],
);

export const siteSettings = sqliteTable("site_settings", {
  id: id(),
  firmName: text("firm_name").notNull(),
  tagline: text("tagline").notNull(),
  foundedYear: integer("founded_year").notNull(),
  aboutHtml: text("about_html").notNull(),
  missionHtml: text("mission_html").notNull(),
  coreValues: text("core_values", { mode: "json" }).$type<string[]>().notNull().default([]),
  advocAfricaBlurb: text("advoc_africa_blurb"),
  staffingStats: text("staffing_stats", { mode: "json" }).$type<
    Record<string, { associates: number; paralegals: number }>
  >(),
  socialLinks: text("social_links", { mode: "json" })
    .$type<Record<string, string>>()
    .notNull()
    .default({}),
  logoId: text("logo_id").references(() => media.id),
  homeHeroImageId: text("home_hero_image_id").references(() => media.id),
  aboutHeroImageId: text("about_hero_image_id").references(() => media.id),
  privacyPolicyHtml: text("privacy_policy_html"),
  careersHtml: text("careers_html"),
  ...timestamps(),
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: id(),
  officeId: text("office_id")
    .notNull()
    .references(() => offices.id),
  practiceAreaId: text("practice_area_id").references(() => practiceAreas.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  handledAt: integer("handled_at", { mode: "timestamp_ms" }),
});

export const adminRoles = ["owner", "editor"] as const;
export type AdminRole = (typeof adminRoles)[number];

export const adminUsers = sqliteTable(
  "admin_users",
  {
    id: id(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    name: text("name").notNull(),
    role: text("role", { enum: adminRoles }).notNull().default("editor"),
    ...timestamps(),
  },
  (t) => [uniqueIndex("admin_users_email_idx").on(t.email)],
);
