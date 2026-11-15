import Link from "next/link";
import { getOffices } from "@/lib/data/offices";
import { getSiteSettings } from "@/lib/data/settings";
import { mainNavItems } from "@/lib/nav-items";
import { getCurrentYear } from "@/lib/current-year";
import { Logo } from "./logo";

export async function SiteFooter() {
  const [offices, settings, year] = await Promise.all([
    getOffices(),
    getSiteSettings(),
    getCurrentYear(),
  ]);

  return (
    <footer className="border-t border-white/10 bg-charcoal text-white/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-3 max-w-xs text-sm text-white/60">
              {settings?.tagline ?? "Leading Legal Service Provider for all Times"}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {offices.map((office) => (
            <div key={office.id}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                {office.name}
              </h3>
              <address className="mt-4 space-y-1 text-sm text-white/60 not-italic">
                <p>{office.addressLine1}</p>
                {office.addressLine2 && <p>{office.addressLine2}</p>}
                <p>{office.city}, Kenya</p>
                <p className="pt-2">
                  <a href={`mailto:${office.email}`} className="hover:text-gold-400">
                    {office.email}
                  </a>
                </p>
                <p className="break-words">{office.phone}</p>
              </address>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {settings?.firmName ?? "Cootow & Associates Advocates"}. All rights
            reserved.
          </p>
          <Link href="/privacy-policy" className="hover:text-gold-400">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
