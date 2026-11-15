import Link from "next/link";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DeleteButton } from "./delete-button";

export default async function PracticeAreasListPage() {
  const items = await adminListPracticeAreas();

  return (
    <div>
      <AdminPageHeader
        title="Practice Areas"
        action={<LinkButton href="/admin/practice-areas/new">New practice area</LinkButton>}
      />

      <Table>
        <Thead>
          <tr>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Order</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.name}</Td>
              <Td className="text-slate">{item.slug}</Td>
              <Td className="text-slate">{item.sortOrder}</Td>
              <Td className="space-x-3 text-right">
                <Link
                  href={`/admin/practice-areas/${item.id}/edit`}
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
      {items.length === 0 && <EmptyState>No practice areas yet.</EmptyState>}
    </div>
  );
}
