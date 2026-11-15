import Link from "next/link";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { adminListOffices } from "@/lib/data/offices";
import { adminListClients } from "@/lib/data/clients";
import { adminListCaseBriefs } from "@/lib/data/case-briefs";
import { adminListNewsPosts } from "@/lib/data/news";
import { adminListContactSubmissions } from "@/lib/data/contact";
import { adminListMedia } from "@/lib/data/media";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function AdminDashboardPage() {
  const [
    practiceAreas,
    attorneys,
    offices,
    clients,
    caseBriefs,
    newsPosts,
    contactSubmissions,
    media,
  ] = await Promise.all([
    adminListPracticeAreas(),
    adminListAttorneys(),
    adminListOffices(),
    adminListClients(),
    adminListCaseBriefs(),
    adminListNewsPosts(),
    adminListContactSubmissions(),
    adminListMedia(),
  ]);

  const pendingMessages = contactSubmissions.filter((m) => !m.handledAt).length;

  const stats = [
    { href: "/admin/attorneys", label: "People", count: attorneys.length },
    { href: "/admin/practice-areas", label: "Practice Areas", count: practiceAreas.length },
    { href: "/admin/offices", label: "Offices", count: offices.length },
    { href: "/admin/clients", label: "Clientele", count: clients.length },
    { href: "/admin/cases", label: "Landmark Briefs", count: caseBriefs.length },
    { href: "/admin/news", label: "News", count: newsPosts.length },
    {
      href: "/admin/messages",
      label: "Messages",
      count: contactSubmissions.length,
      highlight: pendingMessages > 0 ? `${pendingMessages} unread` : undefined,
    },
    { href: "/admin/media", label: "Media Library", count: media.length },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Manage the public site's content below."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-purple-300"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-charcoal">{item.count}</p>
            {item.highlight && (
              <p className="mt-1 text-xs font-medium text-gold-600">{item.highlight}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
