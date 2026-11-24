import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPracticeAreas } from "@/lib/data/practice-areas";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { getPracticeIcon } from "@/lib/practice-icons";

export const metadata: Metadata = { title: "Practice Areas" };

export default async function PracticesPage() {
  const practiceAreas = await getPracticeAreas();
  const [featured, ...rest] = practiceAreas;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="What we do"
          title="Practice Areas"
          description="Our advocates cover a broad range of legal disciplines across Eastern Africa."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured &&
          (() => {
            const FeaturedIcon = getPracticeIcon(featured.slug);
            return (
              <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                <Link
                  href={`/practices/${featured.slug}`}
                  className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white transition-transform duration-300 hover:-translate-y-0.5 sm:p-10"
                >
                  {featured.heroImage ? (
                    <Image
                      src={featured.heroImage.url}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src="/images/hero/our-firm.webp"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                  <div className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-400 backdrop-blur-sm transition-colors group-hover:bg-gold-500 group-hover:text-charcoal sm:left-10 sm:top-10">
                    <FeaturedIcon className="h-6 w-6" />
                  </div>
                  <div className="relative">
                    <h2 className="font-serif text-2xl font-semibold">{featured.name}</h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                      {featured.summary}
                    </p>
                    <span className="mt-8 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold-400 group-hover:text-white">
                      Learn more
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })()}
        {rest.map((pa, i) => {
          const PracticeIcon = getPracticeIcon(pa.slug);
          return (
            <Reveal key={pa.id} delay={Math.min(i * 60, 300)}>
              <Link
                href={`/practices/${pa.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(20,22,26,0.18)]"
              >
                {pa.heroImage ? (
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={pa.heroImage.url}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold-400 backdrop-blur-sm transition-colors group-hover:bg-gold-500 group-hover:text-charcoal">
                      <PracticeIcon className="h-5 w-5" />
                    </div>
                  </div>
                ) : null}
                <div className="p-8">
                  {!pa.heroImage && (
                    <IconBox>
                      <PracticeIcon className="h-6 w-6" />
                    </IconBox>
                  )}
                  <h2 className="font-serif text-lg font-semibold text-charcoal">{pa.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{pa.summary}</p>
                  <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                    Learn more
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
