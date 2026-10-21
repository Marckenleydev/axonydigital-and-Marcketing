"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { LEAD_PRIORITIES, LEAD_SERVICES, LEAD_SOURCES, LEAD_STATUSES } from "@/lib/validation/leads";

type Owner = { _id: string; name: string; email: string; role: string };
type Activity = { type: string; details?: string; actorName?: string; createdAt: string };
type Lead = {
  _id: string; name: string; company?: string; email?: string; phone?: string; website?: string; industry?: string;
  source: (typeof LEAD_SOURCES)[number]; interestedServices: string[]; estimatedBudget?: string;
  status: (typeof LEAD_STATUSES)[number]; priority: (typeof LEAD_PRIORITIES)[number];
  assignedTo?: Owner | string; notes?: string; nextFollowUpAt?: string | null; lastContactAt?: string;
  archived: boolean; createdAt: string; updatedAt: string; inquiries?: { submittedName?: string; receivedAt: string; source: string; message?: string; estimatedBudget?: string }[]; activities?: Activity[];
  convertedClientId?: string | null;
};
type Conflict = { _id: string; submittedName: string; email?: string; phone?: string; website?: string; estimatedBudget?: string; message?: string; createdAt: string; matchedLeadIds: { _id: string; name: string; company?: string; status: string }[] };
type PageData = { leads: Lead[]; pagination: { page: number; limit: number; total: number; pages: number } };
const fieldClass = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-bone placeholder:text-bone/35 outline-none focus:border-lime";
const labelClass = "mb-1.5 block text-xs font-medium text-bone/60";

function dateLabel(value?: string | null) { return value ? new Date(value).toLocaleDateString() : "—"; }
function statusTone(status: string) {
  return status === "Won" ? "border-lime/30 bg-lime/10 text-lime" : status === "Lost" ? "border-red-300/20 bg-red-300/10 text-red-200" : "border-sky-300/20 bg-sky-300/10 text-sky-200";
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "The request could not be completed.");
  return data as T;
}

