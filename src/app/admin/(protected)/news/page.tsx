import Link from "next/link";
import { adminListNewsPosts } from "@/lib/data/news";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { NewspaperIcon, PencilIcon, PlusIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function NewsListPage() {
  const items = await adminListNewsPosts();

  return (
    <div>
      <AdminPageHeader
        title="News"
        icon={<NewspaperIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/news/new">
            <PlusIcon className="h-4 w-4" /> New post
          </LinkButton>
        }
      />

      <Table>
        <Thead>
          <tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th>Published</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.title}</Td>
              <Td>
                <StatusBadge tone={item.publishedAt ? "success" : "pending"}>
                  {item.publishedAt ? "Published" : "Draft"}
                </StatusBadge>
              </Td>
              <Td className="text-slate">
                {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-KE") : "—"}
              </Td>
              <Td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/news/${item.id}/edit`}
                    aria-label={`Edit ${item.title}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50"
                  >
                    <PencilIcon className="h-4 w-4" /> Edit
                  </Link>
                  <DeleteButton id={item.id} slug={item.slug} />
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {items.length === 0 && <EmptyState>No news posts yet.</EmptyState>}
    </div>
  );
}
