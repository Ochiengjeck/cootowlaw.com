import Link from "next/link";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { adminListOffices } from "@/lib/data/offices";
import { adminListClients } from "@/lib/data/clients";
import { adminListCaseBriefs } from "@/lib/data/case-briefs";
import { adminListNewsPosts } from "@/lib/data/news";
import { adminListJobPostings } from "@/lib/data/job-postings";
import { adminListMedia } from "@/lib/data/media";
import { getNeedsAttentionCounts } from "@/lib/data/dashboard";
import { getCurrentAdmin } from "@/lib/auth";
import { LinkButton } from "@/components/admin/submit-button";
import {
  PeopleIcon,
  ScaleIcon,
  BuildingIcon,
  HandshakeIcon,
  BookOpenIcon,
  NewspaperIcon,
  BriefcaseIcon,
  PhotoIcon,
  ChatBubbleIcon,
  InboxIcon,
  PlusIcon,
} from "@/lib/icons";

export default async function AdminDashboardPage() {
  const [
    admin,
    practiceAreas,
    attorneys,
    offices,
    clients,
    caseBriefs,
    newsPosts,
    jobPostings,
    media,
    { pendingMessages, pendingApplications },
  ] = await Promise.all([
    getCurrentAdmin(),
    adminListPracticeAreas(),
    adminListAttorneys(),
    adminListOffices(),
    adminListClients(),
    adminListCaseBriefs(),
    adminListNewsPosts(),
    adminListJobPostings(),
    adminListMedia(),
    getNeedsAttentionCounts(),
  ]);

  const stats = [
    { href: "/admin/attorneys", label: "People", count: attorneys.length, icon: PeopleIcon, chip: "purple" },
    {
      href: "/admin/practice-areas",
      label: "Practice Areas",
      count: practiceAreas.length,
      icon: ScaleIcon,
      chip: "gold",
    },
    { href: "/admin/offices", label: "Offices", count: offices.length, icon: BuildingIcon, chip: "purple" },
    { href: "/admin/clients", label: "Clientele", count: clients.length, icon: HandshakeIcon, chip: "gold" },
    {
      href: "/admin/cases",
      label: "Landmark Briefs",
      count: caseBriefs.length,
      icon: BookOpenIcon,
      chip: "purple",
    },
    { href: "/admin/news", label: "News", count: newsPosts.length, icon: NewspaperIcon, chip: "gold" },
    {
      href: "/admin/jobs",
      label: "Job Postings",
      count: jobPostings.length,
      icon: BriefcaseIcon,
      chip: "purple",
    },
    { href: "/admin/media", label: "Media Library", count: media.length, icon: PhotoIcon, chip: "gold" },
  ] as const;

  const chipClass = {
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    gold: "bg-gold-50 text-gold-600 group-hover:bg-gold-100",
  } as const;

  const quickActions = [
    { href: "/admin/attorneys/new", label: "New person" },
    { href: "/admin/practice-areas/new", label: "New practice area" },
    { href: "/admin/cases/new", label: "New brief" },
    { href: "/admin/news/new", label: "New post" },
    { href: "/admin/jobs/new", label: "New posting" },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-slate">Welcome back, {admin.name.split(" ")[0]}</p>
        <h1 className="font-serif text-3xl font-semibold text-charcoal">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((item) => {
          const StatIcon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl border border-border bg-white p-5 transition-all hover:border-purple-300 hover:shadow-sm"
            >
              <div className={`rounded-lg p-2.5 transition-colors ${chipClass[item.chip]}`}>
                <StatIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-semibold text-charcoal">{item.count}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
          Needs attention
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/messages"
            className={`flex items-center justify-between rounded-xl border p-5 transition-colors ${
              pendingMessages > 0
                ? "border-gold-500/30 bg-gold-50 hover:border-gold-500/50"
                : "border-border bg-white hover:border-purple-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <ChatBubbleIcon
                className={`h-5 w-5 ${pendingMessages > 0 ? "text-gold-600" : "text-slate"}`}
              />
              <div>
                <p className="text-sm font-medium text-charcoal">Pending messages</p>
                <p className="text-xs text-slate">
                  {pendingMessages > 0 ? `${pendingMessages} awaiting a reply` : "All caught up"}
                </p>
              </div>
            </div>
            <p className="text-2xl font-semibold text-charcoal">{pendingMessages}</p>
          </Link>

          <Link
            href="/admin/applications"
            className={`flex items-center justify-between rounded-xl border p-5 transition-colors ${
              pendingApplications > 0
                ? "border-gold-500/30 bg-gold-50 hover:border-gold-500/50"
                : "border-border bg-white hover:border-purple-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <InboxIcon
                className={`h-5 w-5 ${pendingApplications > 0 ? "text-gold-600" : "text-slate"}`}
              />
              <div>
                <p className="text-sm font-medium text-charcoal">Pending applications</p>
                <p className="text-xs text-slate">
                  {pendingApplications > 0
                    ? `${pendingApplications} awaiting review`
                    : "All caught up"}
                </p>
              </div>
            </div>
            <p className="text-2xl font-semibold text-charcoal">{pendingApplications}</p>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <LinkButton key={action.href} href={action.href} variant="secondary">
              <PlusIcon className="h-4 w-4" /> {action.label}
            </LinkButton>
          ))}
        </div>
      </section>
    </div>
  );
}
