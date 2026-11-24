import { randomUUID } from "node:crypto";
import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  json,
  datetime,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/mysql-core";

function id() {
  return varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID());
}

function timestamps() {
  return {
    createdAt: datetime("created_at", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: datetime("updated_at", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date()),
  };
}

export const media = mysqlTable("media", {
  id: id(),
  url: varchar("url", { length: 1000 }).notNull(),
  alt: varchar("alt", { length: 500 }).notNull().default(""),
  width: int("width"),
  height: int("height"),
  blurDataUrl: text("blur_data_url"),
  uploadedAt: datetime("uploaded_at", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const offices = mysqlTable(
  "offices",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    addressLine1: varchar("address_line1", { length: 500 }).notNull(),
    addressLine2: varchar("address_line2", { length: 500 }),
    city: varchar("city", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    officeHours: varchar("office_hours", { length: 500 }),
    mapEmbedUrl: varchar("map_embed_url", { length: 1000 }),
    heroImageId: varchar("hero_image_id", { length: 36 }).references(() => media.id),
    sortOrder: int("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("offices_slug_idx").on(t.slug)],
);

export const practiceAreas = mysqlTable(
  "practice_areas",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    summary: varchar("summary", { length: 1000 }).notNull(),
    descriptionHtml: text("description_html").notNull(),
    servicesList: json("services_list").$type<string[]>().notNull(),
    heroImageId: varchar("hero_image_id", { length: 36 }).references(() => media.id),
    sortOrder: int("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("practice_areas_slug_idx").on(t.slug)],
);

export const attorneyTiers = ["partner", "associate", "staff"] as const;
export type AttorneyTier = (typeof attorneyTiers)[number];

export const attorneys = mysqlTable(
  "attorneys",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    tier: varchar("tier", { length: 20, enum: attorneyTiers }).notNull(),
    bioHtml: text("bio_html"),
    credentials: text("credentials"),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 255 }),
    photoId: varchar("photo_id", { length: 36 }).references(() => media.id),
    officeId: varchar("office_id", { length: 36 }).references(() => offices.id),
    sortOrder: int("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps(),
  },
  (t) => [uniqueIndex("attorneys_slug_idx").on(t.slug)],
);

export const attorneyPracticeAreas = mysqlTable(
  "attorney_practice_areas",
  {
    attorneyId: varchar("attorney_id", { length: 36 })
      .notNull()
      .references(() => attorneys.id, { onDelete: "cascade" }),
    practiceAreaId: varchar("practice_area_id", { length: 36 })
      .notNull()
      .references(() => practiceAreas.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.attorneyId, t.practiceAreaId] })],
);

export const clients = mysqlTable("clients", {
  id: id(),
  name: varchar("name", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 255 }).notNull(),
  logoId: varchar("logo_id", { length: 36 }).references(() => media.id),
  website: varchar("website", { length: 1000 }),
  sortOrder: int("sort_order").notNull().default(0),
  ...timestamps(),
});

export const caseBriefs = mysqlTable(
  "case_briefs",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    courtReference: varchar("court_reference", { length: 500 }).notNull(),
    summaryHtml: text("summary_html").notNull(),
    outcomeHtml: text("outcome_html").notNull(),
    practiceAreaId: varchar("practice_area_id", { length: 36 }).references(() => practiceAreas.id),
    clientId: varchar("client_id", { length: 36 }).references(() => clients.id),
    coverImageId: varchar("cover_image_id", { length: 36 }).references(() => media.id),
    year: int("year"),
    sortOrder: int("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("case_briefs_slug_idx").on(t.slug)],
);

export const newsPosts = mysqlTable(
  "news_posts",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    excerpt: varchar("excerpt", { length: 1000 }).notNull(),
    bodyHtml: text("body_html").notNull(),
    coverImageId: varchar("cover_image_id", { length: 36 }).references(() => media.id),
    authorId: varchar("author_id", { length: 36 }).references(() => attorneys.id),
    publishedAt: datetime("published_at", { mode: "date" }),
    ...timestamps(),
  },
  (t) => [uniqueIndex("news_posts_slug_idx").on(t.slug)],
);

export const digestPosts = mysqlTable(
  "digest_posts",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    excerpt: varchar("excerpt", { length: 1000 }).notNull(),
    bodyHtml: text("body_html").notNull(),
    coverImageId: varchar("cover_image_id", { length: 36 }).references(() => media.id),
    authorId: varchar("author_id", { length: 36 }).references(() => attorneys.id),
    publishedAt: datetime("published_at", { mode: "date" }),
    ...timestamps(),
  },
  (t) => [uniqueIndex("digest_posts_slug_idx").on(t.slug)],
);

export const digestSubscribers = mysqlTable(
  "digest_subscribers",
  {
    id: id(),
    email: varchar("email", { length: 255 }).notNull(),
    createdAt: datetime("created_at", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [uniqueIndex("digest_subscribers_email_idx").on(t.email)],
);

export const downloads = mysqlTable("downloads", {
  id: id(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 255 }).notNull(),
  fileUrl: varchar("file_url", { length: 1000 }).notNull(),
  fileFilename: varchar("file_filename", { length: 255 }).notNull(),
  publishedAt: datetime("published_at", { mode: "date" }),
  sortOrder: int("sort_order").notNull().default(0),
  ...timestamps(),
});

export const jobPostings = mysqlTable(
  "job_postings",
  {
    id: id(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    department: varchar("department", { length: 255 }),
    location: varchar("location", { length: 255 }).notNull(),
    employmentType: varchar("employment_type", { length: 100 }),
    summary: varchar("summary", { length: 500 }).notNull(),
    descriptionHtml: text("description_html").notNull(),
    isOpen: boolean("is_open").notNull().default(true),
    sortOrder: int("sort_order").notNull().default(0),
    ...timestamps(),
  },
  (t) => [uniqueIndex("job_postings_slug_idx").on(t.slug)],
);

export const jobApplications = mysqlTable("job_applications", {
  id: id(),
  jobPostingId: varchar("job_posting_id", { length: 36 }).references(() => jobPostings.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }),
  message: text("message"),
  resumeUrl: varchar("resume_url", { length: 1000 }),
  resumeFilename: varchar("resume_filename", { length: 255 }),
  createdAt: datetime("created_at", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  handledAt: datetime("handled_at", { mode: "date" }),
  replyMessage: text("reply_message"),
  repliedAt: datetime("replied_at", { mode: "date" }),
});

export const siteSettings = mysqlTable("site_settings", {
  id: id(),
  firmName: varchar("firm_name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 500 }).notNull(),
  foundedYear: int("founded_year").notNull(),
  aboutHtml: text("about_html").notNull(),
  missionHtml: text("mission_html").notNull(),
  coreValues: json("core_values").$type<string[]>().notNull(),
  advocAfricaBlurb: text("advoc_africa_blurb"),
  staffingStats: json("staffing_stats").$type<
    Record<string, { associates: number; paralegals: number }>
  >(),
  socialLinks: json("social_links").$type<Record<string, string>>().notNull(),
  logoId: varchar("logo_id", { length: 36 }).references(() => media.id),
  homeHeroImageId: varchar("home_hero_image_id", { length: 36 }).references(() => media.id),
  aboutHeroImageId: varchar("about_hero_image_id", { length: 36 }).references(() => media.id),
  privacyPolicyHtml: text("privacy_policy_html"),
  termsOfServiceHtml: text("terms_of_service_html"),
  careersHtml: text("careers_html"),
  ...timestamps(),
});

export const contactSubmissions = mysqlTable("contact_submissions", {
  id: id(),
  officeId: varchar("office_id", { length: 36 })
    .notNull()
    .references(() => offices.id),
  practiceAreaId: varchar("practice_area_id", { length: 36 }).references(() => practiceAreas.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }),
  message: text("message").notNull(),
  createdAt: datetime("created_at", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  handledAt: datetime("handled_at", { mode: "date" }),
  replyMessage: text("reply_message"),
  repliedAt: datetime("replied_at", { mode: "date" }),
});

export const adminRoles = ["owner", "editor"] as const;
export type AdminRole = (typeof adminRoles)[number];

export const adminUsers = mysqlTable(
  "admin_users",
  {
    id: id(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    role: varchar("role", { length: 20, enum: adminRoles }).notNull().default("editor"),
    ...timestamps(),
  },
  (t) => [uniqueIndex("admin_users_email_idx").on(t.email)],
);
