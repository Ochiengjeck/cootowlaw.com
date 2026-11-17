import Link from "next/link";
import { adminListClients } from "@/lib/data/clients";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { HandshakeIcon, PencilIcon, PlusIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function ClientsListPage() {
  const items = await adminListClients();

  return (
    <div>
      <AdminPageHeader
        title="Clientele"
        icon={<HandshakeIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/clients/new">
            <PlusIcon className="h-4 w-4" /> New client
          </LinkButton>
        }
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
              <Td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/clients/${item.id}/edit`}
                    aria-label={`Edit ${item.name}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50"
                  >
                    <PencilIcon className="h-4 w-4" /> Edit
                  </Link>
                  <DeleteButton id={item.id} name={item.name} />
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {items.length === 0 && <EmptyState>No clients yet.</EmptyState>}
    </div>
  );
}
