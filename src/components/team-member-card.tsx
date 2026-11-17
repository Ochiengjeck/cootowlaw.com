import Image from "next/image";
import { CardLink } from "@/components/ui/card";
import { PersonIcon } from "@/lib/icons";

type Photo = { url: string; alt: string } | null | undefined;

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  photo: Photo;
};

export function TeamMemberCard({ person }: { person: TeamMember }) {
  return (
    <CardLink
      href={`/people/${person.slug}`}
      className="relative flex aspect-[3/4] flex-col justify-end p-0"
    >
      {person.photo ? (
        <Image
          src={person.photo.url}
          alt={person.photo.alt || person.name}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-slate/40">
          <PersonIcon className="h-16 w-16" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
      <div className="relative p-5">
        <h3 className="font-serif text-base font-semibold text-white">{person.name}</h3>
        <p className="mt-0.5 text-xs text-white/70">{person.title}</p>
      </div>
    </CardLink>
  );
}
