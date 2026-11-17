import { adminListContactSubmissions } from "@/lib/data/contact";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/data-table";
import { ChatBubbleIcon, CheckIcon } from "@/lib/icons";
import { markHandledAction } from "./actions";
import { ReplyForm } from "./reply-form";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function MessagesPage() {
  const items = await adminListContactSubmissions();
  const sorted = [...items].sort((a, b) => (a.handledAt ? 1 : 0) - (b.handledAt ? 1 : 0));

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Contact form submissions from the public site."
        icon={<ChatBubbleIcon className="h-5 w-5" />}
      />

      {sorted.length === 0 ? (
        <EmptyState>No messages yet.</EmptyState>
      ) : (
        <div className="space-y-4">
          {sorted.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm ${
                item.handledAt ? "border-border" : "border-l-4 border-l-gold-500 border-y-border border-r-border"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold text-white">
                    {initials(item.name)}
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">
                      {item.name}{" "}
                      <span className="font-normal text-slate">&lt;{item.email}&gt;</span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate">
                      {item.office?.name ?? "Unknown office"}
                      {item.practiceArea && ` · ${item.practiceArea.name}`}
                      {item.phone && ` · ${item.phone}`}
                      {" · "}
                      {new Date(item.createdAt).toLocaleString("en-KE")}
                    </p>
                  </div>
                </div>
                <StatusBadge tone={item.handledAt ? "success" : "pending"} dot>
                  {item.handledAt ? "Handled" : "Pending"}
                </StatusBadge>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-charcoal">{item.message}</p>
              {item.replyMessage && (
                <div className="mt-3 rounded-lg bg-alabaster p-3">
                  <p className="text-xs font-medium text-slate">
                    Replied {item.repliedAt && new Date(item.repliedAt).toLocaleString("en-KE")}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-charcoal">
                    {item.replyMessage}
                  </p>
                </div>
              )}
              <ReplyForm
                key={item.repliedAt?.toString() ?? "none"}
                id={item.id}
                recipientEmail={item.email}
                recipientName={item.name}
              />
              {!item.handledAt && (
                <form action={markHandledAction.bind(null, item.id)} className="mt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50"
                  >
                    <CheckIcon className="h-4 w-4" /> Mark handled (without emailing)
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
