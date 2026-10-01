import { useState } from "react";
import { motion } from "framer-motion";
import { T } from "@/app/data";




export const ease = [0.22, 1, 0.36, 1];

/* ── SHARED INPUT STYLE ── */
export const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 0",
  background: "transparent", border: "none",
  borderBottom: `1px solid ${T.sand}40`,
  fontFamily: "Inter, sans-serif", color: T.ink,
  fontSize: 14, outline: "none",
};
export const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 9, color: `${T.ink}45`,
  letterSpacing: "0.24em", textTransform: "uppercase" as const,
  display: "block", marginBottom: 6,
};
const fieldWrap: React.CSSProperties = { marginBottom: 20 };

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export function FocusInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <Field label={label}>
      <input {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        style={{ ...inputStyle, borderBottomColor: focused ? T.amber : `${T.sand}40`, transition: "border-color 0.3s" }}
      />
    </Field>
  );
}

export function FocusTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <Field label={label}>
      <textarea {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        style={{ ...inputStyle, resize: "vertical", borderBottomColor: focused ? T.amber : `${T.sand}40`, transition: "border-color 0.3s" }}
      />
    </Field>
  );
}

/* ── SUBMIT / CANCEL BUTTONS ── */
export function FormActions({ loading, editing, onCancel }: { loading: boolean; editing: boolean; onCancel: () => void }) {
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.sand}25` }}>
      <button type="submit" disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: 12, background: loading ? `${T.inkSoft}` : T.ink, color: T.cream, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", padding: "14px 28px", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s", opacity: loading ? 0.6 : 1 }}
        onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.amber; }}
        onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.ink; }}>
        {loading ? "Saving…" : editing ? "Update Entry" : "Add Entry"} {!loading && <span style={{ fontSize: 16 }}>→</span>}
      </button>
      {editing && (
        <button type="button" onClick={onCancel}
          style={{ background: "transparent", color: `${T.ink}55`, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", padding: "14px 24px", border: `1px solid ${T.sand}50`, cursor: "pointer", transition: "all 0.25s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = T.ink; (e.currentTarget as HTMLButtonElement).style.borderColor = `${T.ink}50`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = `${T.ink}55`; (e.currentTarget as HTMLButtonElement).style.borderColor = `${T.sand}50`; }}>
          Cancel
        </button>
      )}
    </div>
  );
}

/* ── RECORD ROW ── */
export function RecordRow({ onEdit, onDelete, children }: { onEdit: () => void; onDelete: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px", borderBottom: `1px solid ${T.sand}25`, background: hov ? T.creamDark : T.cream, transition: "background 0.2s", position: "relative" }}>
      {/* left amber hover bar */}
      <motion.div animate={{ scaleY: hov ? 1 : 0 }} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: T.amber, transformOrigin: "bottom", transition: "transform 0.25s" }} />
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 24 }}>
        <button onClick={onEdit}
          style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", padding: "8px 16px", background: "transparent", color: `${T.ink}50`, border: `1px solid ${T.sand}50`, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = T.ink; (e.currentTarget as HTMLButtonElement).style.borderColor = T.ink; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = `${T.ink}50`; (e.currentTarget as HTMLButtonElement).style.borderColor = `${T.sand}50`; }}>
          Edit
        </button>
        <button onClick={onDelete}
          style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", padding: "8px 16px", background: "transparent", color: "#c0392b80", border: "1px solid #c0392b30", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#c0392b"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b80"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#c0392b80"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b30"; }}>
          Delete
        </button>
      </div>
    </motion.div>
  );
}

/* ── SECTION WRAPPER ── */
export function SectionPanel({ title, subtitle, form, list }: { title: string; subtitle: string; form: React.ReactNode; list: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 0, minHeight: "calc(100vh - 200px)", alignItems: "start" }}>
      {/* Form column */}
      <div style={{ borderRight: `1px solid ${T.sand}30`, padding: "48px 48px 48px 0", position: "sticky", top: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ width: 28, height: 1, background: T.amber, display: "block" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>{subtitle}</span>
        </div>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 28, color: T.cream, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 32 }}>{title}</h2>
        {form}
      </div>
      {/* List column */}
      <div style={{ padding: "48px 0 48px 48px" }}>{list}</div>
    </div>
  );
}

/* ── EMPTY STATE ── */
export function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 32, fontWeight: 900, fontStyle: "italic", color: `${T.ink}10`, marginBottom: 12 }}>—</div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}30`, letterSpacing: "0.2em", textTransform: "uppercase" }}>No {label} yet</p>
    </div>
  );
}
