import Image from "next/image";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src={dark ? "/images/logo/mark-white.png" : "/images/logo/mark-purple.png"}
        alt="Cootow & Associates monogram"
        width={878}
        height={624}
        className="h-8 w-auto shrink-0 sm:h-9"
      />
      <span
        className={`font-serif text-lg font-semibold leading-tight sm:text-xl ${
          dark ? "text-white" : "text-charcoal"
        }`}
      >
        Cootow <span className="text-gold-500">&amp;</span> Associates
      </span>
    </span>
  );
}
