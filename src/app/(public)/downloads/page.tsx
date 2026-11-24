import type { Metadata } from "next";
import { getDownloads } from "@/lib/data/downloads";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { DownloadIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "Downloads" };

export default async function DownloadsPage() {
  const items = await getDownloads();

  const byCategory = new Map<string, typeof items>();
  for (const item of items) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Resources"
          title="Downloads"
          description="Firm publications, guides, and resources available to download."
        />
      </Reveal>

      {items.length === 0 ? (
        <Reveal>
          <EmptyState
            icon={<DownloadIcon className="h-6 w-6" />}
            title="No downloads available yet"
            description="Check back soon for firm publications and resources."
          />
        </Reveal>
      ) : (
        <div className="mt-10 space-y-12">
          {[...byCategory.entries()].map(([category, group], groupIndex) => (
            <Reveal key={category} delay={Math.min(groupIndex * 80, 240)}>
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  {category}
                </span>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {group.map((item, i) => (
                    <Reveal key={item.id} delay={Math.min(i * 60, 240)}>
                      <a
                        href={item.fileUrl}
                        download={item.fileFilename}
                        className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(26,24,30,0.18)]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition-colors group-hover:bg-gold-500 group-hover:text-charcoal">
                          <DownloadIcon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-serif text-base font-semibold text-charcoal">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="mt-1 block text-sm leading-relaxed text-slate">
                              {item.description}
                            </span>
                          )}
                        </span>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
