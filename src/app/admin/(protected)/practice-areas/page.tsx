import Link from "next/link";
import { adminListPracticeAreas } from "@/lib/data/practice-areas";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { ScaleIcon, PencilIcon, PlusIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function PracticeAreasListPage() {
  const items = await adminListPracticeAreas();

  return (
    <div>
      <AdminPageHeader
        title="Practice Areas"
        icon={<ScaleIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/practice-areas/new">
            <PlusIcon className="h-4 w-4" /> New practice area
          </LinkButton>
        }
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
              <Td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/practice-areas/${item.id}/edit`}
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
      {items.length === 0 && <EmptyState>No practice areas yet.</EmptyState>}
    </div>
  );
}
