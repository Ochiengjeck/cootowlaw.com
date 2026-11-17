"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CheckIcon, PhotoIcon, SearchIcon, XIcon } from "@/lib/icons";

type MediaItem = { id: string; url: string; alt: string };

export function ImagePicker({
  label,
  name,
  items,
  defaultValue,
  help,
}: {
  label: string;
  name: string;
  items: MediaItem[];
  defaultValue?: string | null;
  help?: string;
}) {
  const [selected, setSelected] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedItem = items.find((item) => item.id === selected) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => (item.alt || item.url).toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function choose(id: string) {
    setSelected(id);
    setOpen(false);
    setQuery("");
  }

  return (
    <div>
      <label className="block text-sm font-medium text-charcoal">{label}</label>
      <input type="hidden" name={name} value={selected} />

      {selectedItem ? (
        <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-border bg-white p-2.5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
            <Image src={selectedItem.url} alt={selectedItem.alt} fill sizes="64px" className="object-cover" />
          </div>
          <p className="min-w-0 flex-1 truncate text-sm text-charcoal" title={selectedItem.alt}>
            {selectedItem.alt || selectedItem.url}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-charcoal transition-colors hover:bg-surface"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-1.5 flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-border bg-surface p-3 text-left transition-colors hover:border-purple-300"
        >
          <PhotoIcon className="h-5 w-5 shrink-0 text-slate" />
          <span className="flex-1 text-sm text-slate">No image selected</span>
          <span className="shrink-0 rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-semibold text-white">
            Choose image
          </span>
        </button>
      )}

      {help && <p className="mt-1.5 text-xs text-slate">{help}</p>}
      <p className="mt-1.5 text-xs text-slate">
        Need a new image?{" "}
        <a
          href="/admin/media"
          target="_blank"
          rel="noreferrer"
          className="text-purple-600 hover:underline"
        >
          Upload it in the Media Library
        </a>{" "}
        first, then refresh this page.
      </p>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-charcoal/50"
          />
          <div className="relative flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-lg">
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <h2 className="font-serif text-lg font-semibold text-charcoal">Select an image</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition-colors hover:bg-surface hover:text-charcoal"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-border p-4">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search images…"
                  autoFocus
                  className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
              </div>
            </div>

            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => choose("")}
                  aria-pressed={selected === ""}
                  aria-label="No image"
                  className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 text-xs text-slate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 ${
                    selected === "" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-border bg-surface hover:border-purple-200"
                  }`}
                >
                  <XIcon className="h-5 w-5" />
                  None
                </button>

                {filtered.map((item) => {
                  const isSelected = selected === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => choose(item.id)}
                      aria-pressed={isSelected}
                      aria-label={`Select ${item.alt || "image"}`}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 ${
                        isSelected ? "border-purple-500 ring-2 ring-purple-500/30" : "border-border hover:border-purple-200"
                      }`}
                    >
                      <Image src={item.url} alt={item.alt} fill sizes="120px" className="object-cover" />
                      {isSelected && (
                        <div className="absolute right-1 top-1 rounded-full bg-purple-600 p-0.5 text-white">
                          <CheckIcon className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <p className="py-10 text-center text-sm text-slate">No images match your search.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
