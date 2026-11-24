"use client";

import { useActionState } from "react";
import { subscribeToDigest } from "@/app/(public)/digest/actions";
import { MailIcon } from "@/lib/icons";

export function FooterSubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribeToDigest, undefined);

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-5 py-4 text-sm font-medium text-gold-400 lg:w-96">
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        You&apos;re subscribed to the Legal Digest.
      </div>
    );
  }

  return (
    <form action={formAction} className="w-full shrink-0 lg:w-96">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <MailIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <label htmlFor="footer-digest-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-digest-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-gold-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-600 disabled:opacity-60"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state?.error && <p className="mt-2 text-xs text-destructive">{state.error}</p>}
    </form>
  );
}
