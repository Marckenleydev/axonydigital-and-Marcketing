"use client";

import { useEffect, useMemo, useState } from "react";

type CountRow = { month?: string; service?: string; count: number };
type ReportData = {
  range: { from: string; toExclusive: string; timezone: string };
  definitions: Record<string, string>;
  kpis: { totalLeads: number; newLeads: number; convertedLeads: number; conversionRate: number | null; activeClients: number; activeProjects: number; completedTasks: number; pendingTasks: number; overdueTasks: number; overdueFollowUps: number };
  leadsByStatus: Record<string, number>; projectsByStatus: Record<string, number>; tasksByStatus: Record<string, number>; tasksByPriority: Record<string, number>;
  leadsOverTime: CountRow[]; leadsBySource: Record<string, number>; servicesInterest: { service: string; count: number }[];
  projectProgress: { count: number; average: number | null };
  duplicateConflicts: { leads: number; conversions: number };
  upcomingTasks: { _id: string; title: string; status: string; priority: string; dueDate: string; assignee?: { name: string } }[];
  upcomingFollowUps: { _id: string; name: string; company?: string; status: string; nextFollowUpAt: string }[];
  recentActivity: { recordId: string; recordName: string; recordType: string; eventType: string; actorName?: string; createdAt: string; href: string }[];
  teamWorkload: { userId?: string | null; name?: string; assigned: number; completed: number; overdue: number }[];
};

