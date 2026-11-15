"use client";

import { useActionState } from "react";
import { uploadMediaAction } from "./actions";
import { TextField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

export function UploadForm() {
  const [state, formAction, pending] = useActionState(uploadMediaAction, undefined);

  return (
    <form
      action={formAction}
      className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-white p-4"
    >
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-charcoal">
          Image file
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          required
          className="mt-1 block text-sm text-charcoal"
        />
      </div>
      <div className="min-w-48 flex-1">
        <TextField label="Alt text" name="alt" required placeholder="Describe the image" />
      </div>
      {state?.error && <p className="w-full text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label="Upload" pendingLabel="Uploading…" />
    </form>
  );
}
