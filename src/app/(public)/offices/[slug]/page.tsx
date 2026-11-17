import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOfficeBySlug, getOffices } from "@/lib/data/offices";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { parsePhoneLines } from "@/lib/phone";
import { Reveal } from "@/components/ui/reveal";
import { HeroBanner } from "@/components/ui/hero-banner";
import { MapPinIcon, PhoneIcon } from "@/lib/icons";
import { ContactForm } from "../contact-form";

export async function generateStaticParams() {
  const offices = await getOffices();
  return offices.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const office = await getOfficeBySlug(slug);
  return { title: office?.name ?? "Our Offices" };
}

export default async function OfficePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [office, practiceAreas] = await Promise.all([getOfficeBySlug(slug), getPracticeAreas()]);
  if (!office) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/offices"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All Offices
        </Link>
      </Reveal>

      {office.heroImage && (
        <HeroBanner
          src={office.heroImage.url}
          alt={office.heroImage.alt || office.name}
          sizes="(min-width: 1024px) 1024px, 100vw"
          heightClassName="h-48 sm:h-64"
          roundedClassName="rounded-2xl"
        />
      )}

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal delay={80}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Confidential Inquiry
            </span>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              {office.name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6 text-sm text-charcoal">
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate">
                  Chambers
                </span>
                <p className="mt-1 flex items-start gap-2 font-medium">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span>
                    {office.addressLine1}
                    {office.addressLine2 ? `, ${office.addressLine2}` : ""}, {office.city}, Kenya
                  </span>
                </p>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate">
                  Direct Telephone
                </span>
                <div className="mt-1 flex items-start gap-2 font-medium">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <div className="space-y-0.5">
                    {parsePhoneLines(office.phone).map((line, i) => (
                      <p key={i} className="break-words">
                        {line.map((num, j) => (
                          <span key={num.href + j}>
                            {j > 0 && <span className="text-slate"> / </span>}
                            <a href={num.href} className="hover:text-purple-600">
                              {num.display}
                            </a>
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate">
                  Electronic Mail
                </span>
                <p className="mt-0.5 font-medium">
                  <a href={`mailto:${office.email}`} className="hover:text-purple-600">
                    {office.email}
                  </a>
                </p>
              </div>
              {office.officeHours && (
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate">
                    Office Hours
                  </span>
                  <p className="mt-0.5 font-medium">{office.officeHours}</p>
                </div>
              )}
            </div>
          </Reveal>

          {office.mapEmbedUrl && (
            <Reveal delay={200}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <iframe
                  src={office.mapEmbedUrl}
                  title={`Map to ${office.name}`}
                  loading="lazy"
                  className="h-56 w-full border-0"
                />
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={160} className="lg:col-span-7">
          <ContactForm
            officeId={office.id}
            officeEmail={office.email}
            practiceAreas={practiceAreas.map((pa) => ({ id: pa.id, name: pa.name }))}
          />
        </Reveal>
      </div>
    </div>
  );
}
