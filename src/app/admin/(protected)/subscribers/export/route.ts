import { adminListDigestSubscribers } from "@/lib/data/digest-subscribers";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const subscribers = await adminListDigestSubscribers();

  const rows = [
    ["Email", "Subscribed At"],
    ...subscribers.map((s) => [s.email, s.createdAt.toISOString()]),
  ];
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="digest-subscribers.csv"',
    },
  });
}
