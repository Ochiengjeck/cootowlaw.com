import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data/settings";
import { getJobPostings } from "@/lib/data/job-postings";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardLink } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { JobApplicationForm } from "./job-application-form";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const [settings, jobPostings] = await Promise.all([getSiteSettings(), getJobPostings()]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow="Join us" title="Work with us" />
      </Reveal>

      <Reveal delay={60}>
        <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
          <Image
            src="/images/hero/careers.jpg"
            alt="Colleagues standing together, silhouetted against a city skyline at sunset"
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {settings?.careersHtml && (
        <Reveal delay={100}>
          <div
            className="rich-text mt-8"
            dangerouslySetInnerHTML={{ __html: settings.careersHtml }}
          />
        </Reveal>
      )}

      <Reveal delay={140}>
        <SectionHeading className="mt-14" align="left" eyebrow="Current vacancies" title="Open Positions" />
      </Reveal>

      {jobPostings.length > 0 ? (
        <div className="mt-6 space-y-4">
          {jobPostings.map((job, i) => (
            <Reveal key={job.id} delay={Math.min(160 + i * 60, 400)}>
              <CardLink href={`/careers/${job.slug}`}>
                <h3 className="font-serif text-lg font-semibold text-charcoal">{job.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-purple-600">
                  {[job.department, job.location, job.employmentType].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">{job.summary}</p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-purple-600">
                  Apply now
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </CardLink>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={160}>
          <p className="mt-6 text-sm text-slate">
            No open positions right now — join our talent pool below and we&apos;ll reach out when
            something fits.
          </p>
        </Reveal>
      )}

      <Reveal delay={200}>
        <SectionHeading
          className="mt-14"
          align="left"
          eyebrow="Don't see a fit?"
          title="Join Our Talent Pool"
          description="Send us your details and we'll keep you in mind for future openings that match your experience."
        />
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-6">
          <JobApplicationForm />
        </div>
      </Reveal>
    </div>
  );
}
