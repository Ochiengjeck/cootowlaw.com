export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className ?? ""}`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
          dark ? "text-gold-400" : "text-purple-600"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-gold-400" : "bg-purple-600"}`} />
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-serif text-2xl font-semibold sm:text-3xl ${
          dark ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-white/70" : "text-slate"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
