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
      className="flex flex-wrap items-end gap-4 rounded-xl border-2 border-dashed border-border bg-white p-5 transition-colors hover:border-purple-300"
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
          className="mt-1.5 block text-sm text-slate file:mr-3 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
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
