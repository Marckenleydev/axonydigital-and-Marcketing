/* ════════════════════════════════════════════
   CONTENT SECTION
   Manages content production
════════════════════════════════════════════ */

import { useState } from "react";
import type { Content } from "../types";
import { T, SERVICES, CONTENT_STATUSES, CONTENT_TYPES, PLATFORMS, MOCK_CONTENT } from "../constants";
import { FormInput, FormSelect, FormTextarea, SaveButton, DeleteButton, EditButton, StatCard, EmptyState, Row, TwoColumnLayout, StatusPill, ServiceTag } from "./ui";

export function ContentSection() {
  const [content, setContent] = useState<Content[]>(MOCK_CONTENT);
  const [form, setForm] = useState<Partial<Content>>({ status: "Draft", service: "Content Production" });
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const updateForm = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const filtered = filter === "All" ? content : content.filter((c) => c.status === filter);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setContent((cs) => cs.map((c) => (c._id === editing ? { ...c, ...form } as Content : c)));
      setEditing(null);
    } else {
      setContent((cs) => [...cs, { ...form, _id: Date.now().toString() } as Content]);
    }
    setForm({ status: "Draft", service: "Content Production" });
  };

  const deleteContent = (id: string) => {
    if (confirm("Delete this content piece?")) setContent((cs) => cs.filter((c) => c._id !== id));
  };

  const editContent = (item: Content) => {
    setForm(item);
    setEditing(item._id || null);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: `${T.sand}20`, borderBottom: `1px solid ${T.sand}25` }}>
        <StatCard value={content.length.toString()} label="Total Content" />
        <StatCard value={content.filter((c) => c.status === "Published").length.toString()} label="Published" />
        <StatCard value={content.filter((c) => c.status === "Scheduled").length.toString()} label="Scheduled" sub="Queued" />
        <StatCard value={content.filter((c) => c.status === "Draft").length.toString()} label="Drafts" />
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.sand}25`, background: T.creamDark }}>
        {["All", ...CONTENT_STATUSES].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "10px 16px",
              background: "transparent",
              border: "none",
              borderBottom: filter === status ? `2px solid ${T.amber}` : "2px solid transparent",
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: filter === status ? T.amber : `${T.ink}40`,
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <TwoColumnLayout
        form={
          <form onSubmit={save}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ width: 24, height: 1, background: T.amber, display: "block" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.24em", textTransform: "uppercase" }}>
                {editing ? "Edit Content" : "New Content"}
              </span>
            </div>
            <FormInput label="Title *" placeholder="June Campaign Reel" value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} required />
            <FormInput label="Client Name *" placeholder="Nomad OS" value={form.clientName || ""} onChange={(e) => updateForm("clientName", e.target.value)} required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Service *" value={form.service || ""} onChange={(e) => updateForm("service", e.target.value)} required>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
              <FormSelect label="Status *" value={form.status || "Draft"} onChange={(e) => updateForm("status", e.target.value)}>
                {CONTENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Content Type" value={form.type || ""} onChange={(e) => updateForm("type", e.target.value)}>
                <option value="">Select…</option>
                {CONTENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </FormSelect>
              <FormSelect label="Platform" value={form.platform || ""} onChange={(e) => updateForm("platform", e.target.value)}>
                <option value="">Select…</option>
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </FormSelect>
            </div>
            <FormInput label="Scheduled Date" type="date" value={form.scheduledDate || ""} onChange={(e) => updateForm("scheduledDate", e.target.value)} />
            <FormTextarea label="Copy / Caption" placeholder="The caption or script for this piece…" value={form.copy || ""} onChange={(e) => updateForm("copy", e.target.value)} rows={3} />
            <FormInput label="Media URL" placeholder="https://cdn.example.com/video.mp4" value={form.mediaUrl || ""} onChange={(e) => updateForm("mediaUrl", e.target.value)} />
            <FormTextarea label="Notes" placeholder="Performance notes, context…" value={form.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} rows={2} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <SaveButton loading={loading} editing={!!editing} />
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ status: "Draft", service: "Content Production" });
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
              <EmptyState label="content" />
            ) : (
              filtered.map((item) => (
                <Row
                  key={item._id}
                  hoverBar={item.status === "Draft" ? T.sand : item.status === "Scheduled" ? "#3B82F6" : item.status === "Published" ? "#2e7d4f" : item.status === "Archived" ? `${T.ink}50` : T.amber}
                  actions={
                    <>
                      <EditButton onClick={() => editContent(item)} />
                      <DeleteButton onClick={() => deleteContent(item._id!)} />
                    </>
                  }
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 15, color: T.ink }}>{item.title}</span>
                      <StatusPill status={item.status} />
                      <ServiceTag service={item.service} />
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}45` }}>{item.clientName}</span>
                      {item.type && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}35` }}>{item.type}</span>}
                      {item.platform && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}35` }}>{item.platform}</span>}
                      {item.scheduledDate && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>{item.scheduledDate}</span>}
                    </div>
                    {item.copy && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}45`, lineHeight: 1.5 }}>{item.copy.substring(0, 120)}{item.copy.length > 120 ? "…" : ""}</p>}
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
