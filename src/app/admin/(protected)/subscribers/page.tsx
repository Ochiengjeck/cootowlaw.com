import { adminListDigestSubscribers } from "@/lib/data/digest-subscribers";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LinkButton } from "@/components/admin/submit-button";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/admin/data-table";
import { MailIcon, DownloadIcon } from "@/lib/icons";
import { DeleteButton } from "./delete-button";

export default async function SubscribersPage() {
  const subscribers = await adminListDigestSubscribers();

  return (
    <div>
      <AdminPageHeader
        title="Digest Subscribers"
        description="Visitors who signed up for the Legal Digest on the public site."
        icon={<MailIcon className="h-5 w-5" />}
        action={
          <LinkButton href="/admin/subscribers/export" variant="secondary">
            <DownloadIcon className="h-4 w-4" /> Export CSV
          </LinkButton>
        }
      />

      <Table>
        <Thead>
          <tr>
            <Th>Email</Th>
            <Th>Subscribed</Th>
            <Th />
          </tr>
        </Thead>
        <tbody>
          {subscribers.map((s) => (
            <Tr key={s.id}>
              <Td className="font-medium">{s.email}</Td>
              <Td className="text-slate">{new Date(s.createdAt).toLocaleDateString("en-KE")}</Td>
              <Td className="text-right">
                <DeleteButton id={s.id} email={s.email} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {subscribers.length === 0 && <EmptyState>No subscribers yet.</EmptyState>}
    </div>
  );
}
