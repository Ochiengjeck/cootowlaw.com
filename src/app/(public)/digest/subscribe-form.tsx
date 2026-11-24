"use client";

import { useActionState } from "react";
import { subscribeToDigest } from "./actions";

export function SubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribeToDigest, undefined);

  if (state?.success) {
    return (
      <p className="rounded-2xl border border-purple-500/20 bg-purple-50 p-6 text-sm font-medium text-purple-700">
        Thank you — you&apos;re subscribed to the Legal Digest.
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="digest-email" className="sr-only">
          Email address
        </label>
        <input
          id="digest-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-xl border border-border bg-alabaster px-4 py-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none"
        />
        {state?.error && <p className="mt-2 text-sm text-destructive">{state.error}</p>}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="shrink-0 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
