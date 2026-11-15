import type { Metadata } from "next";
import Link from "next/link";
import { getOffices } from "@/lib/data/offices";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "Our Offices" };

export default async function OfficesPage() {
  const offices = await getOffices();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Get in touch" title="Our Offices" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {offices.map((office) => (
          <Link
            key={office.id}
            href={`/offices/${office.slug}`}
            className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
          >
            <h2 className="font-serif text-xl font-semibold text-charcoal">{office.name}</h2>
            <address className="mt-2 space-y-1 text-sm text-slate not-italic">
              <p>{office.addressLine1}</p>
              {office.addressLine2 && <p>{office.addressLine2}</p>}
              <p>{office.city}, Kenya</p>
            </address>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
              View contact details &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
