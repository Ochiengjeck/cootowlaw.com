import Link from "next/link";
import { adminListAttorneys } from "@/lib/data/attorneys";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { PeopleIcon, PencilIcon, PlusIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function AttorneysListPage() {
  const items = await adminListAttorneys();

  return (
    <div>
      <AdminPageHeader
        title="People"
        icon={<PeopleIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/attorneys/new">
            <PlusIcon className="h-4 w-4" /> New person
          </LinkButton>
        }
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
              <Td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/attorneys/${item.id}/edit`}
                    aria-label={`Edit ${item.name}`}
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
      {items.length === 0 && <EmptyState>No people yet.</EmptyState>}
    </div>
  );
}
