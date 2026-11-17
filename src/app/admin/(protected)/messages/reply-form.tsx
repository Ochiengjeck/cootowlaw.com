"use client";

import { useActionState } from "react";
import { replyToSubmissionAction } from "./actions";
import { TextAreaField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

export function ReplyForm({
  id,
  recipientEmail,
  recipientName,
}: {
  id: string;
  recipientEmail: string;
  recipientName: string;
}) {
  const action = replyToSubmissionAction.bind(null, id, recipientEmail, recipientName);
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="mt-3 space-y-3">
      <TextAreaField
        label="Reply"
        name="replyMessage"
        rows={3}
        placeholder={`Reply to ${recipientName}…`}
      />
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label="Send reply" pendingLabel="Sending…" />
    </form>
  );
}
