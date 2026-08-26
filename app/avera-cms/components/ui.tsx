/* ════════════════════════════════════════════
   CMS UI COMPONENTS
   Reusable UI atoms and molecules
════════════════════════════════════════════ */

import { useState } from "react";
import { motion } from "framer-motion";
import { T } from "../constants";

/* ── INPUT STYLES ── */
export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 0",
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${T.sand}40`,
  fontFamily: "Inter, sans-serif",
  color: T.ink,
  fontSize: 13,
  outline: "none",
};

export const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 9,
  color: `${T.ink}45`,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  display: "block",
  marginBottom: 6,
};

/* ── STATUS PILL ── */
export function StatusPill({ status }: { status: string }) {
  const color = status === "New" ? "#3B82F6" : 
                status === "Contacted" ? T.amber :
                status === "Qualified" ? "#8B5CA5" :
                status === "Proposal Sent" ? "#2E8B8B" :
                status === "Won" ? "#2e7d4f" :
                status === "Lost" ? "#c0392b" :
                status === "Briefing" ? T.sand :
                status === "In Progress" ? T.amber :
                status === "Review" ? "#8B5CA5" :
                status === "Delivered" ? "#2e7d4f" :
                status === "On Hold" ? "#c0392b" :
                status === "Draft" ? T.sand :
                status === "Scheduled" ? "#3B82F6" :
                status === "Published" ? "#2e7d4f" :
                status === "Archived" ? `${T.ink}50` : T.sand;

  return (
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "4px 10px",
        border: `1px solid ${color}50`,
        color,
        background: `${color}10`,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

/* ── SERVICE TAG ── */
export function ServiceTag({ service }: { service: string }) {
  const color = service === "Web Development" ? "#4A6FA5" :
                service === "Meta Ads" ? "#C8872A" :
                service === "Content Production" ? "#4A8C5C" : T.sand;

  return (
    <span
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 8,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "3px 8px",
        border: `1px solid ${color}40`,
        color,
      }}
    >
      {service}
    </span>
  );
}

/* ── FORM FIELD WRAPPER ── */
export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

/* ── FORM INPUT ── */
export function FormInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <FormField label={label}>
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderBottomColor: focused ? T.amber : `${T.sand}40`, transition: "border-color 0.3s" }}
      />
    </FormField>
  );
}

/* ── FORM TEXTAREA ── */
export function FormTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <FormField label={label}>
      <textarea
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, resize: "vertical", borderBottomColor: focused ? T.amber : `${T.sand}40`, transition: "border-color 0.3s" }}
      />
    </FormField>
  );
}

/* ── FORM SELECT ── */
export function FormSelect({ label, children, ...props }: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <FormField label={label}>
      <select
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderBottomColor: focused ? T.amber : `${T.sand}40`, transition: "border-color 0.3s", cursor: "pointer" }}
      >
        {children}
      </select>
    </FormField>
  );
}

/* ── SAVE BUTTON ── */
export function SaveButton({ loading, editing }: { loading: boolean; editing: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: loading ? T.inkSoft : T.ink,
        color: T.cream,
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        padding: "13px 24px",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background 0.3s",
      }}
      onMouseEnter={(e) => {
        if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.amber;
      }}
      onMouseLeave={(e) => {
        if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.ink;
      }}
    >
      {loading ? "Saving…" : editing ? "Update" : "Add Entry"} {!loading && "→"}
    </button>
  );
}

/* ── DELETE BUTTON ── */
export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "8px 14px",
        background: "transparent",
        color: "#c0392b70",
        border: "1px solid #c0392b30",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#c0392b";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b80";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#c0392b70";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b30";
      }}
    >
      Delete
    </button>
  );
}

/* ── EDIT BUTTON ── */
export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "8px 14px",
        background: "transparent",
        color: `${T.ink}45`,
        border: `1px solid ${T.sand}50`,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = T.ink;
        (e.currentTarget as HTMLButtonElement).style.borderColor = T.ink;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = `${T.ink}45`;
        (e.currentTarget as HTMLButtonElement).style.borderColor = `${T.sand}50`;
      }}
    >
      Edit
    </button>
  );
}

/* ── STAT CARD ── */
export function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div style={{ background: T.creamDark, border: `1px solid ${T.sand}30`, padding: "20px 22px" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 26, color: T.ink, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: `${T.ink}70`, marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.14em", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ── EMPTY STATE ── */
export function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ padding: "48px 0", textAlign: "center" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 900, fontStyle: "italic", color: `${T.ink}10`, marginBottom: 8 }}>—</div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}28`, letterSpacing: "0.22em", textTransform: "uppercase" }}>No {label} yet</p>
    </div>
  );
}

/* ── ROW WRAPPER ── */
export function Row({ hoverBar = T.amber, children, actions }: { hoverBar?: string; children: React.ReactNode; actions: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "18px 24px",
        borderBottom: `1px solid ${T.sand}20`,
        background: hovered ? T.creamDark : T.cream,
        transition: "background 0.2s",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: hoverBar, transformOrigin: "bottom" }}
        transition={{ duration: 0.2 }}
      />
      <div style={{ flex: 1, marginRight: 16 }}>{children}</div>
      <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>{actions}</div>
    </div>
  );
}

/* ── TWO COLUMN LAYOUT ── */
export function TwoColumnLayout({ form, list }: { form: React.ReactNode; list: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 0, minHeight: "calc(100vh - 148px)" }}>
      <div style={{ borderRight: `1px solid ${T.sand}25`, padding: "32px 40px 40px 0", position: "sticky", top: 72, maxHeight: "calc(100vh - 72px)", overflowY: "auto" }}>{form}</div>
      <div style={{ padding: "32px 0 40px 40px", overflowY: "auto" }}>{list}</div>
    </div>
  );
}
