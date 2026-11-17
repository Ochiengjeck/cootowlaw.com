import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * Shared page-level banner image (About, Careers, People, and the
 * cases/news/offices/practice-area detail pages). Mobile height/rounding are
 * standardized here; pass heightClassName/roundedClassName to preserve a
 * page's existing desktop look where it differs from the common h-72/
 * rounded-3xl convention.
 */
export function HeroBanner({
  src,
  alt,
  delay = 60,
  sizes = "(min-width: 1024px) 768px, 100vw",
  heightClassName = "h-48 sm:h-72",
  roundedClassName = "rounded-2xl sm:rounded-3xl",
}: {
  src: string;
  alt: string;
  delay?: number;
  sizes?: string;
  heightClassName?: string;
  roundedClassName?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`relative mt-6 w-full overflow-hidden sm:mt-8 ${heightClassName} ${roundedClassName}`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </Reveal>
  );
}