export default function LeadsManager() {
  const [pageData, setPageData] = useState<PageData>({ leads: [], pagination: { page: 1, limit: 25, total: 0, pages: 0 } });
  const [owners, setOwners] = useState<Owner[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "", source: "", priority: "", service: "", owner: "", archived: "false", sort: "createdAt", order: "desc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [editing, setEditing] = useState<Lead | null | "new">(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [canManage, setCanManage] = useState(false);
  const params = useMemo(() => {
    const searchParams = new URLSearchParams({ q: search, page: String(page), limit: "25", sort: filters.sort, order: filters.order, archived: filters.archived });
    for (const key of ["status", "source", "priority", "service"] as const) if (filters[key]) searchParams.set(key, filters[key]);
    if (filters.owner) searchParams.set("owner", filters.owner);
    return searchParams;
  }, [filters, page, search]);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await requestJson<PageData>(`/api/crm/leads?${params}`);
      setPageData(data);
      setSelected((current) => current ? data.leads.find((lead) => lead._id === current._id) ?? current : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load leads."); }
    finally { setLoading(false); }
  }, [params]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    void Promise.all([
      requestJson<{ owners: Owner[] }>("/api/crm/leads/owners").then(({ owners: list }) => { setOwners(list); setCanManage(true); }).catch(() => setCanManage(false)),
      requestJson<{ conflicts: Conflict[] }>("/api/crm/leads/conflicts").then(({ conflicts: items }) => setConflicts(items)).catch(() => undefined),
    ]);
  }, []);
  useEffect(() => { const timer = window.setTimeout(() => { setSearch(query.trim()); setPage(1); }, 250); return () => window.clearTimeout(timer); }, [query]);

  async function showDetail(id: string) {
    setError("");
    try { const data = await requestJson<{ lead: Lead }>(`/api/crm/leads/${id}`); setSelected(data.lead); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load this lead."); }
  }

  async function saveLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.interestedServices = form.getAll("interestedServices").map(String);
    payload.nextFollowUpAt = payload.nextFollowUpAt ? new Date(String(payload.nextFollowUpAt)).toISOString() : null;
    for (const key of Object.keys(payload)) if (payload[key] === "" && key !== "assignedTo") delete payload[key];
    try {
      const path = editing === "new" ? "/api/crm/leads" : `/api/crm/leads/${(editing as Lead)._id}`;
      const data = await requestJson<{ lead?: Lead; leadId?: string }>(path, { method: editing === "new" ? "POST" : "PATCH", body: JSON.stringify(payload) });
      setEditing(null); setNotice(editing === "new" ? "Lead created." : "Lead updated.");
      await load();
      if (data.lead) await showDetail(data.lead._id);
      else if (data.leadId) await showDetail(data.leadId);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save lead."); }
  }

  async function archiveLead(lead: Lead) {
    if (!window.confirm(`Archive ${lead.name}? It will remain in the CRM history.`)) return;
    try {
      if (lead.archived) {
        await requestJson(`/api/crm/leads/${lead._id}`, { method: "PATCH", body: JSON.stringify({ archived: false }) });
        setNotice("Lead restored.");
      } else {
        await requestJson(`/api/crm/leads/${lead._id}`, { method: "DELETE" });
        setNotice("Lead archived.");
      }
      setSelected(null); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not archive lead."); }
  }

  async function reviewConflict(conflict: Conflict, status: "resolved" | "dismissed") {
    try {
      await requestJson(`/api/crm/leads/conflicts/${conflict._id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      setConflicts((items) => items.filter((item) => item._id !== conflict._id));
      setNotice(status === "resolved" ? "Conflict marked reviewed." : "Conflict dismissed.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update conflict."); }
  }

  async function convertLead(lead: Lead) {
    if (!window.confirm(`Convert ${lead.name} to a client? The lead and its timeline will be preserved.`)) return;
    try {
      const result = await requestJson<{ clientId: string; alreadyConverted?: boolean }>(`/api/crm/leads/${lead._id}/convert`, { method: "POST" });
      setNotice(result.alreadyConverted ? "This lead was already converted." : "Lead converted to client.");
      await load(); await showDetail(lead._id);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not convert lead."); }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-7 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow text-lime">Pipeline</p><h1 className="display mt-2 text-4xl md:text-5xl">Leads</h1><p className="mt-2 text-sm text-bone/50">Search, qualify, and follow up with prospects.</p></div>
        {canManage && <button onClick={() => setEditing("new")} className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink hover:brightness-110">+ Add lead</button>}
      </div>
      {notice && <p role="status" className="mt-5 rounded-xl border border-lime/20 bg-lime/5 px-4 py-3 text-sm text-lime">{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl border border-red-300/20 bg-red-300/5 px-4 py-3 text-sm text-red-200">{error}</p>}

      {conflicts.length > 0 && <section className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/[0.04] p-5">
        <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-amber-100">Duplicate contact conflicts <span className="ml-1 text-xs text-amber-100/60">{conflicts.length}</span></h2><span className="text-xs text-bone/40">Admin and manager review</span></div>
        <div className="space-y-3">{conflicts.map((conflict) => <article key={conflict._id} className="grid gap-4 rounded-xl border border-white/10 bg-black/10 p-4 md:grid-cols-[1fr_auto]">
          <div><p className="font-medium">New inquiry from {conflict.submittedName}</p><p className="mt-1 text-xs text-bone/45">Contact fields match different leads · {dateLabel(conflict.createdAt)}</p><div className="mt-3 flex flex-wrap gap-2">{conflict.matchedLeadIds.map((lead) => <button key={lead._id} onClick={() => void showDetail(lead._id)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-bone/70 hover:border-lime">{lead.name}{lead.company ? ` · ${lead.company}` : ""}</button>)}</div></div>
          <div className="flex items-center gap-2"><button onClick={() => void reviewConflict(conflict, "resolved")} className="rounded-full border border-lime/30 px-3 py-2 text-xs text-lime">Reviewed</button><button onClick={() => void reviewConflict(conflict, "dismissed")} className="rounded-full border border-white/10 px-3 py-2 text-xs text-bone/55">Dismiss</button></div>
        </article>)}</div>
      </section>}

      <section className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="grid gap-3 border-b border-white/10 p-4 md:grid-cols-6">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, company, email, phone" aria-label="Search leads" className={`${fieldClass} md:col-span-2`} />
          <select aria-label="Filter status" value={filters.status} onChange={(event) => { setFilters({ ...filters, status: event.target.value }); setPage(1); }} className={fieldClass}><option value="">All statuses</option>{LEAD_STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select aria-label="Filter source" value={filters.source} onChange={(event) => { setFilters({ ...filters, source: event.target.value }); setPage(1); }} className={fieldClass}><option value="">All sources</option>{LEAD_SOURCES.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select aria-label="Filter priority" value={filters.priority} onChange={(event) => { setFilters({ ...filters, priority: event.target.value }); setPage(1); }} className={fieldClass}><option value="">All priorities</option>{LEAD_PRIORITIES.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select aria-label="Filter service" value={filters.service} onChange={(event) => { setFilters({ ...filters, service: event.target.value }); setPage(1); }} className={fieldClass}><option value="">All services</option>{LEAD_SERVICES.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          {canManage && <select aria-label="Filter owner" value={filters.owner} onChange={(event) => { setFilters({ ...filters, owner: event.target.value }); setPage(1); }} className={fieldClass}><option value="">All owners</option>{owners.map((owner) => <option key={owner._id} value={owner._id}>{owner.name}</option>)}</select>}
          <select aria-label="Show archived leads" value={filters.archived} onChange={(event) => { setFilters({ ...filters, archived: event.target.value }); setPage(1); }} className={fieldClass}><option value="false">Active leads</option><option value="true">Archived leads</option></select>
          <select aria-label="Sort leads" value={`${filters.sort}:${filters.order}`} onChange={(event) => { const [sort, order] = event.target.value.split(":"); setFilters({ ...filters, sort, order }); }} className={fieldClass}><option value="createdAt:desc">Newest first</option><option value="createdAt:asc">Oldest first</option><option value="name:asc">Name A–Z</option><option value="nextFollowUpAt:asc">Next follow-up</option><option value="priority:desc">Priority</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm"><thead className="text-xs uppercase tracking-wider text-bone/40"><tr><th className="px-5 py-4 font-medium">Lead</th><th className="px-4 py-4 font-medium">Status</th><th className="px-4 py-4 font-medium">Source</th><th className="px-4 py-4 font-medium">Services</th><th className="px-4 py-4 font-medium">Owner</th><th className="px-4 py-4 font-medium">Follow-up</th><th className="px-4 py-4 font-medium">Added</th></tr></thead>
            <tbody className="divide-y divide-white/[0.06]">{pageData.leads.map((lead) => <tr key={lead._id} role="button" tabIndex={0} aria-label={`Open lead ${lead.name}`} className={`cursor-pointer transition hover:bg-white/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime ${selected?._id === lead._id ? "bg-white/[0.04]" : ""}`} onClick={() => void showDetail(lead._id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); void showDetail(lead._id); } }}>
              <td className="px-5 py-4"><p className="font-medium">{lead.name}</p><p className="mt-1 text-xs text-bone/40">{lead.company || lead.email || lead.phone || "—"}</p></td><td className="px-4 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs ${statusTone(lead.status)}`}>{lead.status}</span></td><td className="px-4 py-4 text-bone/65">{lead.source}</td><td className="px-4 py-4 text-xs text-bone/55">{lead.interestedServices?.join(", ") || "—"}</td><td className="px-4 py-4 text-bone/65">{typeof lead.assignedTo === "object" ? lead.assignedTo?.name : "Unassigned"}</td><td className="px-4 py-4 text-bone/65">{dateLabel(lead.nextFollowUpAt)}</td><td className="px-4 py-4 text-bone/45">{dateLabel(lead.createdAt)}</td>
            </tr>)}</tbody></table>
          {loading ? <p className="px-5 py-12 text-center text-sm text-bone/45">Loading leads…</p> : pageData.leads.length === 0 ? <div className="px-5 py-14 text-center"><p className="font-medium">No leads found</p><p className="mt-1 text-sm text-bone/45">Try another search or adjust the filters.</p></div> : null}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-bone/45"><span>{pageData.pagination.total} lead{pageData.pagination.total === 1 ? "" : "s"}</span><div className="flex items-center gap-3"><span>Page {pageData.pagination.pages ? page : 0} of {pageData.pagination.pages}</span><button disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-full border border-white/10 px-3 py-1.5 disabled:opacity-30">Previous</button><button disabled={page >= pageData.pagination.pages} onClick={() => setPage((value) => value + 1)} className="rounded-full border border-white/10 px-3 py-1.5 disabled:opacity-30">Next</button></div></div>
      </section>

      {selected && <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto border-l border-white/10 bg-ink p-5 shadow-2xl md:p-8" aria-label="Lead details">
        <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-lime">Lead detail</p><h2 className="display mt-2 text-3xl">{selected.name}</h2><p className="mt-1 text-sm text-bone/50">{selected.company || "Individual prospect"}</p></div><button aria-label="Close lead details" onClick={() => setSelected(null)} className="rounded-full border border-white/15 px-3 py-2 text-sm text-bone/60">Close</button></div>
        <div className="mt-6 flex flex-wrap items-center gap-2"><span className={`rounded-full border px-3 py-1.5 text-xs ${statusTone(selected.status)}`}>{selected.status}</span><span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-bone/65">{selected.priority} priority</span><span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-bone/65">{selected.source}</span></div>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm"><div><dt className="text-xs text-bone/40">Email</dt><dd className="mt-1 break-all">{selected.email || "—"}</dd></div><div><dt className="text-xs text-bone/40">Phone</dt><dd className="mt-1">{selected.phone || "—"}</dd></div><div><dt className="text-xs text-bone/40">Website</dt><dd className="mt-1 break-all">{selected.website || "—"}</dd></div><div><dt className="text-xs text-bone/40">Budget</dt><dd className="mt-1">{selected.estimatedBudget || "—"}</dd></div><div><dt className="text-xs text-bone/40">Follow-up</dt><dd className="mt-1">{dateLabel(selected.nextFollowUpAt)}</dd></div><div><dt className="text-xs text-bone/40">Last contact</dt><dd className="mt-1">{dateLabel(selected.lastContactAt)}</dd></div><div><dt className="text-xs text-bone/40">Assigned to</dt><dd className="mt-1">{typeof selected.assignedTo === "object" ? selected.assignedTo?.name : "Unassigned"}</dd></div><div className="col-span-2"><dt className="text-xs text-bone/40">Interested services</dt><dd className="mt-1">{selected.interestedServices?.join(", ") || "—"}</dd></div></dl>
        {selected.notes && <div className="mt-5"><h3 className="text-xs uppercase tracking-wider text-bone/40">Internal notes</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-bone/75">{selected.notes}</p></div>}
        {selected.convertedClientId && <p className="mt-5 text-sm text-lime">Converted to client · <a className="underline" href={`/admin/clients/${selected.convertedClientId}`}>View client</a></p>}
        {canManage && <div className="mt-6 flex flex-wrap gap-2"><button onClick={() => setEditing(selected)} className="rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-ink">Edit lead</button>{["Qualified", "Won"].includes(selected.status) && !selected.convertedClientId && <button onClick={() => void convertLead(selected)} className="rounded-full border border-lime/30 px-4 py-2.5 text-sm text-lime">Convert to client</button>}<button onClick={() => void archiveLead(selected)} className="rounded-full border border-red-300/20 px-4 py-2.5 text-sm text-red-200">{selected.archived ? "Restore" : "Archive"}</button></div>}
          <section className="mt-8"><h3 className="font-semibold">Activity timeline</h3><ol className="mt-4 space-y-4 border-l border-white/10 pl-4">{[...(selected.activities || [])].reverse().map((activity, index) => <li key={`${activity.createdAt}-${index}`} className="relative"><span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-lime"/><p className="text-sm">{activity.details || activity.type.replaceAll("_", " ")}</p><p className="mt-1 text-xs text-bone/40">{activity.actorName ? `${activity.actorName} · ` : ""}{new Date(activity.createdAt).toLocaleString()}</p></li>)}{(selected.inquiries || []).map((inquiry, index) => <li key={`inquiry-${index}`} className="relative"><span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-sky-300"/><p className="text-sm">Website inquiry{inquiry.submittedName ? ` from ${inquiry.submittedName}` : ""}{inquiry.estimatedBudget ? ` · ${inquiry.estimatedBudget}` : ""}</p>{inquiry.message && <p className="mt-1 text-xs text-bone/55">{inquiry.message}</p>}<p className="mt-1 text-xs text-bone/40">{new Date(inquiry.receivedAt).toLocaleString()}</p></li>)}</ol></section>
      </aside>}

      {editing !== null && <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/70 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(null); }}><section role="dialog" aria-modal="true" aria-labelledby="lead-form-heading" className="my-5 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-ink p-6 shadow-2xl md:p-8"><div className="flex justify-between"><div><p className="eyebrow text-lime">Lead record</p><h2 id="lead-form-heading" className="display mt-2 text-3xl">{editing === "new" ? "Add a lead" : "Edit lead"}</h2></div><button onClick={() => setEditing(null)} className="text-sm text-bone/45">Close</button></div>
        <form onSubmit={saveLead} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm"><span className={labelClass}>Name *</span><input name="name" required minLength={2} maxLength={120} defaultValue={editing === "new" ? "" : editing.name} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Company</span><input name="company" maxLength={160} defaultValue={editing === "new" ? "" : editing.company || ""} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Email</span><input name="email" type="email" maxLength={254} defaultValue={editing === "new" ? "" : editing.email || ""} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Phone</span><input name="phone" type="tel" defaultValue={editing === "new" ? "" : editing.phone || ""} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Website</span><input name="website" defaultValue={editing === "new" ? "" : editing.website || ""} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Industry</span><input name="industry" defaultValue={editing === "new" ? "" : editing.industry || ""} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Source</span><select name="source" defaultValue={editing === "new" ? "Other" : editing.source} className={fieldClass}>{LEAD_SOURCES.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-sm"><span className={labelClass}>Estimated budget</span><input name="estimatedBudget" defaultValue={editing === "new" ? "" : editing.estimatedBudget || ""} className={fieldClass}/></label>
          <label className="text-sm"><span className={labelClass}>Status</span><select name="status" defaultValue={editing === "new" ? "New" : editing.status} className={fieldClass}>{LEAD_STATUSES.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-sm"><span className={labelClass}>Priority</span><select name="priority" defaultValue={editing === "new" ? "Normal" : editing.priority} className={fieldClass}>{LEAD_PRIORITIES.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-sm"><span className={labelClass}>Assigned team member</span><select name="assignedTo" defaultValue={editing === "new" ? "" : typeof editing.assignedTo === "object" ? editing.assignedTo?._id || "" : editing.assignedTo || ""} className={fieldClass}><option value="">Unassigned</option>{owners.map((owner) => <option key={owner._id} value={owner._id}>{owner.name} · {owner.role.replaceAll("_", " ")}</option>)}</select></label>
          <label className="text-sm"><span className={labelClass}>Next follow-up</span><input name="nextFollowUpAt" type="date" defaultValue={editing === "new" || !editing.nextFollowUpAt ? "" : new Date(editing.nextFollowUpAt).toISOString().slice(0, 10)} className={fieldClass}/></label>
          <fieldset className="md:col-span-2"><legend className={labelClass}>Interested services</legend><div className="grid gap-2 sm:grid-cols-2">{LEAD_SERVICES.map((service) => <label key={service} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs text-bone/70"><input type="checkbox" name="interestedServices" value={service} defaultChecked={editing !== "new" && editing.interestedServices?.includes(service)} className="accent-lime"/>{service}</label>)}</div></fieldset>
          <label className="text-sm md:col-span-2"><span className={labelClass}>Internal notes</span><textarea name="notes" rows={4} maxLength={10000} defaultValue={editing === "new" ? "" : editing.notes || ""} className={fieldClass}/></label>
          <div className="flex justify-end gap-2 md:col-span-2"><button type="button" onClick={() => setEditing(null)} className="rounded-full border border-white/10 px-5 py-3 text-sm text-bone/60">Cancel</button><button className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink">Save lead</button></div>
        </form>
      </section></div>}
    </div>
  );
}
