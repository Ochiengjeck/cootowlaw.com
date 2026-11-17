import type { Metadata } from "next";
import Image from "next/image";
import { getClients } from "@/lib/data/clients";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Clientele" };

export default async function ClientelePage() {
  const clients = await getClients();

  const byIndustry = new Map<string, typeof clients>();
  for (const client of clients) {
    const list = byIndustry.get(client.industry) ?? [];
    list.push(client);
    byIndustry.set(client.industry, list);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Who we serve"
          title="Clientele"
          description="We are proud to serve a diverse range of institutions across Kenya and beyond."
        />
      </Reveal>

      <div className="mt-10 space-y-12">
        {[...byIndustry.entries()].map(([industry, group], groupIndex) => (
          <Reveal key={industry} delay={Math.min(groupIndex * 80, 240)}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                {industry}
              </span>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.map((client, i) => (
                  <Reveal key={client.id} delay={Math.min(i * 60, 240)}>
                    <Card className="flex items-center gap-4 p-4">
                      {client.logo ? (
                        <div className="relative h-8 w-16 shrink-0">
                          <Image
                            src={client.logo.url}
                            alt={client.logo.alt}
                            fill
                            sizes="64px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-xs font-semibold text-purple-600"
                        >
                          {client.name.slice(0, 1)}
                        </span>
                      )}
                      <span className="text-sm font-medium text-charcoal">{client.name}</span>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
