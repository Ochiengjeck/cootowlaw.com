import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOfficeBySlug, getOffices } from "@/lib/data/offices";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { ContactForm } from "./contact-form";

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
      <Link
        href="/offices"
        className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
      >
        &larr; All Offices
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Confidential Inquiry
          </span>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
            {office.name}
          </h1>

          <div className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6 text-sm text-charcoal">
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate">
                Chambers
              </span>
              <p className="mt-0.5 font-medium">
                {office.addressLine1}
                {office.addressLine2 ? `, ${office.addressLine2}` : ""}, {office.city}, Kenya
              </p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate">
                Direct Telephone
              </span>
              <p className="mt-0.5 font-medium">{office.phone}</p>
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
        </div>

        <div className="lg:col-span-7">
          <ContactForm
            officeId={office.id}
            officeEmail={office.email}
            practiceAreas={practiceAreas.map((pa) => ({ id: pa.id, name: pa.name }))}
          />
        </div>
      </div>
    </div>
  );
}