const control = "rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-bone outline-none focus:border-lime";
const panel = "rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-6";
function formatLabel(value: string) { return value.replaceAll("_", " "); }
function formatUtc(value: string) { return new Date(value).toLocaleString("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }); }
function CountBars({ title, values, empty = "No records in this range." }: { title: string; values: Record<string, number>; empty?: string }) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])); const max = Math.max(0, ...entries.map(([, count]) => count));
  return <section className={panel}><h2 className="font-medium">{title}</h2>{entries.length ? <div role="img" aria-label={`${title} bar chart`} className="mt-5 space-y-4">{entries.map(([label, count]) => <div key={label}><div className="mb-1 flex justify-between gap-4 text-sm"><span className="capitalize text-bone/75">{formatLabel(label)}</span><span className="tabular-nums text-bone/55">{count}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-sky" style={{ width: `${max ? (count / max) * 100 : 0}%` }}/></div></div>)}</div> : <p className="mt-5 text-sm text-bone/45">{empty}</p>}<ul className="sr-only">{entries.map(([label, count]) => <li key={label}>{formatLabel(label)}: {count}</li>)}</ul></section>;
}
function TrendChart({ rows }: { rows: CountRow[] }) {
  const maximum = Math.max(1, ...rows.map((item) => item.count));
  return <section className={panel}><div><h2 className="font-medium">Leads created over time</h2><p className="mt-1 text-xs text-bone/45">Monthly totals within the selected date range (UTC).</p></div>{rows.length ? <div role="img" aria-label="Monthly lead creation bar chart" className="mt-6 flex min-h-48 items-end gap-2 overflow-x-auto border-b border-white/10 pb-2">{rows.map((row) => <div key={row.month} className="flex min-w-8 flex-1 flex-col items-center justify-end gap-2"><span className="text-xs tabular-nums text-bone/60">{row.count}</span><div className="w-full max-w-12 rounded-t-md bg-violet" style={{ height: `${Math.max(3, (row.count / maximum) * 132)}px` }}/><span className="text-[10px] text-bone/45">{row.month?.slice(2)}</span></div>)}</div> : <p className="mt-5 text-sm text-bone/45">No leads in this range.</p>}<ul className="sr-only">{rows.map((row) => <li key={row.month}>{row.month}: {row.count} leads</li>)}</ul></section>;
}

export default function ReportsView({ mode }: { mode: "dashboard" | "reports" }) {
  const [data, setData] = useState<ReportData | null>(null); const [from, setFrom] = useState(""); const [to, setTo] = useState(""); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError(""); setData(null);
      try {
        const params = new URLSearchParams(); if (from) params.set("from", from); if (to) params.set("to", to);
        const response = await fetch(`/api/crm/reports${params.size ? `?${params}` : ""}`);
        const result = await response.json(); if (!response.ok) throw new Error(result.error || "Could not load reports.");
        if (!cancelled) { setData(result); if (!from && !to) { setFrom(result.range.from); const end = new Date(`${result.range.toExclusive}T00:00:00Z`); end.setUTCDate(end.getUTCDate() - 1); setTo(end.toISOString().slice(0, 10)); } }
      } catch (reason) { if (!cancelled) setError(reason instanceof Error ? reason.message : "Could not load reports."); }
      finally { if (!cancelled) setLoading(false); }
    }
    void load(); return () => { cancelled = true; };
  }, [from, to]);
  const projectCounts = useMemo(() => data?.projectsByStatus ?? {}, [data]);
  const taskCounts = useMemo(() => data?.tasksByStatus ?? {}, [data]);
  const cards = data ? [
    ["Total leads", data.kpis.totalLeads, "Current non-archived accessible leads"],
    ["New leads", data.kpis.newLeads, "Created in the selected date range"],
    ["Lead conversion", data.kpis.conversionRate === null ? "—" : `${data.kpis.conversionRate}%`, `${data.kpis.convertedLeads} converted from a ${data.kpis.newLeads}-lead cohort`],
    ["Active clients", data.kpis.activeClients, "Current active accounts"],
    ["Active projects", data.kpis.activeProjects, "Planning, in progress, on hold, or review"],
    ["Pending tasks", data.kpis.pendingTasks, "Current tasks not completed"],
    ["Overdue tasks", data.kpis.overdueTasks, "Incomplete tasks past due"],
    ["Completed tasks", data.kpis.completedTasks, "Completed during selected dates"],
  ] : [];
  return <section className="mx-auto max-w-7xl space-y-8 px-5 py-10 md:px-8">
    <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.3em] text-lime">Axony Digital CRM</p><h1 className="mt-2 text-4xl font-semibold">{mode === "dashboard" ? "Overview" : "Reports"}</h1><p className="mt-2 max-w-2xl text-sm text-bone/55">{mode === "dashboard" ? "A current view of your pipeline, client work, and next actions." : "Sales, marketing, delivery, and workload metrics from CRM records."}</p></div><form className="flex flex-wrap items-end gap-3" onSubmit={(event) => event.preventDefault()}><label className="text-xs text-bone/50">From<input aria-label="Report start date" type="date" required value={from} onChange={(event) => setFrom(event.target.value)} className={`${control} mt-1 block`}/></label><label className="text-xs text-bone/50">Through<input aria-label="Report end date" type="date" required value={to} onChange={(event) => setTo(event.target.value)} className={`${control} mt-1 block`}/></label><span className="text-xs text-bone/40">Date changes reload the report.</span></form></header>
    <p className="-mt-5 text-xs text-bone/40">Date range includes both selected calendar days, evaluated in UTC. Default: trailing 365 days. {data ? `Current range: ${data.range.from} through ${new Date(new Date(`${data.range.toExclusive}T00:00:00Z`).getTime() - 86400000).toISOString().slice(0, 10)} UTC.` : ""}</p>
    {error && <p role="alert" className="rounded-xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100">{error}</p>}
    {loading && !data ? <div role="status" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className={`${panel} h-28 animate-pulse`}><span className="sr-only">Loading dashboard</span></div>)}</div> : data ? <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, hint]) => <article key={String(label)} className={panel}><p className="text-sm text-bone/55">{label}</p><p className="mt-3 text-3xl font-semibold tabular-nums">{value}</p><p className="mt-2 text-xs text-bone/40">{hint}</p></article>)}</div>
      <div className="grid gap-5 xl:grid-cols-2"><CountBars title="Lead pipeline · current" values={data.leadsByStatus}/><TrendChart rows={data.leadsOverTime}/></div>
      {mode === "reports" && <div className="grid gap-5 xl:grid-cols-2"><CountBars title="Lead sources · selected dates" values={data.leadsBySource} empty="No source data was recorded for this range."/><CountBars title="Interested services · selected dates" values={Object.fromEntries(data.servicesInterest.map((item) => [item.service, item.count]))} empty="No service-interest data was recorded for this range."/><CountBars title="Projects by status · current" values={projectCounts}/><CountBars title="Tasks by status · current" values={taskCounts}/><CountBars title="Tasks by priority · current" values={data.tasksByPriority}/><section className={panel}><h2 className="font-medium">Project progress</h2>{data.projectProgress.average === null ? <p className="mt-4 text-sm text-bone/45">No active projects have progress data.</p> : <><p className="mt-4 text-3xl font-semibold">{data.projectProgress.average}%</p><p className="mt-1 text-sm text-bone/45">Average recorded progress across {data.projectProgress.count} non-archived projects.</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-sky" style={{ width: `${data.projectProgress.average}%` }}/></div></>}</section><section className={panel}><h2 className="font-medium">Lead conflicts · selected dates</h2><div className="mt-5 grid grid-cols-2 gap-4"><div><p className="text-xs text-bone/45">Pending duplicate inquiries</p><p className="mt-2 text-2xl">{data.duplicateConflicts.leads}</p></div><div><p className="text-xs text-bone/45">Pending conversion conflicts</p><p className="mt-2 text-2xl">{data.duplicateConflicts.conversions}</p></div></div><p className="mt-4 text-xs text-bone/40">Only unresolved conflicts created in the selected range.</p></section><section className={panel}><h2 className="font-medium">Team workload</h2>{data.teamWorkload.length ? <div className="mt-4 space-y-3">{data.teamWorkload.map((member) => <div key={member.userId ?? "self"} className="flex flex-wrap justify-between gap-2 border-b border-white/5 pb-3 text-sm"><span>{member.name || "Your assigned work"}</span><span className="text-bone/55">{member.assigned} assigned · {member.completed} completed · {member.overdue} overdue</span></div>)}</div> : <p className="mt-4 text-sm text-bone/45">No task assignments in this scope.</p>}</section></div>}
      <div className="grid gap-5 xl:grid-cols-2"><section className={panel}><h2 className="font-medium">Upcoming tasks</h2>{data.upcomingTasks.length ? <ul className="mt-4 divide-y divide-white/5">{data.upcomingTasks.map((task) => <li key={task._id} className="flex justify-between gap-4 py-3 text-sm"><a href={`/admin/tasks/${task._id}`} className="hover:text-lime">{task.title}<span className="mt-1 block text-xs text-bone/45">{task.status} · {task.priority}{task.assignee?.name ? ` · ${task.assignee.name}` : ""}</span></a><time className="shrink-0 text-right text-xs text-bone/50">{formatUtc(task.dueDate)}</time></li>)}</ul> : <p className="mt-4 text-sm text-bone/45">No incomplete tasks are due in the next seven days.</p>}</section><section className={panel}><h2 className="font-medium">Upcoming follow-ups</h2>{data.upcomingFollowUps.length ? <ul className="mt-4 divide-y divide-white/5">{data.upcomingFollowUps.map((lead) => <li key={lead._id} className="flex justify-between gap-4 py-3 text-sm"><span>{lead.name}<span className="mt-1 block text-xs text-bone/45">{lead.company || lead.status}</span></span><time className="shrink-0 text-right text-xs text-bone/50">{formatUtc(lead.nextFollowUpAt)}</time></li>)}</ul> : <p className="mt-4 text-sm text-bone/45">No follow-ups are scheduled in the next seven days. {data.kpis.overdueFollowUps} are overdue.</p>}</section></div>
      <section className={panel}><h2 className="font-medium">Recent activity</h2>{data.recentActivity.length ? <ul className="mt-3 divide-y divide-white/5">{data.recentActivity.map((activity, index) => <li key={`${activity.recordId}-${activity.createdAt}-${index}`} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><a href={activity.href} className="hover:text-lime"><span className="capitalize">{formatLabel(activity.eventType)}</span> · {activity.recordName} <span className="text-xs text-bone/40">({activity.recordType})</span><span className="mt-1 block text-xs text-bone/45">{activity.actorName || "CRM"}</span></a><time className="text-xs text-bone/45">{formatUtc(activity.createdAt)}</time></li>)}</ul> : <p className="mt-4 text-sm text-bone/45">No activity has been recorded yet.</p>}</section>
      {mode === "dashboard" && <p className="text-xs leading-relaxed text-bone/35">{data.definitions.conversionRate} {data.definitions.completedTasks} {data.definitions.overdueTasks}</p>}
    </> : !error ? <p className={`${panel} text-sm text-bone/45`}>No report data is available.</p> : null}
  </section>;
}
