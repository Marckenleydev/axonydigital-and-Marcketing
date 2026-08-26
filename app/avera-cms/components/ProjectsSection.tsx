/* ════════════════════════════════════════════
   PROJECTS SECTION
   Manages active projects
════════════════════════════════════════════ */

import { useState } from "react";
import type { Project } from "../types";
import { T, SERVICES, PROJECT_STATUSES, MOCK_PROJECTS } from "../constants";
import { FormInput, FormSelect, FormTextarea, SaveButton, DeleteButton, EditButton, StatCard, EmptyState, Row, TwoColumnLayout, StatusPill, ServiceTag } from "./ui";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [form, setForm] = useState<Partial<Project>>({ status: "Briefing", service: "Web Development" });
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const updateForm = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProjects((ps) => ps.map((p) => (p._id === editing ? { ...p, ...form } as Project : p)));
      setEditing(null);
    } else {
      setProjects((ps) => [...ps, { ...form, _id: Date.now().toString() } as Project]);
    }
    setForm({ status: "Briefing", service: "Web Development" });
  };

  const deleteProject = (id: string) => {
    if (confirm("Delete this project?")) setProjects((ps) => ps.filter((p) => p._id !== id));
  };

  const editProject = (project: Project) => {
    setForm(project);
    setEditing(project._id || null);
  };

  const active = projects.filter((p) => p.status === "In Progress").length;
  const delivered = projects.filter((p) => p.status === "Delivered").length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: `${T.sand}20`, borderBottom: `1px solid ${T.sand}25` }}>
        <StatCard value={projects.length.toString()} label="Total Projects" />
        <StatCard value={active.toString()} label="In Progress" sub="Active now" />
        <StatCard value={delivered.toString()} label="Delivered" sub="Completed" />
        <StatCard value={projects.filter((p) => p.status === "Review").length.toString()} label="In Review" />
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.sand}25`, background: T.creamDark }}>
        {["All", ...PROJECT_STATUSES].map((status) => (
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
              whiteSpace: "nowrap",
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
                {editing ? "Edit Project" : "New Project"}
              </span>
            </div>
            <FormInput label="Project Title *" placeholder="Nomad OS Redesign" value={form.title || ""} onChange={(e) => updateForm("title", e.target.value)} required />
            <FormInput label="Client Name *" placeholder="Nomad OS" value={form.clientName || ""} onChange={(e) => updateForm("clientName", e.target.value)} required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormSelect label="Service *" value={form.service || ""} onChange={(e) => updateForm("service", e.target.value)} required>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
              <FormSelect label="Status *" value={form.status || "Briefing"} onChange={(e) => updateForm("status", e.target.value)}>
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormInput label="Start Date" type="date" value={form.startDate || ""} onChange={(e) => updateForm("startDate", e.target.value)} />
              <FormInput label="Deadline" type="date" value={form.deadline || ""} onChange={(e) => updateForm("deadline", e.target.value)} />
            </div>
            <FormInput label="Budget" placeholder="$18,000" value={form.budget || ""} onChange={(e) => updateForm("budget", e.target.value)} />
            <FormTextarea label="Brief *" placeholder="What are we building and why?" value={form.brief || ""} onChange={(e) => updateForm("brief", e.target.value)} required rows={2} />
            <FormTextarea label="Deliverables" placeholder="Figma files, Next.js codebase, CMS…" value={form.deliverables || ""} onChange={(e) => updateForm("deliverables", e.target.value)} rows={2} />
            <FormTextarea label="Notes" value={form.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} rows={2} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <SaveButton loading={loading} editing={!!editing} />
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ status: "Briefing", service: "Web Development" });
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
              <EmptyState label="projects" />
            ) : (
              filtered.map((project) => (
                <Row
                  key={project._id}
                  hoverBar={project.status === "Briefing" ? T.sand : project.status === "In Progress" ? T.amber : project.status === "Review" ? "#8B5CA5" : project.status === "Delivered" ? "#2e7d4f" : project.status === "On Hold" ? "#c0392b" : T.amber}
                  actions={
                    <>
                      <EditButton onClick={() => editProject(project)} />
                      <DeleteButton onClick={() => deleteProject(project._id!)} />
                    </>
                  }
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 15, color: T.ink }}>{project.title}</span>
                      <StatusPill status={project.status} />
                      <ServiceTag service={project.service} />
                    </div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}45` }}>{project.clientName}</span>
                      {project.budget && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>{project.budget}</span>}
                      {project.deadline && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}35` }}>Due {project.deadline}</span>}
                    </div>
                    {project.brief && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}45`, lineHeight: 1.5 }}>{project.brief}</p>}
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
