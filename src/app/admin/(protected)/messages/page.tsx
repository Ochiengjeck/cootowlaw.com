import { adminListContactSubmissions } from "@/lib/data/contact";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/data-table";
import { markHandledAction } from "./actions";

export default async function MessagesPage() {
  const items = await adminListContactSubmissions();

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Contact form submissions from the public site."
      />

      {items.length === 0 ? (
        <EmptyState>No messages yet.</EmptyState>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-charcoal">
                    {item.name} <span className="font-normal text-slate">&lt;{item.email}&gt;</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate">
                    {item.office?.name ?? "Unknown office"}
                    {item.practiceArea && ` · ${item.practiceArea.name}`}
                    {item.phone && ` · ${item.phone}`}
                    {" · "}
                    {new Date(item.createdAt).toLocaleString("en-KE")}
                  </p>
                </div>
                <StatusBadge tone={item.handledAt ? "success" : "pending"}>
                  {item.handledAt ? "Handled" : "Pending"}
                </StatusBadge>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-charcoal">{item.message}</p>
              {!item.handledAt && (
                <form action={markHandledAction.bind(null, item.id)} className="mt-3">
                  <button
                    type="submit"
                    className="text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    Mark handled
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
