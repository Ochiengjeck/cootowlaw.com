"use client";

import Image from "next/image";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteMediaAction } from "./actions";

type MediaItem = { id: string; url: string; alt: string };

export function MediaGrid({ items }: { items: MediaItem[] }) {
  if (items.length === 0) {
    return <p className="mt-8 text-sm text-slate">No media uploaded yet.</p>;
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.id} className="overflow-hidden rounded-xl border border-border bg-white">
          <div className="relative h-32 bg-surface">
            <Image src={item.url} alt={item.alt} fill sizes="200px" className="object-cover" />
          </div>
          <div className="p-3">
            <p className="truncate text-xs text-slate" title={item.alt}>
              {item.alt}
            </p>
            <div className="mt-2">
              <DeleteButton
                confirmMessage={`Delete "${item.alt}"? Pages that still reference this image will fail to render it.`}
                onDelete={() => deleteMediaAction(item.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
