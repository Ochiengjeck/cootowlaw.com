import Image from "next/image";
import Link from "next/link";
import { getOffices } from "@/lib/data/offices";
import { getSiteSettings } from "@/lib/data/settings";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { navGroups, navLinks } from "@/lib/nav-items";
import { getCurrentYear } from "@/lib/current-year";
import { parsePhoneLines } from "@/lib/phone";
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon } from "@/lib/icons";
import { Logo } from "./logo";
import { FooterSubscribeForm } from "./footer-subscribe-form";

const socialIconPaths: Record<string, string> = {
  facebook: "M13 10h3V7h-3c-1.66 0-3 1.34-3 3v2H8v3h2v6h3v-6h2.5l.5-3H13v-2c0-.28.22-.5.5-.5h0c.17 0 .33 0 .5 0Z",
  x: "M4 4l7.5 9.5L4.5 20H7l5.5-5.8L17 20h3l-7.8-9.9L19.5 4H17l-5 5.3L7.3 4H4Z",
  twitter: "M4 4l7.5 9.5L4.5 20H7l5.5-5.8L17 20h3l-7.8-9.9L19.5 4H17l-5 5.3L7.3 4H4Z",
  linkedin:
    "M6.94 8.5H4V20h2.94V8.5ZM5.47 7.1a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM20 13.3c0-3-1.6-4.4-3.76-4.4-1.73 0-2.5.95-2.93 1.62V8.5H10.4c.04.84 0 11.5 0 11.5h2.91v-6.42c0-.34.02-.69.13-.93.28-.69.92-1.41 2-1.41 1.4 0 1.97 1.07 1.97 2.63V20H20v-6.7Z",
  instagram:
    "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4.6.23 1.03.5 1.48.95.45.45.72.88.95 1.48.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43-.23.6-.5 1.03-.95 1.48-.45.45-.88.72-1.48.95-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4 4 0 0 1-1.48-.95 4 4 0 0 1-.95-1.48c-.16-.46-.35-1.26-.4-2.43-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43.23-.6.5-1.03.95-1.48a4 4 0 0 1 1.48-.95c.46-.16 1.26-.35 2.43-.4C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.33-.46.18-.78.39-1.13.74-.35.35-.56.67-.74 1.13-.13.35-.29.87-.33 1.83-.06 1.23-.07 1.59-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.33 1.83.18.46.39.78.74 1.13.35.35.67.56 1.13.74.35.13.87.29 1.83.33 1.23.06 1.59.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.33.46-.18.78-.39 1.13-.74.35-.35.56-.67.74-1.13.13-.35.29-.87.33-1.83.06-1.23.07-1.59.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.33-1.83a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.35-.13-.87-.29-1.83-.33-1.23-.06-1.59-.07-4.73-.07Zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86Zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26Zm5.13-2.03a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z",
  youtube:
    "M22 12s0-3.4-.43-5.03a2.78 2.78 0 0 0-1.95-1.96C17.98 4.58 12 4.58 12 4.58s-5.98 0-7.62.43A2.78 2.78 0 0 0 2.43 7c-.43 1.6-.43 5-.43 5s0 3.4.43 5.03c.24.9 1 1.6 1.95 1.85 1.64.43 7.62.43 7.62.43s5.98 0 7.62-.43a2.78 2.78 0 0 0 1.95-1.85C22 15.4 22 12 22 12Zm-12.2 3.2V8.8L15.6 12l-5.8 3.2Z",
  tiktok:
    "M14 3h2.6a4.6 4.6 0 0 0 3.8 3.9v2.6a7.2 7.2 0 0 1-3.8-1.1v6.3a5.6 5.6 0 1 1-5.6-5.6c.2 0 .4 0 .6.03v2.7a2.9 2.9 0 1 0 2.4 2.87V3Z",
};

function SocialIcon({ platform }: { platform: string }) {
  const d = socialIconPaths[platform.toLowerCase()];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d={d} />
    </svg>
  );
}

