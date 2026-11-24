import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAttorneyBySlug, getAttorneys } from "@/lib/data/attorneys";
import { Reveal } from "@/components/ui/reveal";
import { PersonIcon, CheckIcon } from "@/lib/icons";
import { attorneyPhotoStyle } from "@/lib/attorney-photo-position";

const TIER_LABEL: Record<string, string> = {
  partner: "Partner",
  associate: "Associate",
  staff: "Staff",
};

export async function generateStaticParams() {
  const attorneys = await getAttorneys();
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attorney = await getAttorneyBySlug(slug);
  return { title: attorney?.name ?? "Our People" };
}

export default async function AttorneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const attorney = await getAttorneyBySlug(slug);
  if (!attorney) notFound();

  const jumpSections = [
    attorney.bioHtml ? { id: "background", label: "Background" } : null,
    attorney.credentials ? { id: "credentials", label: "Credentials" } : null,
    attorney.practiceAreas.length > 0 ? { id: "practice-areas", label: "Practice Areas" } : null,
  ].filter((s): s is { id: string; label: string } => s !== null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/people"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All People
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row">
          <div className="relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-64 sm:w-52">
            {attorney.photo ? (
              <Image
                src={attorney.photo.url}
                alt={attorney.photo.alt || attorney.name}
                fill
                sizes="208px"
                style={attorneyPhotoStyle(attorney.slug)}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate/40">
                <PersonIcon className="h-16 w-16" />
              </div>
            )}
          </div>
          <div className="pt-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">
              {TIER_LABEL[attorney.tier]}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              {attorney.name}
            </h1>
            <p className="mt-1 text-slate">{attorney.title}</p>
            {attorney.office && <p className="mt-1 text-sm text-slate">{attorney.office.name}</p>}
          </div>
        </div>
      </Reveal>

      {jumpSections.length > 1 && (
        <Reveal delay={110}>
          <nav
            aria-label="Jump to section"
            className="mt-8 flex flex-wrap items-center gap-2 border-b border-border pb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-slate">
              Navigate to
            </span>
            {jumpSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-purple-500 hover:text-purple-600"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </Reveal>
      )}

      {attorney.bioHtml && (
        <Reveal delay={140}>
          <div
            id="background"
            className="rich-text mt-8 scroll-mt-20"
            dangerouslySetInnerHTML={{ __html: attorney.bioHtml }}
          />
        </Reveal>
      )}

      {attorney.credentials && (
        <Reveal delay={180}>
          <div id="credentials" className="mt-8 scroll-mt-20">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Credentials</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {attorney.credentials
                .split(";")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-white px-4 py-3 text-sm leading-snug text-charcoal"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      )}

      {attorney.practiceAreas.length > 0 && (
        <Reveal delay={220}>
          <div id="practice-areas" className="mt-8 scroll-mt-20">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Practice Areas</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {attorney.practiceAreas.map((pa) => (
                <Link
                  key={pa.id}
                  href={`/practices/${pa.slug}`}
                  className="rounded-full border border-purple-500/20 bg-purple-50 px-4 py-2 text-sm text-purple-700 transition-colors hover:bg-purple-500 hover:text-white"
                >
                  {pa.name}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
