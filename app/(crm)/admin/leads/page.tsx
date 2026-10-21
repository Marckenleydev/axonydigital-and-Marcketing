import LeadsManager from "@/components/admin/LeadsManager";

export const metadata = { title: "Leads · Axony CRM", robots: { index: false, follow: false } };

export default function LeadsPage() {
  return <LeadsManager />;
}
