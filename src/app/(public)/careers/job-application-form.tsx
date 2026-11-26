"use client";

import { useActionState } from "react";
import { submitJobApplication } from "./actions";

type Props = {
  jobPostingId?: string;
  jobTitle?: string;
};

export function JobApplicationForm({ jobPostingId, jobTitle }: Props) {
  const action = submitJobApplication.bind(null, jobPostingId ?? null, jobTitle ?? null);
  const [state, formAction, pending] = useActionState(action, undefined);

  if (state?.success) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-purple-500/20 bg-purple-50 p-6 text-sm font-medium text-purple-700">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Thank you — your application has been received. We&apos;ll be in touch if there&apos;s a
        fit.
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-border bg-white p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" />
        <div>
          <label
            htmlFor="resume"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal"
          >
            Résumé / CV (optional)
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full rounded-xl border border-border bg-alabaster px-4 py-2.5 text-sm text-charcoal file:mr-3 file:rounded-full file:border-0 file:bg-gold-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-charcoal hover:file:bg-gold-600 focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal"
        >
          {jobPostingId ? "Why you'd be a good fit (optional)" : "Tell us about yourself (optional)"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-xl border border-border bg-alabaster px-4 py-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none"
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gold-500 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Submitting…" : jobPostingId ? "Submit application" : "Join the talent pool"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-alabaster px-4 py-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none"
      />
    </div>
  );
}
