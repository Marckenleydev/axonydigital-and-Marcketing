import { redirect } from "next/navigation";
import TasksManager from "@/components/admin/TasksManager";
import { getActiveCrmUser } from "@/lib/server/authorization";

export const metadata = { title: "Tasks · Axony CRM", robots: { index: false, follow: false } };
export default async function TasksPage() {
  const user = await getActiveCrmUser();
  if (!user) redirect("/admin/login");
  return <TasksManager role={user.role} />;
}
