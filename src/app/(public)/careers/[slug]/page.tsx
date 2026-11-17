import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobPostingBySlug, getJobPostings } from "@/lib/data/job-postings";
import { Reveal } from "@/components/ui/reveal";
import { JobApplicationForm } from "../job-application-form";

export async function generateStaticParams() {
  const postings = await getJobPostings();
  return postings.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posting = await getJobPostingBySlug(slug);
  return { title: posting?.title ?? "Careers" };
}

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posting = await getJobPostingBySlug(slug);
  if (!posting || !posting.isOpen) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/careers"
          className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-purple-600"
        >
          &larr; All Careers
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-purple-600">
          {[posting.department, posting.location, posting.employmentType]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
          {posting.title}
        </h1>
      </Reveal>

      <Reveal delay={140}>
        <div
          className="rich-text mt-8"
          dangerouslySetInnerHTML={{ __html: posting.descriptionHtml }}
        />
      </Reveal>

      <Reveal delay={200}>
        <h2 className="mt-12 font-serif text-xl font-semibold text-charcoal">
          Apply for this role
        </h2>
        <div className="mt-4">
          <JobApplicationForm jobPostingId={posting.id} jobTitle={posting.title} />
        </div>
      </Reveal>
    </div>
  );
}
