import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { getActiveCrmUser } from "@/lib/server/authorization";
import NotificationInbox from "@/components/admin/NotificationInbox";

export default async function CrmLayout({ children }: { children: ReactNode }) {
  const user = await getActiveCrmUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-8">
        <div>
          <p className="font-semibold">Axony Digital CRM</p>
          <p className="mt-1 text-xs text-bone/50">{user.name} · {user.role.replaceAll("_", " ")}</p>
        </div>
        <nav aria-label="CRM navigation" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
          <a href="/admin" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Overview</a>
          <a href="/admin/reports" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Reports</a>
          <a href="/admin/leads" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Leads</a>
          <a href="/admin/clients" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Clients</a>
          <a href="/admin/projects" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Projects</a>
          <a href="/admin/tasks" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Tasks</a>
          {user.role === "administrator" && <a href="/admin/team" className="rounded-full px-4 py-2 text-sm text-bone/75 hover:bg-white/[0.08]">Team</a>}
        </nav>
        <div className="flex items-center gap-3"><NotificationInbox /><form action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}>
          <button type="submit" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-lime">
            Sign out
          </button>
        </form></div>
      </header>
      <main>{children}</main>
    </div>
  );
}
