import Image from "next/image";

export function Logo({
  className,
  dark = false,
  big = false,
}: {
  className?: string;
  dark?: boolean;
  big?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center transition-[gap] duration-300 ease-out ${
        big ? "gap-4" : "gap-2.5"
      } ${className ?? ""}`}
    >
      <Image
        src={dark ? "/images/logo/mark-white.png" : "/images/logo/mark-purple.png"}
        alt="Cootow & Associates monogram"
        width={878}
        height={624}
        className={`w-auto shrink-0 transition-[height] duration-300 ease-out ${
          big ? "h-14 sm:h-16" : "h-8 sm:h-9"
        }`}
      />
      <span
        className={`flex flex-col font-serif font-semibold leading-tight transition-[font-size] duration-300 ease-out ${
          dark ? "text-white" : "text-charcoal"
        } ${big ? "text-lg sm:text-xl" : "text-xs sm:text-sm"}`}
      >
        <span>
          Cootow <span className="text-gold-500">&amp;</span>
        </span>
        <span>Associates</span>
      </span>
    </span>
  );
}
