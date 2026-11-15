"use client";

import { useActionState } from "react";
import type { OfficeFormState } from "./actions";
import { TextField, NumberField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";

type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: OfficeFormState, formData: FormData) => Promise<OfficeFormState>;
  mediaItems: MediaItem[];
  defaultValues?: {
    slug: string;
    name: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    phone: string;
    email: string;
    officeHours: string | null;
    mapEmbedUrl: string | null;
    heroImageId: string | null;
    sortOrder: number;
  };
  submitLabel: string;
};

export function OfficeForm({ action, mediaItems, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
        <TextField label="Name" name="name" defaultValue={defaultValues?.name} required />
      </div>
      <TextField
        label="Address line 1"
        name="addressLine1"
        defaultValue={defaultValues?.addressLine1}
        required
      />
      <TextField
        label="Address line 2 (optional)"
        name="addressLine2"
        defaultValue={defaultValues?.addressLine2 ?? ""}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="City" name="city" defaultValue={defaultValues?.city} required />
        <TextField label="Phone" name="phone" defaultValue={defaultValues?.phone} required />
      </div>
      <TextField
        label="Email"
        name="email"
        type="email"
        defaultValue={defaultValues?.email}
        required
      />
      <TextField
        label="Office hours (optional)"
        name="officeHours"
        defaultValue={defaultValues?.officeHours ?? ""}
      />
      <TextField
        label="Map embed URL (optional)"
        name="mapEmbedUrl"
        defaultValue={defaultValues?.mapEmbedUrl ?? ""}
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
