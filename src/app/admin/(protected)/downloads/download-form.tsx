"use client";

import { useActionState } from "react";
import type { DownloadFormState } from "./actions";
import { TextField, TextAreaField, NumberField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

type Props = {
  action: (state: DownloadFormState, formData: FormData) => Promise<DownloadFormState>;
  defaultValues?: {
    title: string;
    description: string | null;
    category: string;
    fileFilename: string;
    publishedAt: Date | null;
    sortOrder: number;
  };
  submitLabel: string;
};

function toDatetimeLocal(date: Date | null) {
  if (!date) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function DownloadForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} encType="multipart/form-data" className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Title" name="title" defaultValue={defaultValues?.title} required />
        <TextField
          label="Category"
          name="category"
          defaultValue={defaultValues?.category}
          help="e.g. Firm Brochures, Client Guides, Regulatory Updates"
          required
        />
      </div>
      <TextAreaField
        label="Description (optional)"
        name="description"
        defaultValue={defaultValues?.description ?? ""}
        rows={3}
      />
      <TextField
        label={defaultValues ? "Replace file (optional)" : "File"}
        name="file"
        type="file"
        accept="application/pdf"
        required={!defaultValues}
        help={
          defaultValues
            ? `Current file: ${defaultValues.fileFilename}. Leave blank to keep it.`
            : undefined
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Publish date (optional — leave blank to save as a draft)"
          name="publishedAt"
          type="datetime-local"
          defaultValue={toDatetimeLocal(defaultValues?.publishedAt ?? null)}
        />
        <NumberField
          label="Sort order"
          name="sortOrder"
          defaultValue={defaultValues?.sortOrder ?? 0}
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label={submitLabel} />
    </form>
  );
}
