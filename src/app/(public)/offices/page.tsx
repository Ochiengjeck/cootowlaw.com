import type { Metadata } from "next";
import Image from "next/image";
import { getOffices } from "@/lib/data/offices";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardLink } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { MapPinIcon } from "@/lib/icons";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Our Offices" };

export default async function OfficesPage() {
  const [offices, practiceAreas] = await Promise.all([getOffices(), getPracticeAreas()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Get in touch"
          title="Our Offices"
          description="Choose your nearest office below, or send a general enquiry and we'll route it to the right team."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          {offices.map((office, i) => (
            <Reveal key={office.id} delay={Math.min(i * 60, 300)}>
              <CardLink href={`/offices/${office.slug}`} className="flex h-full flex-col">
                {office.heroImage && (
                  <div className="relative -mx-6 -mt-6 mb-5 h-40">
                    <Image
                      src={office.heroImage.url}
                      alt={office.heroImage.alt || office.name}
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <h2 className="font-serif text-xl font-semibold text-charcoal">{office.name}</h2>
                <address className="mt-2 flex items-start gap-2 text-sm text-slate not-italic">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <div className="space-y-1">
                    <p>{office.addressLine1}</p>
                    {office.addressLine2 && <p>{office.addressLine2}</p>}
                    <p>{office.city}, Kenya</p>
                  </div>
                </address>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                  Contact {office.city} &rarr;
                </p>
              </CardLink>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            General Enquiry
          </span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-charcoal">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-slate">
            Select an office below and we&apos;ll make sure the right team gets your message.
          </p>
          <div className="mt-6">
            <ContactForm
              offices={offices.map((o) => ({ id: o.id, name: o.name }))}
              practiceAreas={practiceAreas.map((pa) => ({ id: pa.id, name: pa.name }))}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
