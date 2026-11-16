# cootowlaw.com

The marketing site and content backoffice for Cootow & Associates Advocates, a Kenyan law
firm. Next.js 16 (App Router, Turbopack, Cache Components), Tailwind CSS v4, Drizzle ORM over
a MySQL/MariaDB database.

## Project structure

- `src/app/(public)/` — the public marketing site (own root layout, Fraunces + Plus Jakarta
  Sans fonts, the purple/gold/charcoal theme defined in `src/app/globals.css`).
- `src/app/admin/` — the content backoffice (own root layout, no public header/footer),
  gated by `src/proxy.ts` (iron-session cookie auth). Admin-uploaded images are stored in
  Vercel Blob (see `BLOB_READ_WRITE_TOKEN` in `.env.example`).
- `src/lib/db/` — Drizzle schema + migrations (MySQL dialect). `src/lib/data/*.ts` is the
  only layer allowed to query the database; pages and admin forms go through it.
- `scripts/` — one-off tooling: `seed.ts` (content + bootstrap admin), `seed-media.ts`,
  `generate-logo-assets.ts`.

## Local development

```bash
cp .env.example .env.local   # fill in the values — see comments in that file
npm install
npm run db:push              # create tables in your dev database
npm run seed                 # seed content + create the first admin login
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and
[http://localhost:3000/admin](http://localhost:3000/admin) for the backoffice.

## Deploying to Vercel

The database is MySQL/MariaDB hosted on a cPanel server, made reachable from Vercel's
serverless functions via cPanel's **Remote Database Access** (Access Host `%`, since Vercel's
default serverless functions don't have fixed outbound IPs).

1. **Connect a Blob store** to the Vercel project (Storage → Create Database → Blob) — this
   sets `BLOB_READ_WRITE_TOKEN` automatically.
2. **Set environment variables** on the Vercel project (see `.env.example` for the full list):
   `DATABASE_URL` (pointing at the public hostname, not `localhost`), `SESSION_PASSWORD`
   (≥32 random chars), and optionally the `SMTP_*` vars for contact-form email.
3. **Deploy** — Vercel builds and deploys on every push to the connected branch.
4. Once deployed, run `npm run db:push` and `npm run seed` once against the real database
   (from a machine that can reach it) to create tables and the first admin login.
5. `/admin` ships with `robots: noindex`; the public sitemap/robots files point at
   `https://www.cootowlaw.com` — update the `BASE_URL` constants in `src/app/sitemap.ts` and
   `src/app/robots.ts` if the production domain ever changes.

See `.env.example` for the full, authoritative list of environment variables the app reads.
