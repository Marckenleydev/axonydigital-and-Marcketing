import { notFound, redirect } from "next/navigation";
import TaskDetail from "@/components/admin/TaskDetail";
import { getActiveCrmUser } from "@/lib/server/authorization";

export const metadata = { title: "Task · Axony CRM", robots: { index: false, follow: false } };
export default async function TaskPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getActiveCrmUser();
  if (!user) redirect("/admin/login");
  const { id } = await params;
  return /^[a-f\d]{24}$/i.test(id) ? <TaskDetail id={id} role={user.role} /> : notFound();
}
