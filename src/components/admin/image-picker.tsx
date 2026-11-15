"use client";

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
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-charcoal">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-charcoal focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
      >
        <option value="">No image</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.alt || item.url}
          </option>
        ))}
      </select>
      {help && <p className="mt-1 text-xs text-slate">{help}</p>}
      <p className="mt-1 text-xs text-slate">
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
    </div>
  );
}
