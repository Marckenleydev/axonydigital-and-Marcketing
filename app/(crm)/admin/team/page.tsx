import { notFound, redirect } from "next/navigation";
import TeamManager from "@/components/admin/TeamManager";
import { getActiveCrmUser } from "@/lib/server/authorization";

export const metadata = { title: "Team · Axony CRM", robots: { index: false, follow: false } };
export default async function TeamPage() {
  const user = await getActiveCrmUser();
  if (!user) redirect("/admin/login");
  if (user.role !== "administrator") notFound();
  return <TeamManager />;
}
