"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { TextField } from "@/components/admin/form-fields";
import { SubmitButton } from "@/components/admin/submit-button";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="mt-6 space-y-5">
      <TextField label="Email" name="email" type="email" required autoComplete="username" />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />
      {state?.error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}
      <SubmitButton
        pending={pending}
        label="Sign in"
        pendingLabel="Signing in…"
        className="w-full justify-center"
      />
    </form>
  );
}
