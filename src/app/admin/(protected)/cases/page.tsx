import Link from "next/link";
import { adminListCaseBriefs } from "@/lib/data/case-briefs";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { BookOpenIcon, PencilIcon, PlusIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function CaseBriefsListPage() {
  const items = await adminListCaseBriefs();

  return (
    <div>
      <AdminPageHeader
        title="Landmark Briefs"
        icon={<BookOpenIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/cases/new">
            <PlusIcon className="h-4 w-4" /> New brief
          </LinkButton>
        }
      />

      <Table>
        <Thead>
          <tr>
            <Th>Title</Th>
            <Th>Court reference</Th>
            <Th>Year</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.title}</Td>
              <Td className="text-slate">{item.courtReference}</Td>
              <Td className="text-slate">{item.year ?? "—"}</Td>
              <Td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/cases/${item.id}/edit`}
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
      {items.length === 0 && <EmptyState>No landmark briefs yet.</EmptyState>}
    </div>
  );
}
