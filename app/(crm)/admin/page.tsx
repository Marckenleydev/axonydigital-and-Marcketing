import ReportsView from "@/components/admin/ReportsView";
export const metadata = { title: "Overview · Axony CRM", robots: { index: false, follow: false } };
export default function AdminDashboardPage() { return <ReportsView mode="dashboard" />; }
