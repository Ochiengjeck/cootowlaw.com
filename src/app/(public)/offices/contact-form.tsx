"use client";

import { useActionState } from "react";
import { submitContactForm, submitGeneralContactForm } from "./actions";

type PracticeAreaOption = { id: string; name: string };
type OfficeOption = { id: string; name: string };

type ContactFormProps =
  | { officeId: string; officeEmail: string; practiceAreas: PracticeAreaOption[]; offices?: undefined }
  | { officeId?: undefined; officeEmail?: undefined; practiceAreas: PracticeAreaOption[]; offices: OfficeOption[] };

export function ContactForm(props: ContactFormProps) {
  const { practiceAreas } = props;
  const action = props.offices
    ? submitGeneralContactForm
    : submitContactForm.bind(null, props.officeId, props.officeEmail);
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
        Thank you — your message has been sent. We&apos;ll be in touch shortly.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-border bg-white p-8 lg:p-10">
      {props.offices && (
        <div>
          <label
            htmlFor="officeId"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal"
          >
            Office
          </label>
          <select
            id="officeId"
            name="officeId"
            required
            defaultValue=""
            className="w-full rounded-xl border border-border bg-alabaster px-4 py-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none"
          >
            <option value="" disabled>
              Select an office
            </option>
            {props.offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" />
        <div>
          <label
            htmlFor="practiceAreaId"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal"
          >
            Practice area
          </label>
          <select
            id="practiceAreaId"
            name="practiceAreaId"
            className="w-full rounded-xl border border-border bg-alabaster px-4 py-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none"
          >
            <option value="">General enquiry</option>
            {practiceAreas.map((pa) => (
              <option key={pa.id} value={pa.id}>
                {pa.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-border bg-alabaster px-4 py-3 text-sm text-charcoal focus:border-gold-500 focus:outline-none"
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gold-500 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-600 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
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
