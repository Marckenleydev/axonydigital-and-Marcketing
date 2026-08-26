"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { T } from "@/app/data";

export const dynamic = 'force-dynamic';


const ease = [0.22, 1, 0.36, 1];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 0",
  background: "transparent", border: "none",
  borderBottom: `1px solid ${T.sand}40`,
  fontFamily: "Inter, sans-serif", color: T.ink,
  fontSize: 15, outline: "none",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 9, color: `${T.ink}45`,
  letterSpacing: "0.24em", textTransform: "uppercase" as const,
  display: "block", marginBottom: 8,
};

function FocusInput({ label, type = "text", trailing, ...props }: { label: string; trailing?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 26 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input {...props} type={type}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          style={{ ...inputStyle, borderBottomColor: focused ? T.amber : `${T.sand}40`, transition: "border-color 0.3s" }}
        />
        {trailing}
      </div>
    </div>
  );
}

/* ── DOT GRID BACKDROP ── */
function DotGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.055, backgroundImage: `radial-gradient(circle, ${dark ? "#F5F0E8" : "#2A2618"} 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
  );
}

/* ══════════════════════════════════════════════
   LEFT PANEL — BRAND SIDE (shared between login/register)
══════════════════════════════════════════════ */
function BrandPanel({ mode }: { mode: "login" | "register" }) {
  return (
    <div style={{ background: T.ink, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px" }}>
      <DotGrid dark />
      {/* Decorative circles */}
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }}
        style={{ position: "absolute", top: "-15%", right: "-20%", width: 480, height: 480, borderRadius: "50%", border: `1px solid ${T.cream}10`, pointerEvents: "none" }} />
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 0.15, ease }}
        style={{ position: "absolute", bottom: "-10%", left: "-15%", width: 360, height: 360, borderRadius: "50%", border: `1px solid ${T.cream}07`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "10%", width: 280, height: 280, borderRadius: "50%", background: `${T.amber}08`, filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Top: logo */}
      <motion.a href="/" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", position: "relative", zIndex: 1 }}>
        <div style={{ width: 32, height: 32, background: T.amber, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: T.ink, fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 14 }}>C</span>
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.22em", color: T.cream, textTransform: "uppercase" }}>
          veraa<span style={{ color: T.amber }}>.</span>DIGITAL
        </span>
      </motion.a>

      {/* Middle: headline */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Studio Dashboard
          </span>
        </motion.div>
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.h1 key="login-h" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.4rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: T.cream, maxWidth: 380 }}>
              Welcome<br/>Back to the<br/><span style={{ fontStyle: "italic", color: T.amber }}>Studio.</span>
            </motion.h1>
          ) : (
            <motion.h1 key="reg-h" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.4rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: T.cream, maxWidth: 380 }}>
              Join the<br/><span style={{ fontStyle: "italic", color: T.amber }}>Team.</span><br/>Create Access.
            </motion.h1>
          )}
        </AnimatePresence>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "Inter, sans-serif", color: `${T.cream}45`, fontSize: 14, lineHeight: 1.75, maxWidth: 320, marginTop: 24 }}>
          Manage projects, team members, and case studies — all from one private workspace.
        </motion.p>
      </div>

      {/* Bottom: stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ display: "flex", gap: 1, position: "relative", zIndex: 1, background: `${T.cream}08` }}>
        {[{ v: "100+", l: "Digital Projects" }, { v: "10+", l: "INDUSTRIES SERVED" }, { v: "95%", l: "CLIENT SATISFACTION" }].map(s => (
          <div key={s.l} style={{ background: T.inkSoft, padding: "18px 22px", flex: 1 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 20, color: T.amber, marginBottom: 2 }}>{s.v}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: `${T.cream}35`, letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════ */
export default function LoginContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Enter your email and password to continue."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Incorrect email or password.");
        setLoading(false);
        return;
      }
      window.location.href = redirect;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,520px) 1fr", minHeight: "100vh", background: T.cream, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input::placeholder{color:${T.sand};opacity:0.8}
        ::selection{background:${T.amber};color:${T.ink}}
        @media (max-width: 860px) { .brand-panel { display:none !important; } .form-panel { grid-column: 1 / -1 !important; } }
      `}</style>

      <div className="brand-panel" style={{ order: -1 }}>
        <BrandPanel mode="login" />
      </div>

      {/* Right: Form */}
      <div className="form-panel" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <DotGrid />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
          style={{ width: "100%", maxWidth: 380, position: "relative", zIndex: 1 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 24, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.26em", textTransform: "uppercase" }}>Sign In</span>
          </div>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 32, color: T.ink, letterSpacing: "-0.03em", marginBottom: 8 }}>
            Access Your <span style={{ fontStyle: "italic", color: T.amber }}>Dashboard.</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: `${T.ink}45`, fontSize: 13, marginBottom: 40 }}>
            Enter your credentials to manage your studio's content.
          </p>

          <form onSubmit={handleSubmit}>
            <FocusInput label="Email Address *" type="email" placeholder="you@veraadigital.studio" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />

            <div style={{ marginBottom: 12 }}>
              <FocusInput
                label="Password *" type={showPw ? "text" : "password"} placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
                trailing={
                  <button type="button" onClick={() => setShowPw(s => !s)}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.14em", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", textTransform: "uppercase" }}>
                    {showPw ? "Hide" : "Show"}
                  </button>
                }
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div onClick={() => setRemember(r => !r)}
                  style={{ width: 16, height: 16, border: `1px solid ${remember ? T.amber : T.sand}`, background: remember ? T.amber : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {remember && <span style={{ color: T.ink, fontSize: 10, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}55` }}>Remember me</span>
              </label>
              <a href="/forgot-password" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: T.amber, textDecoration: "none", fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1px solid #c0392b40", background: "#c0392b08" }}>
                    <span style={{ color: "#c0392b", fontSize: 13, fontWeight: 900 }}>!</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9c2a1f" }}>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={loading}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: loading ? T.sand : T.sand, color: T.cream, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", padding: "18px", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s", opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.amber; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.sand ; }}>
              {loading ? "Signing In…" : "Sign In"} {!loading && <span style={{ fontSize: 16 }}>→</span>}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0" }}>
            <span style={{ flex: 1, height: 1, background: `${T.sand}40` }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}35`, letterSpacing: "0.2em" }}>OR</span>
            <span style={{ flex: 1, height: 1, background: `${T.sand}40` }} />
          </div>

          <p style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: `${T.ink}50` }}>
            New to the studio?{" "}
            <a href="/register" style={{ color: T.amber, fontWeight: 700, textDecoration: "none" }}>Create an account →</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}