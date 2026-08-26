/* ════════════════════════════════════════════
   CLIENTS SECTION
   Manages active client accounts
════════════════════════════════════════════ */

import { useState } from "react";
import type { Client } from "../types";
import { T, SERVICES, INDUSTRIES, MOCK_CLIENTS } from "../constants";
import { FormInput, FormSelect, FormTextarea, SaveButton, DeleteButton, EditButton, StatCard, EmptyState, Row, TwoColumnLayout, ServiceTag } from "./ui";

export function ClientsSection() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [form, setForm] = useState<Partial<Client>>({ service: "Web Development" });
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateForm = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setClients((cs) => cs.map((c) => (c._id === editing ? { ...c, ...form } as Client : c)));
      setEditing(null);
    } else {
      setClients((cs) => [...cs, { ...form, _id: Date.now().toString() } as Client]);
    }
    setForm({ service: "Web Development" });
  };

  const deleteClient = (id: string) => {
    if (confirm("Remove this client?")) setClients((cs) => cs.filter((c) => c._id !== id));
  };

  const editClient = (client: Client) => {
    setForm(client);
    setEditing(client._id || null);
  };

  const totalVal = clients.reduce((a, c) => a + (parseFloat(c.contractValue?.replace(/[^0-9.]/g, "") || "0") || 0), 0);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: `${T.sand}20`, borderBottom: `1px solid ${T.sand}25` }}>
        <StatCard value={clients.length.toString()} label="Active Clients" />
        <StatCard value={`$${(totalVal / 1000).toFixed(1)}k`} label="Total Contract Value" />
        <StatCard value={SERVICES.map((s) => `${s.split(" ")[0]}: ${clients.filter((c) => c.service === s).length}`).join(" · ")} label="By Service" />
      </div>

      <TwoColumnLayout
        form={
          <form onSubmit={save}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ width: 24, height: 1, background: T.amber, display: "block" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                {editing ? "Edit Client" : "New Client"}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormInput label="Contact Name *" placeholder="Marcus Webb" value={form.name || ""} onChange={(e) => updateForm("name", e.target.value)} required />
              <FormInput label="Company *" placeholder="Nomad OS" value={form.company || ""} onChange={(e) => updateForm("company", e.target.value)} required />
            </div>
            <FormInput label="Email *" type="email" placeholder="marcus@nomad.io" value={form.email || ""} onChange={(e) => updateForm("email", e.target.value)} required />
            <FormInput label="Phone" placeholder="+1 415 000 0000" value={form.phone || ""} onChange={(e) => updateForm("phone", e.target.value)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Industry" value={form.industry || ""} onChange={(e) => updateForm("industry", e.target.value)}>
                <option value="">Select…</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </FormSelect>
              <FormSelect label="Service *" value={form.service || ""} onChange={(e) => updateForm("service", e.target.value)} required>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormInput label="Contract Value" placeholder="$18,000" value={form.contractValue || ""} onChange={(e) => updateForm("contractValue", e.target.value)} />
              <FormInput label="Start Date" type="date" value={form.startDate || ""} onChange={(e) => updateForm("startDate", e.target.value)} />
            </div>
            <FormTextarea label="Notes" placeholder="Retainer terms, preferences, key contacts…" value={form.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} rows={3} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <SaveButton loading={loading} editing={!!editing} />
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ service: "Web Development" });
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
          <div style={{ border: `1px solid ${T.sand}25` }}>
            {clients.length === 0 ? (
              <EmptyState label="clients" />
            ) : (
              clients.map((client) => (
                <Row
                  key={client._id}
                  hoverBar="#4A6FA5"
                  actions={
                    <>
                      <EditButton onClick={() => editClient(client)} />
                      <DeleteButton onClick={() => deleteClient(client._id!)} />
                    </>
                  }
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 15, color: T.ink }}>{client.company}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}50` }}>{client.name}</span>
                      <ServiceTag service={client.service} />
                      {client.contractValue && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber, fontWeight: 700 }}>{client.contractValue}</span>}
                    </div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}40` }}>{client.email}</span>
                      {client.industry && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}30` }}>{client.industry}</span>}
                      {client.startDate && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}30` }}>Since {client.startDate}</span>}
                    </div>
                    {client.notes && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}45`, lineHeight: 1.5 }}>{client.notes}</p>}
                  </div>
                </Row>
              ))
            )}
          </div>
        }
      />
    </div>
  );
}
