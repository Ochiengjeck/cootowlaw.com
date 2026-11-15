"use client";

import { useActionState } from "react";
import type { ClientFormState } from "./actions";
import { TextField, NumberField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";

type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: ClientFormState, formData: FormData) => Promise<ClientFormState>;
  mediaItems: MediaItem[];
  defaultValues?: {
    name: string;
    industry: string;
    website: string | null;
    logoId: string | null;
    sortOrder: number;
  };
  submitLabel: string;
};

export function ClientForm({ action, mediaItems, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <TextField label="Name" name="name" defaultValue={defaultValues?.name} required />
      <TextField label="Industry" name="industry" defaultValue={defaultValues?.industry} required />
      <TextField
        label="Website (optional)"
        name="website"
        defaultValue={defaultValues?.website ?? ""}
      />
      <ImagePicker
        label="Logo (optional)"
        name="logoId"
        items={mediaItems}
        defaultValue={defaultValues?.logoId}
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
