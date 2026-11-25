import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data/settings";
import { getAttorneys } from "@/lib/data/attorneys";
import { getOffices } from "@/lib/data/offices";
import { getCurrentYear } from "@/lib/current-year";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/logo";
import { IconBox } from "@/components/ui/icon-box";
import { CheckIcon, BuildingIcon, ScaleIcon, EyeIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "About the Firm" };

export default async function AboutPage() {
  const [settings, attorneys, offices, currentYear] = await Promise.all([
    getSiteSettings(),
    getAttorneys(),
    getOffices(),
    getCurrentYear(),
  ]);

  const staffingStats = settings?.staffingStats ?? null;
  const partnerCount = attorneys.filter((a) => a.tier === "partner").length;
  const foundedYear = settings?.foundedYear ?? 2006;
  const yearsInPractice = currentYear - foundedYear;

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="About the Firm"
            title={settings?.firmName ?? "Cootow & Associates Advocates"}
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-stretch">
          <Reveal delay={80} className="lg:col-span-3">
            <div
              className="rich-text text-[17px]"
              dangerouslySetInnerHTML={{ __html: settings?.aboutHtml ?? "" }}
            />
          </Reveal>
          <Reveal delay={140} className="lg:col-span-2">
            <div className="flex h-full min-h-[16rem] items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-purple-50 via-white to-gold-50">
              <Logo big className="scale-150" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="mt-16 border-y border-border bg-muted">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 sm:grid-cols-4">
          {[
            [String(foundedYear), "Founded"],
            [`${yearsInPractice}+`, "Years in practice"],
            [String(partnerCount), "Partners"],
            [String(offices.length), "Offices in Kenya"],
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

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading align="left" eyebrow="Our purpose" title="Mission &amp; Vision" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal
            delay={60}
            className={settings?.visionHtml ? undefined : "lg:col-span-2 lg:max-w-3xl"}
          >
            <div className="flex h-full flex-col rounded-3xl border border-border bg-white p-8">
              <IconBox>
                <ScaleIcon className="h-6 w-6" />
              </IconBox>
              <h3 className="font-serif text-xl font-semibold text-charcoal">Our Mission</h3>
              <div
                className="rich-text mt-3"
                dangerouslySetInnerHTML={{ __html: settings?.missionHtml ?? "" }}
              />
            </div>
          </Reveal>

          {settings?.visionHtml && (
            <Reveal delay={120}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-white p-8">
                <IconBox>
                  <EyeIcon className="h-6 w-6" />
                </IconBox>
                <h3 className="font-serif text-xl font-semibold text-charcoal">Our Vision</h3>
                <div
                  className="rich-text mt-3"
                  dangerouslySetInnerHTML={{ __html: settings.visionHtml }}
                />
              </div>
            </Reveal>
          )}
        </div>

        {settings && settings.coreValues.length > 0 && (
          <Reveal delay={160} className="mt-16">
            <SectionHeading align="left" eyebrow="What drives us" title="Core Values" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {settings.coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-white p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-charcoal">{value.title}</p>
                  {value.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-slate">
                      {value.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {offices.length > 0 && (
          <Reveal delay={200} className="mt-16">
            <SectionHeading align="left" eyebrow="Our people" title="Our Offices" />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {offices.map((office) => {
                const stats = staffingStats?.[office.slug];
                return (
                  <Link
                    key={office.id}
                    href={`/offices/${office.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
                  >
                    {office.heroImage ? (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={office.heroImage.url}
                          alt={office.heroImage.alt}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="flex items-start gap-4 p-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <BuildingIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-purple-700">
                          {office.name}
                        </h3>
                        {stats && (
                          <p className="mt-1 text-sm text-slate">
                            {stats.associates} Associates &middot; {stats.paralegals} Paralegals
                          </p>
                        )}
                        <span className="mt-3 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                          View office
                          <span className="ml-2 transition-transform group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        )}

        {settings?.advocAfricaBlurb && (
          <Reveal delay={240}>
            <div className="relative mt-16 overflow-hidden rounded-3xl bg-charcoal p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--purple-700)_55%,transparent),transparent_60%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
              />
              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/images/partners/advoc-logo.png"
                    alt="Advoc"
                    width={513}
                    height={288}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                    Global network
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-white">
                    Advoc Africa
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                    {settings.advocAfricaBlurb}
                  </p>
                  <a
                    href="https://www.advoc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-gold-600"
                  >
                    Visit advoc.com
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
