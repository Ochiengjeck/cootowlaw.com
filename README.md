# cootowlaw.com

The marketing site and content backoffice for Cootow & Associates Advocates, a Kenyan law
firm. Next.js 16 (App Router, Turbopack, Cache Components), Tailwind CSS v4, Drizzle ORM over
a MySQL/MariaDB database.

## Project structure

- `src/app/(public)/` — the public marketing site (own root layout, Fraunces + Plus Jakarta
  Sans fonts, the purple/gold/charcoal theme defined in `src/app/globals.css`).
- `src/app/admin/` — the content backoffice (own root layout, no public header/footer),
  gated by `src/proxy.ts` (iron-session cookie auth). Admin-uploaded images are written to
  disk (see `MEDIA_UPLOAD_DIR` in `.env.example`), not an external storage service.
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

## Deploying to cPanel

This targets cPanel hosts with **Git Version Control** + **Setup Node.js App** (both driven
entirely through the cPanel UI — no SSH needed). `next.config.ts` builds with
`output: "standalone"`, which bundles the app into a self-contained `.next/standalone/server.js`
plus a minimal `node_modules`, matching what cPanel's Node.js Selector expects (one startup
file).

1. **Create the database.** Use cPanel's MySQL Databases tool to create a database and a user
   with full privileges on it. Build `DATABASE_URL` as:
   ```
   mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME
   ```
2. **Create the Node.js App** (Setup Node.js App → Create Application): pick the highest
   available Node version, set the Application root to the Git-deployed folder, and note the
   virtual-environment activation command cPanel shows you — it's needed in `.cpanel.yml`.
3. **Set environment variables** on that Node.js App (see `.env.example` for the full list):
   `DATABASE_URL`, `SESSION_PASSWORD` (≥32 random chars), `MEDIA_UPLOAD_DIR` (absolute path —
   see the comment in `.env.example`), and optionally the `SMTP_*` vars for contact-form email.
4. **Push/deploy via Git Version Control**: `.cpanel.yml` at the repo root drives the deploy
   (`npm install`, `npm run build`, copying `public/` and `.next/static/` into the standalone
   output) — cPanel's "Deploy HEAD Commit" button runs it, no terminal needed.
5. Once deployed, run `npm run db:push` and `npm run seed` once against the real database
   (temporarily, from wherever you can reach it) to create tables and the first admin login.
6. `/admin` ships with `robots: noindex`; the public sitemap/robots files point at
   `https://www.cootowlaw.com` — update the `BASE_URL` constants in `src/app/sitemap.ts` and
   `src/app/robots.ts` if the production domain ever changes.

See `.env.example` for the full, authoritative list of environment variables the app reads.
