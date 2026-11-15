import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cootowlaw.com"),
  title: {
    default: "Cootow & Associates Advocates",
    template: "%s | Cootow & Associates Advocates",
  },
  description:
    "Cootow & Associates Advocates is a Kenyan law firm with offices in Nairobi and Mombasa, providing corporate, litigation, conveyancing, arbitration, and intellectual property legal services since 2006.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