function FooterLinkList({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-white/60 transition-colors hover:text-gold-400"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function SiteFooter() {
  const [offices, settings, practiceAreas, year] = await Promise.all([
    getOffices(),
    getSiteSettings(),
    getPracticeAreas(),
    getCurrentYear(),
  ]);

  const socialEntries = Object.entries(settings?.socialLinks ?? {}).filter(([, url]) => url);
  const companyLinks = [
    ...(navGroups.find((g) => g.label === "About")?.items ?? []),
    ...navLinks.filter((item) => item.href === "/news"),
  ];
  const resourceLinks = [
    { href: "/cases", label: "Landmark Briefs" },
    { href: "/clientele", label: "Clientele" },
    { href: "/offices", label: "Offices" },
  ];
  const visiblePracticeAreas = practiceAreas.slice(0, 8);
  const hasMorePracticeAreas = practiceAreas.length > visiblePracticeAreas.length;

  return (
    <footer className="relative overflow-hidden bg-charcoal text-white/60">
      <Image
        src="/images/footer/world-map-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right-top opacity-80 brightness-150 saturate-150"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,color-mix(in_srgb,var(--gold-500)_60%,transparent)_35%,color-mix(in_srgb,var(--purple-500)_55%,transparent)_65%,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-2 sm:col-span-6 lg:col-span-4">
            <Logo dark big />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {settings?.tagline ?? "Leading Legal Service Provider for all Times"}
            </p>

            {socialEntries.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                {socialEntries.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${platform} page`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-gold-500 hover:text-charcoal"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <FooterLinkList title="Company" items={companyLinks} />
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Practice Areas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {visiblePracticeAreas.map((pa) => (
                <li key={pa.id}>
                  <Link
                    href={`/practices/${pa.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-gold-400"
                  >
                    {pa.name}
                  </Link>
                </li>
              ))}
              {hasMorePracticeAreas && (
                <li>
                  <Link
                    href="/practices"
                    className="text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
                  >
                    View all &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <FooterLinkList title="Resources" items={resourceLinks} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-md">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Legal Digest
            </span>
            <h3 className="mt-2 font-serif text-xl font-semibold text-white sm:text-2xl">
              Stay ahead of legal developments
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Periodic roundups of legal and regulatory updates, straight to your inbox.
            </p>
          </div>
          <FooterSubscribeForm />
        </div>

        {offices.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Our Offices
            </h3>
            <div className="mt-6 grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {offices.map((office, i) => (
                <div
                  key={office.id}
                  className={`pt-6 first:pt-0 sm:pt-0 ${i === 0 ? "sm:pr-10" : "sm:pl-10"}`}
                >
                  {office.heroImage && (
                    <div className="relative mb-4 h-28 w-full overflow-hidden rounded-lg">
                      <Image
                        src={office.heroImage.url}
                        alt={office.heroImage.alt}
                        fill
                        sizes="(min-width: 640px) 360px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="font-serif text-base font-semibold text-white">{office.name}</p>
                  <div className="mt-4 space-y-3 text-sm text-white/60">
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                      <div className="space-y-0.5">
                        <p>{office.addressLine1}</p>
                        {office.addressLine2 && <p>{office.addressLine2}</p>}
                        <p>{office.city}, Kenya</p>
                      </div>
                    </div>
                    {office.officeHours && (
                      <div className="flex items-center gap-3">
                        <ClockIcon className="h-4 w-4 shrink-0 text-gold-400" />
                        <p>{office.officeHours}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <MailIcon className="h-4 w-4 shrink-0 text-gold-400" />
                      <a href={`mailto:${office.email}`} className="hover:text-gold-400">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                      <div className="space-y-0.5">
                        {parsePhoneLines(office.phone).map((line, j) => (
                          <p key={j} className="break-words">
                            {line.map((num, k) => (
                              <span key={num.href + k}>
                                {k > 0 && <span className="text-white/30"> / </span>}
                                <a href={num.href} className="hover:text-gold-400">
                                  {num.display}
                                </a>
                              </span>
                            ))}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {settings?.advocAfricaBlurb && (
          <div className="mt-10 flex flex-col items-start gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-2">
              <Image
                src="/images/partners/advoc-logo.png"
                alt="Advoc"
                width={513}
                height={288}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                Advoc Africa
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/60">{settings.advocAfricaBlurb}</p>
              <a
                href="https://www.advoc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 hover:text-white"
              >
                Visit advoc.com &rarr;
              </a>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p>
              &copy; {year} {settings?.firmName ?? "Cootow & Associates Advocates"}. All rights
              reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gold-400">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-gold-400">
              Terms of Service
            </Link>
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-gold-400">
              Back to top
              <span aria-hidden="true">&uarr;</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
