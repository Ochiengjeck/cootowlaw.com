import Link from "next/link";
import { adminListCaseBriefs } from "@/lib/data/case-briefs";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DeleteButton } from "./delete-button";

export default async function CaseBriefsListPage() {
  const items = await adminListCaseBriefs();

  return (
    <div>
      <AdminPageHeader
        title="Landmark Briefs"
        action={<LinkButton href="/admin/cases/new">New brief</LinkButton>}
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
              <Td className="space-x-3 text-right">
                <Link
                  href={`/admin/cases/${item.id}/edit`}
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
      {items.length === 0 && <EmptyState>No landmark briefs yet.</EmptyState>}
    </div>
  );
}
