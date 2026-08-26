import { SectionPanel, FocusInput, FocusTextarea, Field, FormActions, RecordRow, EmptyState, inputStyle } from './shared';
import { T } from '@/app/data';

interface Service { _id?: string; n: string; icon: string; title: string; tagline: string; desc: string; features: string[]; tech: string[]; tiers: { n: string; p: string; d: string }[]; }

export default function ServicesSection({ services, form, setForm, editing, setEditing, onSubmit, onDelete, onEdit, loading }: any) {
  return (
    <SectionPanel
      subtitle="Manage" title={`${editing ? "Edit" : "Add"} Service`}
      form={
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "0 24px" }}>
            <FocusInput label="No." placeholder="01" value={form.n || ""} onChange={e => setForm({ ...form, n: e.target.value })} required />
            <FocusInput label="Icon (emoji)" placeholder="⬡" value={form.icon || ""} onChange={e => setForm({ ...form, icon: e.target.value })} required />
          </div>
          <FocusInput label="Title *" placeholder="Web Development" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <FocusInput label="Tagline *" placeholder="High-performance applications built for scale." value={form.tagline || ""} onChange={e => setForm({ ...form, tagline: e.target.value })} required />
          <FocusTextarea label="Description *" value={form.desc || ""} onChange={e => setForm({ ...form, desc: e.target.value })} required rows={3} placeholder="Full service description shown on the services page." />
          <FocusTextarea label="Features (one per line)" value={form.features?.join("\n") || ""} onChange={e => setForm({ ...form, features: e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean) })} rows={4} placeholder={"Next.js / React / Node.js\nREST & GraphQL APIs\nDatabase design"} />
          <FocusInput label="Tech stack (comma separated)" placeholder="Next.js, TypeScript, Node.js" value={form.tech?.join(", ") || ""} onChange={e => setForm({ ...form, tech: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
          <Field label="Pricing Tiers (Name : Price : Description — one per line)">
          <textarea
  value={
    form.tiers?.map((t: any) => `${t.n} | ${t.p} | ${t.d}`).join("\n") || ""
  }
  onChange={e =>
    setForm({
      ...form,
      tiers: e.target.value
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean)
        .map((line: string) => {
          const parts = line.split("|").map(s => s.trim());

          return {
            n: parts[0] || "",
            p: parts[1] || "",
            d: parts.slice(2).join(" | ") || ""
          };
        })
    })
  }
  rows={4}
  placeholder={`Starter | $4,500 | Marketing site
Growth | $12,000 | Full web app
Enterprise | Custom | Complex platform`}
  style={{ ...inputStyle, resize: "vertical", marginTop: 6 }}
/>
          </Field>
          <FormActions loading={loading} editing={!!editing} onCancel={() => { setEditing(null); setForm({ features: [], tech: [], tiers: [] }); }} />
        </form>
      }
      list={
        <div>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.sand}25` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}30`, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {services.length} {services.length === 1 ? "service" : "services"}
            </span>
          </div>
          <div style={{ border: `1px solid ${T.sand}25` }}>
            {services.length === 0 ? <EmptyState label="services" /> : services.map((s: Service, i: number) => (
              <RecordRow key={s._id} onEdit={() => onEdit(s)} onDelete={() => onDelete(s._id!)}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, paddingTop: 2 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}30`, letterSpacing: "0.1em" }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: T.ink, fontSize: 15, letterSpacing: "-0.01em" }}>{s.title}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: T.amber, marginTop: 3 }}>{s.tagline}</div>
                    {s.tiers && s.tiers.length > 0 && (
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        {s.tiers.map(tier => (
                          <div key={tier.n} style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.1em" }}>
                            {tier.n}: <span style={{ color: T.amber }}>{tier.p}</span>
                          </div>
                        ))}
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
