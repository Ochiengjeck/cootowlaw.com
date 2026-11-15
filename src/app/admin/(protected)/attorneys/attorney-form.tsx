"use client";

import { useActionState } from "react";
import type { AttorneyFormState } from "./actions";
import {
  TextField,
  TextAreaField,
  SelectField,
  NumberField,
  CheckboxField,
} from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImagePicker } from "@/components/admin/image-picker";
import { attorneyTiers } from "@/lib/db/schema";

type Option = { id: string; name: string };
type MediaItem = { id: string; url: string; alt: string };

type Props = {
  action: (state: AttorneyFormState, formData: FormData) => Promise<AttorneyFormState>;
  offices: Option[];
  practiceAreas: Option[];
  mediaItems: MediaItem[];
  defaultValues?: {
    slug: string;
    name: string;
    title: string;
    tier: string;
    bioHtml: string | null;
    credentials: string | null;
    email: string | null;
    phone: string | null;
    officeId: string | null;
    photoId: string | null;
    sortOrder: number;
    isActive: boolean;
    practiceAreaIds: string[];
  };
  submitLabel: string;
};

export function AttorneyForm({
  action,
  offices,
  practiceAreas,
  mediaItems,
  defaultValues,
  submitLabel,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const selectedPracticeAreaIds = new Set(defaultValues?.practiceAreaIds ?? []);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Slug" name="slug" defaultValue={defaultValues?.slug} required />
        <TextField label="Name" name="name" defaultValue={defaultValues?.name} required />
      </div>
      <TextField label="Title" name="title" defaultValue={defaultValues?.title} required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField label="Tier" name="tier" defaultValue={defaultValues?.tier ?? "partner"}>
          {attorneyTiers.map((tier) => (
            <option key={tier} value={tier}>
              {tier[0].toUpperCase() + tier.slice(1)}
            </option>
          ))}
        </SelectField>
        <SelectField label="Office (optional)" name="officeId" defaultValue={defaultValues?.officeId ?? ""}>
          <option value="">No office</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField
        label="Bio (HTML allowed, optional)"
        name="bioHtml"
        defaultValue={defaultValues?.bioHtml ?? ""}
        rows={6}
      />
      <TextAreaField
        label="Credentials (optional)"
        name="credentials"
        defaultValue={defaultValues?.credentials ?? ""}
        rows={3}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Email (optional)"
          name="email"
          type="email"
          defaultValue={defaultValues?.email ?? ""}
        />
        <TextField label="Phone (optional)" name="phone" defaultValue={defaultValues?.phone ?? ""} />
      </div>
      <ImagePicker
        label="Photo (optional)"
        name="photoId"
        items={mediaItems}
        defaultValue={defaultValues?.photoId}
      />

      <div>
        <p className="block text-sm font-medium text-charcoal">Practice areas</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {practiceAreas.map((pa) => (
            <label key={pa.id} className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                name="practiceAreaIds"
                value={pa.id}
                defaultChecked={selectedPracticeAreaIds.has(pa.id)}
                className="h-4 w-4 rounded border-border text-purple-600 focus:ring-2 focus:ring-gold-500/30"
              />
              {pa.name}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
          label="Sort order"
          name="sortOrder"
          defaultValue={String(defaultValues?.sortOrder ?? 0)}
        />
        <CheckboxField
          label="Active (shown on the public site)"
          name="isActive"
          defaultChecked={defaultValues?.isActive ?? true}
        />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label={submitLabel} />
    </form>
  );
}
