"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "../data";

export const dynamic = 'force-dynamic';

/* ── DESIGN TOKENS (matches site + dashboard + login exactly) ── */

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
    <div style={{ marginBottom: 22 }}>
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

function DotGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.055, backgroundImage: `radial-gradient(circle, ${dark ? "#F5F0E8" : "#2A2618"} 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
  );
}

/* ══════════════════════════════════════════════
   LEFT PANEL — BRAND SIDE
══════════════════════════════════════════════ */
function BrandPanel() {
  return (
    <div style={{ background: T.ink, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px" }}>
      <DotGrid dark />
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }}
        style={{ position: "absolute", top: "-15%", right: "-20%", width: 480, height: 480, borderRadius: "50%", border: `1px solid ${T.cream}10`, pointerEvents: "none" }} />
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 0.15, ease }}
        style={{ position: "absolute", bottom: "-10%", left: "-15%", width: 360, height: 360, borderRadius: "50%", border: `1px solid ${T.cream}07`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "10%", width: 280, height: 280, borderRadius: "50%", background: `${T.amber}08`, filter: "blur(80px)", pointerEvents: "none" }} />

      <motion.a href="/" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
        style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", position: "relative", zIndex: 1 }}>
        <div style={{ width: 32, height: 32, background: T.amber, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: T.ink, fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 14 }}>C</span>
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.22em", color: T.cream, textTransform: "uppercase" }}>
          veraadigital<span style={{ color: T.amber }}>.</span>STUDIO
        </span>
      </motion.a>

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Studio Dashboard
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
          style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.4rem,4vw,3.4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: T.cream, maxWidth: 380 }}>
          Join the<br/><span style={{ fontStyle: "italic", color: T.amber }}>Team.</span><br/>Create Access.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "Inter, sans-serif", color: `${T.cream}45`, fontSize: 14, lineHeight: 1.75, maxWidth: 320, marginTop: 24 }}>
          Get an account set up to manage projects, team members, and case studies from the studio dashboard.
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { i: "◈", t: "Invite-only access", b: "New accounts are reviewed before activation." },
            { i: "◉", t: "One workspace", b: "Team, works, projects, and services in one place." },
            { i: "⬡", t: "Built for the studio", b: "Tailored to how veraadigital actually ships." },
          ].map(item => (
            <div key={item.t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ color: T.amber, fontSize: 15, marginTop: 1, flexShrink: 0 }}>{item.i}</span>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: T.cream, fontSize: 12, marginBottom: 2 }}>{item.t}</div>
                <div style={{ fontFamily: "Inter, sans-serif", color: `${T.cream}40`, fontSize: 11.5, lineHeight: 1.6 }}>{item.b}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── PASSWORD STRENGTH METER ── */
function strength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: T.sand };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak", color: "#c0392b" };
  if (score <= 3) return { score, label: "Fair", color: T.amber };
  return { score, label: "Strong", color: "#2e7d4f" };
}

/* ══════════════════════════════════════════════
   REGISTER PAGE
══════════════════════════════════════════════ */
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const pwStrength = strength(password);
  const mismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) { setError("Please fill in every field to continue."); return; }
    if (password !== confirm) { setError("Passwords don't match — check and try again."); return; }
    if (pwStrength.score <= 1) { setError("Choose a stronger password (8+ characters, mix of letters & numbers)."); return; }
    if (!agree) { setError("Please accept the terms to create an account."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirm, agree }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Couldn't create your account. Please try again.");
        setLoading(false);
        return;
      }
      setDone(true);
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
        <BrandPanel />
      </div>

      <div className="form-panel" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", overflowY: "auto" }}>
        <DotGrid />

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              style={{ width: "100%", maxWidth: 380, position: "relative", zIndex: 1, textAlign: "center" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }}
                style={{ width: 64, height: 64, border: `1px solid ${T.amber}60`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: T.amber, fontSize: 24 }}>✓</motion.div>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 28, color: T.ink, marginBottom: 12, letterSpacing: "-0.02em" }}>
                Account Created.
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", color: `${T.ink}50`, fontSize: 13, lineHeight: 1.7, marginBottom: 32 }}>
                Welcome to the studio, <span style={{ color: T.ink, fontWeight: 700 }}>{name.split(" ")[0]}</span>. Your account is pending approval — we'll email <span style={{ color: T.amber }}>{email}</span> once it's active.
              </p>
              <a href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: T.ink, color: T.cream, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", padding: "16px 32px", textDecoration: "none" }}>
                Back to Sign In →
              </a>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }}
              style={{ width: "100%", maxWidth: 380, position: "relative", zIndex: 1 }}>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 24, height: 1, background: T.amber, display: "block" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: T.amber, letterSpacing: "0.26em", textTransform: "uppercase" }}>Create Account</span>
              </div>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 32, color: T.ink, letterSpacing: "-0.03em", marginBottom: 8 }}>
                Set Up Your <span style={{ fontStyle: "italic", color: T.amber }}>Access.</span>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", color: `${T.ink}45`, fontSize: 13, marginBottom: 36 }}>
                Takes less than a minute. We'll review and confirm by email.
              </p>

              <form onSubmit={handleSubmit}>
                <FocusInput label="Full Name *" placeholder="Sofia Marchetti" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
                <FocusInput label="Email Address *" type="email" placeholder="you@veraadigital.studio" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />

                <div style={{ marginBottom: 8 }}>
                  <FocusInput
                    label="Password *" type={showPw ? "text" : "password"} placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password"
                    trailing={
                      <button type="button" onClick={() => setShowPw(s => !s)}
                        style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.14em", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", textTransform: "uppercase" }}>
                        {showPw ? "Hide" : "Show"}
                      </button>
                    }
                  />
                </div>

                {password.length > 0 && (
                  <div style={{ marginBottom: 22, marginTop: -10 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[0, 1, 2, 3, 4].map(i => (
                        <span key={i} style={{ height: 3, flex: 1, background: i < pwStrength.score ? pwStrength.color : `${T.sand}30`, transition: "background 0.3s" }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: pwStrength.color, letterSpacing: "0.16em", textTransform: "uppercase" }}>{pwStrength.label} password</span>
                  </div>
                )}

                <FocusInput label="Confirm Password *" type={showPw ? "text" : "password"} placeholder="Re-enter your password" value={confirm} onChange={e => setConfirm(e.target.value)} required autoComplete="new-password" />
                {mismatch && (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#c0392b", marginTop: -14, marginBottom: 18 }}>Passwords don't match yet.</p>
                )}

                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 28, marginTop: 6 }}>
                  <div onClick={() => setAgree(a => !a)}
                    style={{ width: 16, height: 16, border: `1px solid ${agree ? T.amber : T.sand}`, background: agree ? T.amber : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                    {agree && <span style={{ color: T.ink, fontSize: 10, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: `${T.ink}55`, lineHeight: 1.6 }}>
                    I agree to the <a href="/terms" style={{ color: T.amber, fontWeight: 600 }}>Terms of Service</a> and <a href="/privacy" style={{ color: T.amber, fontWeight: 600 }}>Privacy Policy</a>.
                  </span>
                </label>

                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: 20 }}>
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
                  onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = T.sand; }}>
                  {loading ? "Creating Account…" : "Create Account"} {!loading && <span style={{ fontSize: 16 }}>→</span>}
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0" }}>
                <span style={{ flex: 1, height: 1, background: `${T.sand}40` }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}35`, letterSpacing: "0.2em" }}>OR</span>
                <span style={{ flex: 1, height: 1, background: `${T.sand}40` }} />
              </div>

              <p style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: `${T.ink}50` }}>
                Already have an account?{" "}
                <a href="/login" style={{ color: T.amber, fontWeight: 700, textDecoration: "none" }}>Sign in →</a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}