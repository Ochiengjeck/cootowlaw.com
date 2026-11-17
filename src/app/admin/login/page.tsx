import { Logo } from "@/components/logo";
import { getCurrentYear } from "@/lib/current-year";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const year = await getCurrentYear();

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-gradient-to-br from-charcoal via-charcoal to-purple-900 p-10 text-white lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        />
        <Logo dark big />
        <div className="relative">
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Firm management console for Cootow &amp; Associates Advocates — manage people,
            practice areas, case briefs, and site content in one place.
          </p>
          <div className="mt-6 h-px w-16 bg-gold-500/60" />
        </div>
        <p className="relative text-xs text-white/40">
          &copy; {year} Cootow &amp; Associates Advocates.
        </p>
      </div>

      <main className="flex flex-1 items-center justify-center bg-alabaster px-4 py-16">
        <div className="animate-rise w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-lg shadow-charcoal/5">
          <Logo big className="mb-6 justify-center lg:hidden" />
          <h1 className="font-serif text-2xl font-semibold text-charcoal">Welcome back</h1>
          <p className="mt-1 text-sm text-slate">Sign in to manage the site.</p>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
