/* ════════════════════════════════════════════
   LEADS SECTION
   Manages leads pipeline
════════════════════════════════════════════ */

import { useState } from "react";
import type { Lead } from "../types";
import { T, SERVICES, LEAD_STATUSES, INDUSTRIES, BUDGETS, SOURCES, MOCK_LEADS } from "../constants";
import { FormInput, FormSelect, FormTextarea, SaveButton, DeleteButton, EditButton, StatCard, EmptyState, Row, TwoColumnLayout, StatusPill, ServiceTag } from "./ui";

export function LeadsSection() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [form, setForm] = useState<Partial<Lead>>({ status: "New", service: "Web Development" });
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(false);

  const updateForm = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const filtered = filter === "All" ? leads : leads.filter((l) => l.status === filter);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setLeads((ls) => ls.map((l) => (l._id === editing ? { ...l, ...form } as Lead : l)));
      setEditing(null);
    } else {
      setLeads((ls) => [...ls, { ...form, _id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] } as Lead]);
    }
    setForm({ status: "New", service: "Web Development" });
  };

  const deleteLead = (id: string) => {
    if (confirm("Delete this lead?")) setLeads((ls) => ls.filter((l) => l._id !== id));
  };

  const editLead = (lead: Lead) => {
    setForm(lead);
    setEditing(lead._id || null);
  };

  const wonCount = leads.filter((l) => l.status === "Won").length;
  const qualCount = leads.filter((l) => l.status === "Qualified").length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: `${T.sand}20`, marginBottom: 0, borderBottom: `1px solid ${T.sand}25` }}>
        <StatCard value={leads.length.toString()} label="Total Leads" />
        <StatCard value={qualCount.toString()} label="Qualified" sub="Ready for proposal" />
        <StatCard value={wonCount.toString()} label="Won" sub="Converted to clients" />
        <StatCard value={`${leads.length ? Math.round((wonCount / leads.length) * 100) : 0}%`} label="Win Rate" />
      </div>

      {/* Filter strip */}
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.sand}25`, background: T.creamDark }}>
        {["All", ...LEAD_STATUSES].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "10px 18px",
              background: "transparent",
              border: "none",
              borderBottom: filter === status ? `2px solid ${T.amber}` : "2px solid transparent",
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: filter === status ? T.amber : `${T.ink}40`,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {status} {status !== "All" && <span style={{ opacity: 0.5 }}>({leads.filter((l) => l.status === status).length})</span>}
          </button>
        ))}
      </div>

      <TwoColumnLayout
        form={
          <form onSubmit={save}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ width: 24, height: 1, background: T.amber, display: "block" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                {editing ? "Edit Lead" : "New Lead"}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormInput label="Name *" placeholder="Sara Mendes" value={form.name || ""} onChange={(e) => updateForm("name", e.target.value)} required />
              <FormInput label="Company" placeholder="Bloom Studio" value={form.company || ""} onChange={(e) => updateForm("company", e.target.value)} />
            </div>
            <FormInput label="Email *" type="email" placeholder="sara@bloom.io" value={form.email || ""} onChange={(e) => updateForm("email", e.target.value)} required />
            <FormInput label="Phone" placeholder="+971 50 000 0000" value={form.phone || ""} onChange={(e) => updateForm("phone", e.target.value)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Service *" value={form.service || ""} onChange={(e) => updateForm("service", e.target.value)} required>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
              <FormSelect label="Industry" value={form.industry || ""} onChange={(e) => updateForm("industry", e.target.value)}>
                <option value="">Select…</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Budget" value={form.budget || ""} onChange={(e) => updateForm("budget", e.target.value)}>
                <option value="">Select…</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </FormSelect>
              <FormSelect label="Source" value={form.source || ""} onChange={(e) => updateForm("source", e.target.value)}>
                <option value="">Select…</option>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
            </div>
            <FormSelect label="Status *" value={form.status || "New"} onChange={(e) => updateForm("status", e.target.value)}>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </FormSelect>
            <FormInput label="Next Follow-up" type="date" value={form.followUp || ""} onChange={(e) => updateForm("followUp", e.target.value)} />
            <FormTextarea label="Notes" placeholder="Key context about this lead…" value={form.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} rows={3} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <SaveButton loading={loading} editing={!!editing} />
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ status: "New", service: "Web Development" });
                  }}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px 18px", background: "transparent", color: `${T.ink}40`, border: `1px solid ${T.sand}50`, cursor: "pointer" }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        }
        list={
          <div>
            <div style={{ border: `1px solid ${T.sand}25` }}>
              {filtered.length === 0 ? (
                <EmptyState label="leads" />
              ) : (
                filtered.map((lead) => (
                  <Row
                    key={lead._id}
                    hoverBar={lead.status === "New" ? "#3B82F6" : lead.status === "Contacted" ? T.amber : lead.status === "Qualified" ? "#8B5CA5" : lead.status === "Proposal Sent" ? "#2E8B8B" : lead.status === "Won" ? "#2e7d4f" : lead.status === "Lost" ? "#c0392b" : T.amber}
                    actions={
                      <>
                        <EditButton onClick={() => editLead(lead)} />
                        <DeleteButton onClick={() => deleteLead(lead._id!)} />
                      </>
                    }
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 15, color: T.ink }}>{lead.name}</span>
                        {lead.company && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}50` }}>{lead.company}</span>}
                        <StatusPill status={lead.status} />
                        <ServiceTag service={lead.service} />
                      </div>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}40` }}>{lead.email}</span>
                        {lead.phone && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}35` }}>{lead.phone}</span>}
                        {lead.budget && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>{lead.budget}</span>}
                        {lead.source && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}30` }}>via {lead.source}</span>}
                      </div>
                      {lead.notes && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}45`, lineHeight: 1.5, marginTop: 2 }}>{lead.notes}</p>}
                      {lead.followUp && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: `${T.ink}30`, letterSpacing: "0.16em", textTransform: "uppercase" }}>Follow-up</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber }}>{lead.followUp}</span>
                        </div>
                      )}
                    </div>
                  </Row>
                ))
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}
