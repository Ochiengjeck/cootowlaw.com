"use client";

import { useActionState } from "react";
import type { DigestPostFormState } from "./actions";
import { TextField, TextAreaField, SelectField } from "@/components/admin/form-fields";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";

type Option = { id: string; name: string };
type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: DigestPostFormState, formData: FormData) => Promise<DigestPostFormState>;
  authors: Option[];
  mediaItems: MediaItem[];
  defaultValues?: {
    slug: string;
    title: string;
    excerpt: string;
    bodyHtml: string;
    coverImageId: string | null;
    authorId: string | null;
    publishedAt: Date | null;
  };
  submitLabel: string;
};

function toDatetimeLocal(date: Date | null) {
  if (!date) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function DigestForm({ action, authors, mediaItems, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
        <TextField label="Title" name="title" defaultValue={defaultValues?.title} required />
      </div>
      <TextAreaField
        label="Excerpt"
        name="excerpt"
        defaultValue={defaultValues?.excerpt}
        rows={2}
        required
      />
      <RichTextField label="Body (HTML allowed)" name="bodyHtml" defaultValue={defaultValues?.bodyHtml} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField label="Author (optional)" name="authorId" defaultValue={defaultValues?.authorId ?? ""}>
          <option value="">None</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </SelectField>
        <TextField
          label="Publish date (optional — leave blank to save as a draft)"
          name="publishedAt"
          type="datetime-local"
          defaultValue={toDatetimeLocal(defaultValues?.publishedAt ?? null)}
        />
      </div>
      <ImagePicker
        label="Cover image (optional)"
        name="coverImageId"
        items={mediaItems}
        defaultValue={defaultValues?.coverImageId}
      />
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label={submitLabel} />
    </form>
  );
}
