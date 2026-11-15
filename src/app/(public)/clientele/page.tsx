import type { Metadata } from "next";
import Image from "next/image";
import { getClients } from "@/lib/data/clients";
import { SectionHeading } from "@/components/ui/section-heading";

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
      <SectionHeading
        eyebrow="Who we serve"
        title="Clientele"
        description="We are proud to serve a diverse range of institutions across Kenya and beyond."
      />

      <div className="mt-10 space-y-10">
        {[...byIndustry.entries()].map(([industry, group]) => (
          <div key={industry}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-600">
              {industry}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.map((client) => (
                <li
                  key={client.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-charcoal"
                >
                  {client.logo && (
                    <div className="relative h-8 w-16 shrink-0">
                      <Image
                        src={client.logo.url}
                        alt={client.logo.alt}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  {client.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
