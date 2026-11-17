import Image from "next/image";
import Link from "next/link";
import { excerpt } from "@/lib/excerpt";

type Photo = { url: string; alt: string } | null | undefined;

export type PartnerCardAttorney = {
  slug: string;
  name: string;
  title: string;
  credentials: string | null;
  bioHtml: string | null;
  photo: Photo;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PartnerCard({ attorney }: { attorney: PartnerCardAttorney }) {
  const credentialsLine = excerpt(attorney.credentials, 60);
  const bio = excerpt(attorney.bioHtml, 160);

  return (
    <Link
      href={`/people/${attorney.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
    >
      <div className="relative flex h-72 shrink-0 items-end overflow-hidden bg-charcoal p-6">
        {attorney.photo ? (
          <Image
            src={attorney.photo.url}
            alt={attorney.photo.alt || attorney.name}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-serif text-6xl font-bold text-white/10"
          >
            {initials(attorney.name)}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-transparent" />
        <div className="relative z-10">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            {attorney.title}
          </span>
          <h3 className="mt-1 font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
            {attorney.name}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {credentialsLine && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-purple-600">
            {credentialsLine}
          </p>
        )}
        {bio && <p className="line-clamp-4 flex-1 text-sm leading-relaxed text-slate">{bio}</p>}
        <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
          View profile
          <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
