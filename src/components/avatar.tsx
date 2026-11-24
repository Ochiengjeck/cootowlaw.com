import Image from "next/image";
import { attorneyPhotoStyle } from "@/lib/attorney-photo-position";

type Photo = { url: string; alt: string } | null | undefined;

export function Avatar({
  name,
  photo,
  slug,
  size = 80,
  className,
}: {
  name: string;
  photo: Photo;
  slug?: string;
  size?: number;
  className?: string;
}) {
  if (photo) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full bg-muted ${className ?? ""}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={photo.url}
          alt={photo.alt || `${name} portrait`}
          fill
          sizes={`${size}px`}
          style={slug ? attorneyPhotoStyle(slug) : undefined}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground ${className ?? ""}`}
      style={{ width: size, height: size, fontSize: size / 2.8 }}
    >
      {initials(name)}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
