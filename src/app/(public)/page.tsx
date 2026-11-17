import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data/settings";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { getAttorneys } from "@/lib/data/attorneys";
import { getClients } from "@/lib/data/clients";
import { getCaseBriefs } from "@/lib/data/case-briefs";
import { getCurrentYear } from "@/lib/current-year";
import { Avatar } from "@/components/avatar";
import { PartnersCarousel } from "@/components/partners-carousel";
import { ButtonLink } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { getPracticeIcon } from "@/lib/practice-icons";

export default async function HomePage() {
  const [settings, practiceAreas, attorneys, clients, caseBriefs, currentYear] =
    await Promise.all([
      getSiteSettings(),
      getPracticeAreas(),
      getAttorneys(),
      getClients(),
      getCaseBriefs(),
      getCurrentYear(),
    ]);

  const allPartners = attorneys.filter((a) => a.tier === "partner");
  const avatarPartners = allPartners.slice(0, 4);
  const foundedYear = settings?.foundedYear ?? 2006;
  const yearsExperience = currentYear - foundedYear;
  const [featuredPractice, ...restPractices] = practiceAreas;

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate -mt-20 min-h-dvh overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#431d63]">
          <Image
            src="/images/hero/purple-gold-legal-skyline.png"
            alt="Scales of justice, a gavel, law books, and the Nairobi skyline framed beside the Kenyan and African Union flags, over a purple and gold backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[30%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-charcoal/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
        </div>

        <div className="mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
          <div className="max-w-xl">
            <div className="animate-hero-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Trusted Legal Excellence
            </div>
            <h1
              className="animate-hero-in mt-6 font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              {settings?.tagline ?? "Leading Legal Service Provider for all Times"}
            </h1>
            <p
              className="animate-hero-in mt-5 max-w-md text-base leading-relaxed text-white/75"
              style={{ animationDelay: "160ms" }}
            >
              A one-stop shop for legal services across Eastern Africa since {foundedYear} —
              committed to protecting your rights and achieving the best possible outcome.
            </p>
            <div
              className="animate-hero-in mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <ButtonLink href="/offices" variant="solid">
                Book a Consultation
              </ButtonLink>
            </div>

            {avatarPartners.length > 0 && (
              <div
                className="animate-hero-in mt-10 flex items-center gap-4"
                style={{ animationDelay: "320ms" }}
              >
                <div className="flex -space-x-3">
                  {avatarPartners.map((p) => (
                    <Avatar
                      key={p.id}
                      name={p.name}
                      photo={p.photo}
                      size={40}
                      className="ring-2 ring-ink"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/80">
                  <span className="font-semibold text-white">{caseBriefs.length}+</span> landmark
                  briefs resolved
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="border-b border-border bg-alabaster">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 sm:grid-cols-4">
          {[
            [String(foundedYear), "Founded"],
            [`${yearsExperience}+`, "Years in practice"],
            ["2", "Offices in Kenya"],
            ["100+", "Advoc Africa network firms"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-serif text-3xl font-semibold text-purple-600 lg:text-4xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-widest text-slate">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Team teaser */}
      {allPartners.length > 0 && (
        <section className="bg-muted py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Leadership
                </span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
                  Our Partners
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
                  Decades of combined experience leading some of the region&apos;s most
                  consequential matters.
                </p>
              </div>
              <Link
                href="/people"
                className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
              >
                Meet everyone &rarr;
              </Link>
            </div>
            <div className="mt-12">
              <PartnersCarousel partners={allPartners} />
            </div>
          </div>
        </section>
      )}

      {/* Practice areas */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Core Competencies
            </span>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
              Our Practice Areas
            </h2>
          </div>
          <Link
            href="/practices"
            className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPractice &&
            (() => {
              const FeaturedIcon = getPracticeIcon(featuredPractice.slug);
              return (
                <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                  <Link
                    href={`/practices/${featuredPractice.slug}`}
                    className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white transition-transform duration-300 hover:-translate-y-0.5 sm:p-10"
                  >
                    <Image
                      src="/images/hero/our-firm.webp"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                    <div className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-400 backdrop-blur-sm transition-colors group-hover:bg-gold-500 group-hover:text-charcoal sm:left-10 sm:top-10">
                      <FeaturedIcon className="h-6 w-6" />
                    </div>
                    <div className="relative">
                      <h3 className="font-serif text-2xl font-semibold">{featuredPractice.name}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                        {featuredPractice.summary}
                      </p>
                      <span className="mt-8 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 group-hover:text-white">
                        Learn more
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })()}
          {restPractices.map((pa, i) => {
            const PracticeIcon = getPracticeIcon(pa.slug);
            return (
              <Reveal key={pa.id} delay={i * 60}>
                <Link
                  href={`/practices/${pa.slug}`}
                  className="group block h-full rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
                >
                  <IconBox>
                    <PracticeIcon className="h-6 w-6" />
                  </IconBox>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">{pa.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{pa.summary}</p>
                  <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                    Learn more
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Clientele */}
      {clients.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
            Trusted by leading organisations
          </h2>
          <div className="group/logos relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]">
            <div className="animate-marquee flex w-max items-center gap-16 group-hover/logos:[animation-play-state:paused]">
              {[...clients, ...clients].map((c, i) =>
                c.logo ? (
                  <div
                    key={`${c.id}-${i}`}
                    className="relative h-10 w-28 shrink-0 grayscale transition duration-300 hover:grayscale-0"
                  >
                    <Image
                      src={c.logo.url}
                      alt={c.logo.alt}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span
                    key={`${c.id}-${i}`}
                    className="shrink-0 text-sm font-medium text-slate/50 transition-colors hover:text-purple-600"
                  >
                    {c.name}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            Need legal counsel you can rely on?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Reach our Nairobi or Mombasa office and speak with an advocate about your matter.
          </p>
          <ButtonLink href="/offices" variant="solid" className="mt-8">
            Contact an office
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
