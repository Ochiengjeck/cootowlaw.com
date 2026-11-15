import Link from "next/link";
import { adminListClients } from "@/lib/data/clients";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DeleteButton } from "./delete-button";

export default async function ClientsListPage() {
  const items = await adminListClients();

  return (
    <div>
      <AdminPageHeader
        title="Clientele"
        action={<LinkButton href="/admin/clients/new">New client</LinkButton>}
      />

      <Table>
        <Thead>
          <tr>
            <Th>Name</Th>
            <Th>Industry</Th>
            <Th>Order</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.name}</Td>
              <Td className="text-slate">{item.industry}</Td>
              <Td className="text-slate">{item.sortOrder}</Td>
              <Td className="space-x-3 text-right">
                <Link
                  href={`/admin/clients/${item.id}/edit`}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Edit
                </Link>
                <DeleteButton id={item.id} name={item.name} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {items.length === 0 && <EmptyState>No clients yet.</EmptyState>}
    </div>
  );
}
