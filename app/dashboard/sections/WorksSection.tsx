import { SectionPanel, FocusInput, FocusTextarea, Field, FormActions, RecordRow, EmptyState, inputStyle } from './shared';
import { T } from '@/app/data';

interface Work { _id?: string; title: string; sub: string; year: string; tags: string[]; desc: string; bg: string; acc: string; link?: string; }

export default function WorksSection({ works, form, setForm, editing, setEditing, onSubmit, onDelete, onEdit, loading }: any) {
  return (
    <SectionPanel
      subtitle="Manage" title={`${editing ? "Edit" : "Add"} Work Entry`}
      form={
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <FocusInput label="Title *" placeholder="Aurelia" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <FocusInput label="Subtitle *" placeholder="Finance Platform" value={form.sub || ""} onChange={e => setForm({ ...form, sub: e.target.value })} required />
          </div>
          <FocusInput label="Year *" placeholder="2024" value={form.year || ""} onChange={e => setForm({ ...form, year: e.target.value })} required />
          <FocusInput label="Tags (comma separated)" placeholder="Next.js, Fintech" value={form.tags?.join(", ") || ""} onChange={e => setForm({ ...form, tags: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
          <FocusTextarea label="Description *" placeholder="Real-time trading dashboard with AI-powered insights." value={form.desc || ""} onChange={e => setForm({ ...form, desc: e.target.value })} required rows={3} />
          <FocusInput label="Link (optional)" placeholder="https://project.com" value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value })} />
          <Field label="Card Colours">
            <div style={{ display: "flex", gap: 20, paddingTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.16em", textTransform: "uppercase" }}>BG</span>
                <input type="color" value={form.bg || "#1A1508"} onChange={e => setForm({ ...form, bg: e.target.value })}
                  style={{ width: 36, height: 28, border: `1px solid ${T.sand}40`, background: "transparent", cursor: "pointer", padding: 2 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.16em", textTransform: "uppercase" }}>Accent</span>
                <input type="color" value={form.acc || T.amber} onChange={e => setForm({ ...form, acc: e.target.value })}
                  style={{ width: 36, height: 28, border: `1px solid ${T.sand}40`, background: "transparent", cursor: "pointer", padding: 2 }} />
              </div>
            </div>
          </Field>
          <FormActions loading={loading} editing={!!editing} onCancel={() => { setEditing(null); setForm({ tags: [] }); }} />
        </form>
      }
      list={
        <div>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.sand}25` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}30`, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {works.length} {works.length === 1 ? "entry" : "entries"}
            </span>
          </div>
          <div style={{ border: `1px solid ${T.sand}25` }}>
            {works.length === 0 ? <EmptyState label="works" /> : works.map((w: Work) => (
              <RecordRow key={w._id} onEdit={() => onEdit(w)} onDelete={() => onDelete(w._id!)}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {/* colour swatch */}
                  <div style={{ width: 36, height: 36, background: w.bg || "#1A1508", border: `2px solid ${w.acc || T.amber}`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: T.ink, fontSize: 15, letterSpacing: "-0.01em" }}>{w.title}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}40`, letterSpacing: "0.12em" }}>{w.sub}</span>
                      <span style={{ width: 2, height: 2, borderRadius: "50%", background: `${T.ink}25`, display: "inline-block" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>{w.year}</span>
                    </div>
                    {w.tags && w.tags.length > 0 && (
                      <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                        {w.tags.map(t => <span key={t} style={{ fontFamily: "Inter, sans-serif", fontSize: 9, padding: "3px 8px", border: `1px solid ${T.sand}50`, color: `${T.ink}40`, letterSpacing: "0.1em" }}>{t}</span>)}
                      </div>
                    )}
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
