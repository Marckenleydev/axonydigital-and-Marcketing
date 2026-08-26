/* ════════════════════════════════════════════
   RESULTS SECTION
   Logs and tracks metrics
════════════════════════════════════════════ */

import { useState } from "react";
import type { Result, Service } from "../types";
import { T, SERVICES, METRICS, SERVICE_COLORS, MOCK_RESULTS } from "../constants";
import { FormInput, FormSelect, FormTextarea, SaveButton, DeleteButton, EditButton, StatCard, EmptyState, Row, TwoColumnLayout, ServiceTag } from "./ui";

export function ResultsSection() {
  const [results, setResults] = useState<Result[]>(MOCK_RESULTS);
  const [form, setForm] = useState<Partial<Result>>({ service: "Web Development" });
  const [editing, setEditing] = useState<string | null>(null);
  const [filterSvc, setFilterSvc] = useState("All");
  const [loading, setLoading] = useState(false);

  const updateForm = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const filtered = filterSvc === "All" ? results : results.filter((r) => r.service === filterSvc);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setResults((rs) => rs.map((r) => (r._id === editing ? { ...r, ...form } as Result : r)));
      setEditing(null);
    } else {
      setResults((rs) => [...rs, { ...form, _id: Date.now().toString() } as Result]);
    }
    setForm({ service: "Web Development" });
  };

  const deleteResult = (id: string) => {
    if (confirm("Delete this result?")) setResults((rs) => rs.filter((r) => r._id !== id));
  };

  const editResult = (result: Result) => {
    setForm(result);
    setEditing(result._id || null);
  };

  const currentMetrics = METRICS[form.service as Service] || METRICS["Web Development"];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: `${T.sand}20`, borderBottom: `1px solid ${T.sand}25` }}>
        {SERVICES.map((service) => (
          <StatCard key={service} value={results.filter((r) => r.service === service).length.toString()} label={`${service} Results`} sub={`${service.split(" ")[0].toLowerCase()} metrics`} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.sand}25`, background: T.creamDark }}>
        {["All", ...SERVICES].map((service) => (
          <button
            key={service}
            onClick={() => setFilterSvc(service)}
            style={{
              padding: "10px 16px",
              background: "transparent",
              border: "none",
              borderBottom: filterSvc === service ? `2px solid ${T.amber}` : "2px solid transparent",
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: filterSvc === service ? T.amber : `${T.ink}40`,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {service}
          </button>
        ))}
      </div>

      <TwoColumnLayout
        form={
          <form onSubmit={save}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ width: 24, height: 1, background: T.amber, display: "block" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                {editing ? "Edit Result" : "Log Result"}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormInput label="Project / Campaign *" placeholder="Nomad OS Redesign" value={form.projectTitle || ""} onChange={(e) => updateForm("projectTitle", e.target.value)} required />
              <FormInput label="Client Name *" placeholder="Nomad OS" value={form.clientName || ""} onChange={(e) => updateForm("clientName", e.target.value)} required />
            </div>
            <FormSelect label="Service *" value={form.service || ""} onChange={(e) => { updateForm("service", e.target.value); updateForm("metric", ""); }} required>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </FormSelect>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Metric *" value={form.metric || ""} onChange={(e) => updateForm("metric", e.target.value)} required>
                <option value="">Select…</option>
                {currentMetrics.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </FormSelect>
              <FormInput label="Value *" placeholder="+68% / 340k / 4.8×" value={form.value || ""} onChange={(e) => updateForm("value", e.target.value)} required />
            </div>
            <FormInput label="Period" placeholder="June 2024 / Q2 2024" value={form.period || ""} onChange={(e) => updateForm("period", e.target.value)} />
            <FormTextarea label="Context / Notes" placeholder="Post-launch vs previous 30 days, campaign notes…" value={form.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} rows={3} />
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
            {filtered.length === 0 ? (
              <EmptyState label="results" />
            ) : (
              filtered.map((result) => (
                <Row
                  key={result._id}
                  hoverBar={SERVICE_COLORS[result.service] || T.amber}
                  actions={
                    <>
                      <EditButton onClick={() => editResult(result)} />
                      <DeleteButton onClick={() => deleteResult(result._id!)} />
                    </>
                  }
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 22, color: SERVICE_COLORS[result.service] || T.amber, letterSpacing: "-0.02em" }}>{result.value}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: T.ink }}>{result.metric}</span>
                      <ServiceTag service={result.service} />
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}45` }}>{result.clientName}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}35` }}>{result.projectTitle}</span>
                      {result.period && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>{result.period}</span>}
                    </div>
                    {result.notes && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}45`, lineHeight: 1.5 }}>{result.notes}</p>}
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
