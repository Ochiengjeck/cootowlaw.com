import type { Metadata } from "next";
import Image from "next/image";
import { getClients } from "@/lib/data/clients";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Clientele" };

// Cycled by industry index so each industry group reads as its own colour, rather
// than every group sharing the same purple accent (client asked for "more colourful").
const industryAccents = [
  { dot: "bg-purple-500", text: "text-purple-600", border: "border-t-purple-600", monoBg: "bg-purple-50", monoText: "text-purple-600" },
  { dot: "bg-gold-500", text: "text-gold-600", border: "border-t-gold-500", monoBg: "bg-gold-50", monoText: "text-gold-600" },
  { dot: "bg-teal-600", text: "text-teal-600", border: "border-t-teal-600", monoBg: "bg-teal-600/10", monoText: "text-teal-600" },
  { dot: "bg-terracotta-600", text: "text-terracotta-600", border: "border-t-terracotta-600", monoBg: "bg-terracotta-600/10", monoText: "text-terracotta-600" },
  { dot: "bg-blue-600", text: "text-blue-600", border: "border-t-blue-600", monoBg: "bg-blue-600/10", monoText: "text-blue-600" },
  { dot: "bg-purple-700", text: "text-purple-700", border: "border-t-purple-700", monoBg: "bg-purple-700/10", monoText: "text-purple-700" },
];

export default async function ClientelePage() {
  const clients = await getClients();

  const byIndustry = new Map<string, typeof clients>();
  for (const client of clients) {
    const list = byIndustry.get(client.industry) ?? [];
    list.push(client);
    byIndustry.set(client.industry, list);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Who we serve"
          title="Clientele"
          description="We are proud to serve a diverse range of institutions across Kenya and beyond."
          align="center"
        />
      </Reveal>

      <div className="mt-14 space-y-14">
        {[...byIndustry.entries()].map(([industry, group], groupIndex) => {
          const accent = industryAccents[groupIndex % industryAccents.length];
          return (
            <Reveal key={industry} delay={Math.min(groupIndex * 80, 240)}>
              <div>
                <span
                  className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${accent.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                  {industry}
                </span>
                <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {group.map((client, i) => (
                    <Reveal key={client.id} delay={Math.min(i * 60, 240)}>
                      <div
                        className={`group flex h-full flex-col items-center rounded-2xl border border-t-4 border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(26,24,30,0.18)] ${accent.border}`}
                      >
                        <div className="relative flex h-16 w-full items-center justify-center">
                          {client.logo ? (
                            <Image
                              src={client.logo.url}
                              alt={client.logo.alt}
                              width={160}
                              height={64}
                              className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className={`flex h-12 w-12 items-center justify-center rounded-xl text-base font-semibold ${accent.monoBg} ${accent.monoText}`}
                            >
                              {client.name.slice(0, 1)}
                            </span>
                          )}
                        </div>
                        <span className="mt-4 text-xs font-medium leading-snug text-slate">
                          {client.name}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
