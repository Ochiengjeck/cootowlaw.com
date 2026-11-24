import Link from "next/link";
import { adminListDownloads } from "@/lib/data/downloads";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DownloadIcon, PencilIcon, PlusIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function DownloadsListPage() {
  const items = await adminListDownloads();

  return (
    <div>
      <AdminPageHeader
        title="Downloads"
        icon={<DownloadIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/downloads/new">
            <PlusIcon className="h-4 w-4" /> New download
          </LinkButton>
        }
      />

      <Table>
        <Thead>
          <tr>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.title}</Td>
              <Td className="text-slate">{item.category}</Td>
              <Td>
                <StatusBadge tone={item.publishedAt ? "success" : "pending"}>
                  {item.publishedAt ? "Published" : "Draft"}
                </StatusBadge>
              </Td>
              <Td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/downloads/${item.id}/edit`}
                    aria-label={`Edit ${item.title}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50"
                  >
                    <PencilIcon className="h-4 w-4" /> Edit
                  </Link>
                  <DeleteButton id={item.id} title={item.title} />
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {items.length === 0 && <EmptyState>No downloads yet.</EmptyState>}
    </div>
  );
}
