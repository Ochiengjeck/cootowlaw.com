"use client";

import { useActionState } from "react";
import type { CaseBriefFormState } from "./actions";
import { TextField, TextAreaField, SelectField, NumberField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

type Option = { id: string; name: string };

type Props = {
  action: (state: CaseBriefFormState, formData: FormData) => Promise<CaseBriefFormState>;
  practiceAreas: Option[];
  clients: Option[];
  defaultValues?: {
    slug: string;
    title: string;
    courtReference: string;
    summaryHtml: string;
    outcomeHtml: string;
    practiceAreaId: string | null;
    clientId: string | null;
    year: number | null;
    sortOrder: number;
  };
  submitLabel: string;
};

export function CaseBriefForm({ action, practiceAreas, clients, defaultValues, submitLabel }: Props) {
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
      <TextAreaField
        label="Summary (HTML allowed)"
        name="summaryHtml"
        defaultValue={defaultValues?.summaryHtml}
        rows={5}
        required
      />
      <TextAreaField
        label="Outcome (HTML allowed)"
        name="outcomeHtml"
        defaultValue={defaultValues?.outcomeHtml}
        rows={5}
        required
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
