import Link from "next/link";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DeleteButton } from "./delete-button";

export default async function AttorneysListPage() {
  const items = await adminListAttorneys();

  return (
    <div>
      <AdminPageHeader
        title="People"
        action={<LinkButton href="/admin/attorneys/new">New person</LinkButton>}
      />

      <Table>
        <Thead>
          <tr>
            <Th>Name</Th>
            <Th>Title</Th>
            <Th>Tier</Th>
            <Th>Status</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.name}</Td>
              <Td className="text-slate">{item.title}</Td>
              <Td className="capitalize text-slate">{item.tier}</Td>
              <Td>
                <StatusBadge tone={item.isActive ? "success" : "neutral"}>
                  {item.isActive ? "Active" : "Inactive"}
                </StatusBadge>
              </Td>
              <Td className="space-x-3 text-right">
                <Link
                  href={`/admin/attorneys/${item.id}/edit`}
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
      {items.length === 0 && <EmptyState>No people yet.</EmptyState>}
    </div>
  );
}
