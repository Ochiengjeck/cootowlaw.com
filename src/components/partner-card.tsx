import Image from "next/image";
import Link from "next/link";
import { excerpt } from "@/lib/excerpt";

type Photo = { url: string; alt: string } | null | undefined;

type PartnerCardAttorney = {
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
  const bio = excerpt(attorney.bioHtml, 130);

  return (
    <Link href={`/people/${attorney.slug}`} className="group block border border-border bg-white">
      <div className="relative flex h-64 items-end overflow-hidden bg-charcoal p-6">
        {attorney.photo ? (
          <Image
            src={attorney.photo.url}
            alt={attorney.photo.alt || attorney.name}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-serif text-6xl font-bold text-white/10"
          >
            {initials(attorney.name)}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
        <div className="relative z-10">
          <span className="block text-[11px] uppercase tracking-widest text-gold-400">
            {attorney.title}
          </span>
          <h3 className="font-serif text-2xl font-semibold text-white">{attorney.name}</h3>
        </div>
      </div>
      <div className="p-6">
        {credentialsLine && (
          <p className="mb-3 text-xs uppercase tracking-wider text-slate">{credentialsLine}</p>
        )}
        {bio && <p className="text-sm leading-relaxed text-slate">{bio}</p>}
      </div>
    </Link>
  );
}
