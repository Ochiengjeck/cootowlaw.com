"use client";

import { useActionState } from "react";
import type { PracticeAreaFormState } from "./actions";
import type { PracticeAreaService } from "@/lib/data/practice-areas";
import { TextField, TextAreaField, NumberField } from "@/components/admin/form-fields";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";

type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: PracticeAreaFormState, formData: FormData) => Promise<PracticeAreaFormState>;
  mediaItems: MediaItem[];
  defaultValues?: {
    slug: string;
    name: string;
    summary: string;
    descriptionHtml: string;
    servicesList: PracticeAreaService[];
    heroImageId: string | null;
    sortOrder: number;
  };
  submitLabel: string;
};

export function PracticeAreaForm({ action, mediaItems, defaultValues, submitLabel }: Props) {
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
      <RichTextField
        label="Description (HTML allowed)"
        name="descriptionHtml"
        defaultValue={defaultValues?.descriptionHtml}
      />
      <TextAreaField
        label="Services (one per line, as: Name: Description)"
        name="servicesList"
        defaultValue={defaultValues?.servicesList
          .map((s) => `${s.name}: ${s.description}`)
          .join("\n")}
        rows={8}
        help="Example: Asset finance: We structure and negotiate financing for vehicles, equipment, and other assets, so you can expand without taking on avoidable legal risk."
      />
      <ImagePicker
        label="Hero image (optional)"
        name="heroImageId"
        items={mediaItems}
        defaultValue={defaultValues?.heroImageId}
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
