"use client";

import { useActionState } from "react";
import type { CaseBriefFormState } from "./actions";
import { TextField, SelectField, NumberField } from "@/components/admin/form-fields";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";

type Option = { id: string; name: string };
type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: CaseBriefFormState, formData: FormData) => Promise<CaseBriefFormState>;
  practiceAreas: Option[];
  clients: Option[];
  mediaItems: MediaItem[];
  defaultValues?: {
    slug: string;
    title: string;
    courtReference: string;
    summaryHtml: string;
    outcomeHtml: string;
    practiceAreaId: string | null;
    clientId: string | null;
    coverImageId: string | null;
    year: number | null;
    sortOrder: number;
  };
  submitLabel: string;
};

export function CaseBriefForm({
  action,
  practiceAreas,
  clients,
  mediaItems,
  defaultValues,
  submitLabel,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
        <TextField label="Title" name="title" defaultValue={defaultValues?.title} required />
      </div>
      <TextField
        label="Court reference"
        name="courtReference"
        defaultValue={defaultValues?.courtReference}
        required
      />
      <RichTextField
        label="Summary (HTML allowed)"
        name="summaryHtml"
        defaultValue={defaultValues?.summaryHtml}
      />
      <RichTextField
        label="Outcome (HTML allowed)"
        name="outcomeHtml"
        defaultValue={defaultValues?.outcomeHtml}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="Practice area (optional)"
          name="practiceAreaId"
          defaultValue={defaultValues?.practiceAreaId ?? ""}
        >
          <option value="">None</option>
          {practiceAreas.map((pa) => (
            <option key={pa.id} value={pa.id}>
              {pa.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Client (optional)"
          name="clientId"
          defaultValue={defaultValues?.clientId ?? ""}
        >
          <option value="">None</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </SelectField>
      </div>
      <ImagePicker
        label="Cover image (optional)"
        name="coverImageId"
        items={mediaItems}
        defaultValue={defaultValues?.coverImageId}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
          label="Year (optional)"
          name="year"
          defaultValue={defaultValues?.year ? String(defaultValues.year) : ""}
        />
        <NumberField
          label="Sort order"
          name="sortOrder"
          defaultValue={String(defaultValues?.sortOrder ?? 0)}
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label={submitLabel} />
    </form>
  );
}
