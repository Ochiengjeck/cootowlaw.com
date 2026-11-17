"use client";

import { useActionState } from "react";
import type { JobPostingFormState } from "./actions";
import { TextField, TextAreaField, CheckboxField, NumberField } from "@/components/admin/form-fields";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SubmitButton } from "@/components/admin/submit-button";

type Props = {
  action: (state: JobPostingFormState, formData: FormData) => Promise<JobPostingFormState>;
  defaultValues?: {
    slug: string;
    title: string;
    department: string | null;
    location: string;
    employmentType: string | null;
    summary: string;
    descriptionHtml: string;
    isOpen: boolean;
    sortOrder: number;
  };
  submitLabel: string;
};

export function JobPostingForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
        <TextField label="Title" name="title" defaultValue={defaultValues?.title} required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField
          label="Department (optional)"
          name="department"
          defaultValue={defaultValues?.department ?? ""}
        />
        <TextField label="Location" name="location" defaultValue={defaultValues?.location} required />
        <TextField
          label="Employment type (optional)"
          name="employmentType"
          defaultValue={defaultValues?.employmentType ?? ""}
          placeholder="Full-time, Internship…"
        />
      </div>
      <TextAreaField
        label="Summary (short teaser shown on the list)"
        name="summary"
        defaultValue={defaultValues?.summary}
        rows={2}
        required
      />
      <RichTextField
        label="Description (HTML allowed)"
        name="descriptionHtml"
        defaultValue={defaultValues?.descriptionHtml}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CheckboxField
          label="Open for applications"
          name="isOpen"
          defaultChecked={defaultValues?.isOpen ?? true}
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
