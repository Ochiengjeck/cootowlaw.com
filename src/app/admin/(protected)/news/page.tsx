import Link from "next/link";
import { adminListNewsPosts } from "@/lib/data/news";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DeleteButton } from "./delete-button";

export default async function NewsListPage() {
  const items = await adminListNewsPosts();

  return (
    <div>
      <AdminPageHeader
        title="News"
        action={<LinkButton href="/admin/news/new">New post</LinkButton>}
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
              <Td className="space-x-3 text-right">
                <Link
                  href={`/admin/news/${item.id}/edit`}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Edit
                </Link>
                <DeleteButton id={item.id} slug={item.slug} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {items.length === 0 && <EmptyState>No news posts yet.</EmptyState>}
    </div>
  );
}
