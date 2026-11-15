import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-alabaster px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-charcoal">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate">
          Cootow &amp; Associates Advocates content management
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
