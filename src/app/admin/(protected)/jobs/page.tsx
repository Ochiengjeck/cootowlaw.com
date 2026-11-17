import Link from "next/link";
import { adminListJobPostings } from "@/lib/data/job-postings";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { DeleteButton } from "./delete-button";

export default async function JobPostingsListPage() {
  const items = await adminListJobPostings();

  return (
    <div>
      <AdminPageHeader
        title="Job Postings"
        action={<LinkButton href="/admin/jobs/new">New posting</LinkButton>}
      />

      <Table>
        <Thead>
          <tr>
            <Th>Title</Th>
            <Th>Location</Th>
            <Th>Status</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td className="font-medium">{item.title}</Td>
              <Td className="text-slate">{item.location}</Td>
              <Td>
                <StatusBadge tone={item.isOpen ? "success" : "neutral"}>
                  {item.isOpen ? "Open" : "Closed"}
                </StatusBadge>
              </Td>
              <Td className="space-x-3 text-right">
                <Link
                  href={`/admin/jobs/${item.id}/edit`}
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
      {items.length === 0 && <EmptyState>No job postings yet.</EmptyState>}
    </div>
  );
}
