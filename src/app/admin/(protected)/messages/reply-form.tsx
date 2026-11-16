"use client";

import { useActionState } from "react";
import { replyToSubmissionAction } from "./actions";
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
    <form action={formAction} className="mt-3 space-y-2">
      <textarea
        name="replyMessage"
        rows={3}
        placeholder={`Reply to ${recipientName}…`}
        className="block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-charcoal focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
      />
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton pending={pending} label="Send reply" pendingLabel="Sending…" />
    </form>
  );
}
