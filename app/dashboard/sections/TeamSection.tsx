import { T } from '@/app/data';
import {  SectionPanel, FocusInput, Field, FormActions, RecordRow, EmptyState } from './shared';

interface TeamMember { _id?: string; name: string; role: string; exp: string; ini: string; color: string; }

export default function TeamSection({ team, form, setForm, editing, setEditing, onSubmit, onDelete, onEdit, loading }: any) {
  return (
    <SectionPanel
      subtitle="Manage" title={`${editing ? "Edit" : "Add"} Team Member`}
      form={
        <form onSubmit={onSubmit}>
          <FocusInput label="Full Name *" placeholder="Sofia Marchetti" value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <FocusInput label="Role *" placeholder="Head of Design" value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} required />
          <FocusInput label="Expertise" placeholder="Figma · Motion Design · Brand Strategy" value={form.exp || ""} onChange={e => setForm({ ...form, exp: e.target.value })} required />
          <FocusInput label="Initials (2 chars) *" placeholder="SM" value={form.ini || ""} onChange={e => setForm({ ...form, ini: e.target.value })} required maxLength={2} />
          <Field label="Accent Colour">
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 8 }}>
              <input type="color" value={form.color || T.amber} onChange={e => setForm({ ...form, color: e.target.value })}
                style={{ width: 44, height: 32, border: `1px solid ${T.sand}40`, background: "transparent", cursor: "pointer", padding: 2 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: `${T.ink}45` }}>{form.color || T.amber}</span>
            </div>
          </Field>
          <FormActions loading={loading} editing={!!editing} onCancel={() => { setEditing(null); setForm({}); }} />
        </form>
      }
      list={
        <div>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.sand}25` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}30`, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {team.length} {team.length === 1 ? "member" : "members"}
            </span>
          </div>
          <div style={{ border: `1px solid ${T.sand}25` }}>
            {team.length === 0 ? <EmptyState label="team members" /> : team.map((m: TeamMember) => (
              <RecordRow key={m._id} onEdit={() => onEdit(m)} onDelete={() => onDelete(m._id!)}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, background: `${m.color}20`, border: `1px solid ${m.color}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: m.color, fontSize: 13 }}>{m.ini}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: T.ink, fontSize: 14 }}>{m.name}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}40`, letterSpacing: "0.12em", marginTop: 3 }}>{m.role}</div>
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
