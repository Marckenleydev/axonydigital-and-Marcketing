import { SectionPanel, FocusInput, FocusTextarea, Field, FormActions, RecordRow, EmptyState } from './shared';
import { T } from '@/app/data';

interface Project { _id?: string; title: string; sub: string; cat: string; year: string; tags: string[]; desc: string; bg: string; acc: string; challenge: string; solution: string; results: string[]; services: string[]; }

export default function ProjectsSection({ projects, form, setForm, editing, setEditing, onSubmit, onDelete, onEdit, loading }: any) {
  return (
    <SectionPanel
      subtitle="Manage" title={`${editing ? "Edit" : "Add"} Case Study`}
      form={
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <FocusInput label="Title *" placeholder="Aurelia" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <FocusInput label="Subtitle *" placeholder="Finance Platform" value={form.sub || ""} onChange={e => setForm({ ...form, sub: e.target.value })} required />
            <FocusInput label="Category *" placeholder="Web App" value={form.cat || ""} onChange={e => setForm({ ...form, cat: e.target.value })} required />
            <FocusInput label="Year *" placeholder="2024" value={form.year || ""} onChange={e => setForm({ ...form, year: e.target.value })} required />
          </div>
          <FocusInput label="Tags (comma separated)" placeholder="Next.js, TypeScript" value={form.tags?.join(", ") || ""} onChange={e => setForm({ ...form, tags: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
          <FocusTextarea label="Description *" value={form.desc || ""} onChange={e => setForm({ ...form, desc: e.target.value })} required rows={2} placeholder="Short summary shown on the card." />
          <FocusTextarea label="Challenge *" value={form.challenge || ""} onChange={e => setForm({ ...form, challenge: e.target.value })} required rows={2} placeholder="What problem needed solving?" />
          <FocusTextarea label="Solution *" value={form.solution || ""} onChange={e => setForm({ ...form, solution: e.target.value })} required rows={2} placeholder="How did we solve it?" />
          <FocusInput label="Results (comma separated)" placeholder="3.1× conversion lift, 44% higher AOV" value={form.results?.join(", ") || ""} onChange={e => setForm({ ...form, results: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
          <FocusInput label="Services used (comma separated)" placeholder="Web Development, UI/UX Design" value={form.services?.join(", ") || ""} onChange={e => setForm({ ...form, services: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
          <Field label="Card Colours">
            <div style={{ display: "flex", gap: 20, paddingTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.16em", textTransform: "uppercase" }}>BG</span>
                <input type="color" value={form.bg || "#1A1508"} onChange={e => setForm({ ...form, bg: e.target.value })} style={{ width: 36, height: 28, border: `1px solid ${T.sand}40`, background: "transparent", cursor: "pointer", padding: 2 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.16em", textTransform: "uppercase" }}>Accent</span>
                <input type="color" value={form.acc || T.amber} onChange={e => setForm({ ...form, acc: e.target.value })} style={{ width: 36, height: 28, border: `1px solid ${T.sand}40`, background: "transparent", cursor: "pointer", padding: 2 }} />
              </div>
            </div>
          </Field>
          <FormActions loading={loading} editing={!!editing} onCancel={() => { setEditing(null); setForm({ tags: [], results: [], services: [] }); }} />
        </form>
      }
      list={
        <div>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.sand}25` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}30`, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {projects.length} {projects.length === 1 ? "case study" : "case studies"}
            </span>
          </div>
          <div style={{ border: `1px solid ${T.sand}25` }}>
            {projects.length === 0 ? <EmptyState label="projects" /> : projects.map((p: Project) => (
              <RecordRow key={p._id} onEdit={() => onEdit(p)} onDelete={() => onDelete(p._id!)}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 36, height: 36, background: p.bg || "#1A1508", border: `2px solid ${p.acc || T.amber}`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: T.ink, fontSize: 15, letterSpacing: "-0.01em" }}>{p.title}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}40`, letterSpacing: "0.1em" }}>{p.sub}</span>
                      <span style={{ width: 2, height: 2, borderRadius: "50%", background: `${T.ink}25`, display: "inline-block" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}40`, letterSpacing: "0.1em" }}>{p.cat}</span>
                      <span style={{ width: 2, height: 2, borderRadius: "50%", background: `${T.ink}25`, display: "inline-block" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>{p.year}</span>
                    </div>
                  </div>
                </div>
              </RecordRow>
            ))}
          </div>
        </div>
      }
    />
  );
}
