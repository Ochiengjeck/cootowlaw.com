"use client";

import { useActionState } from "react";
import type { PracticeAreaFormState } from "./actions";
import { TextField, TextAreaField, NumberField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

type Props = {
  action: (state: PracticeAreaFormState, formData: FormData) => Promise<PracticeAreaFormState>;
  defaultValues?: {
    slug: string;
    name: string;
    summary: string;
    descriptionHtml: string;
    servicesList: string[];
    sortOrder: number;
  };
  submitLabel: string;
};

export function PracticeAreaForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <TextField label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
      <TextField label="Name" name="name" defaultValue={defaultValues?.name} required />
      <TextField
        label="Summary (short teaser)"
        name="summary"
        defaultValue={defaultValues?.summary}
        required
      />
      <TextAreaField
        label="Description (HTML allowed)"
        name="descriptionHtml"
        defaultValue={defaultValues?.descriptionHtml}
        rows={6}
        required
      />
      <TextAreaField
        label="Services (one per line)"
        name="servicesList"
        defaultValue={defaultValues?.servicesList.join("\n")}
        rows={5}
      />
      <NumberField
        label="Sort order"
        name="sortOrder"
        defaultValue={String(defaultValues?.sortOrder ?? 0)}
      />
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label={submitLabel} />
    </form>
  );
}
