"use client";
import { useRef, useState } from "react";
import { OrbitBackground } from "../components/OrbitBackground";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { T } from "../data";
import { Cursor } from "../components/Cursor";

const ease = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } };
const stag = (d = 0) => ({ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: d } } });

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

const COOKIE_TYPES = [
  {
    n: "01",
    type: "Strictly Necessary",
    icon: "⬡",
    required: true,
    desc: "These cookies are essential for our website to function properly. They enable core features such as page navigation, secure login, and access to protected areas. The website cannot function correctly without these cookies, and they cannot be disabled.",
    examples: ["Session management", "Security tokens", "Load balancing", "Cookie consent state"]
  },
  {
    n: "02",
    type: "Analytics & Performance",
    icon: "◎",
    required: false,
    desc: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics to measure traffic patterns, page views, and user behaviour — helping us improve the site experience over time.",
    examples: ["Google Analytics (_ga, _gid)", "Page view tracking", "Session duration", "Traffic source analysis"]
  },
  {
    n: "03",
    type: "Functional",
    icon: "◈",
    required: false,
    desc: "Functional cookies enable enhanced features and personalisation on our site, such as remembering your preferences, language settings, and form data. Without these, some features may not work as intended.",
    examples: ["Language preferences", "Form auto-fill", "UI customisation", "Chat widget state"]
  },
  {
    n: "04",
    type: "Marketing & Targeting",
    icon: "◉",
    required: false,
    desc: "We may use marketing cookies to deliver relevant advertisements and track the effectiveness of campaigns run on platforms like Meta (Facebook/Instagram) and Google Ads. These cookies may track your browsing activity across websites.",
    examples: ["Meta Pixel (_fbp)", "Google Ads (_gcl)", "Retargeting audiences", "Conversion tracking"]
  },
];

const SECTIONS = [
  {
    n: "05",
    title: "What Are Cookies?",
    content: "Cookies are small text files stored on your device when you visit a website. They allow the site to remember information about your visit — such as your preferences and browsing behaviour — making your next visit easier and the site more useful to you. Cookies are widely used and do not harm your device."
  },
  {
    n: "06",
    title: "How We Use Cookies",
    content: "Axony Digital uses cookies to ensure the website functions correctly, analyse how visitors use our site, personalise your experience, and measure the performance of our marketing campaigns. We aim to use only the cookies necessary to deliver a high-quality, secure experience."
  },
  {
    n: "07",
    title: "Third-Party Cookies",
    content: "Some cookies on our website are placed by third-party services we use, such as Google Analytics, Meta Pixel, and embedded content providers. These third parties have their own privacy policies governing how they use cookies. We do not control third-party cookies and recommend reviewing their respective policies."
  },
  {
    n: "08",
    title: "Managing Your Cookie Preferences",
    content: "You can control and manage cookies in several ways. Most browsers allow you to block or delete cookies through their settings. You can also use browser extensions or platform-specific opt-out tools (such as Google Analytics Opt-out or Meta Ads Manager). Note that blocking certain cookies may impact how the website functions. Your consent can be updated at any time via our cookie banner."
  },
  {
    n: "09",
    title: "Cookie Retention Periods",
    content: "Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period — typically between 30 days and 2 years depending on their purpose. For example, Google Analytics cookies persist for up to 2 years, while our session cookies expire at the end of your browsing session."
  },
  {
    n: "10",
    title: "Updates to This Policy",
    content: "We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our practices. The date at the top of this page indicates when it was last revised. Continued use of our website after changes constitutes acceptance of the updated policy."
  },
];

export default function CookiesPage() {
  const [heroRef, heroV] = useRev();
  const [bodyRef, bodyV] = useRev();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="orbit-page" style={{ fontFamily: "Inter, sans-serif", background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)", minHeight: "100vh" }}>
      <Cursor />
      <OrbitBackground />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: "160px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div ref={heroRef} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={heroV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontSize: 11, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>Legal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={heroV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease }}
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: T.cream, marginBottom: 28, maxWidth: 800 }}>
            Cookie<br /><span style={{ fontStyle: "italic", color: T.amber }}>Policy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={heroV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ color: `${T.cream}65`, fontSize: 17, maxWidth: 480, lineHeight: 1.75 }}>
            Last updated: August 2026. We use cookies to deliver a better experience — here's exactly what we use and why.
          </motion.p>
        </div>
      </section>

      {/* ── COOKIE TYPE CARDS ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <span style={{ width: 28, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontSize: 10, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>Cookie Types</span>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 2, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2 }}>
            {COOKIE_TYPES.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ background: "rgba(5,14,31,0.6)", padding: "32px 28px", cursor: "pointer", position: "relative", overflow: "hidden", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(79,168,240,0.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(5,14,31,0.6)"}>

                {/* Required badge */}
                {c.required && (
                  <span style={{ position: "absolute", top: 16, right: 16, fontSize: 9, padding: "3px 8px", background: "rgba(79,168,240,0.15)", color: T.amber, letterSpacing: "0.16em", textTransform: "uppercase", borderRadius: 2 }}>
                    Required
                  </span>
                )}

                <div style={{ fontSize: 28, marginBottom: 14, color: T.amber }}>{c.icon}</div>
                <div style={{ fontSize: 10, color: T.amber, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>{c.n}</div>
                <h3 style={{ fontSize: "clamp(15px, 2.5vw, 18px)", fontWeight: 700, color: T.cream, marginBottom: 12, letterSpacing: "-0.01em" }}>{c.type}</h3>
                <p style={{ fontSize: 13, color: `${T.cream}50`, lineHeight: 1.7, marginBottom: 16 }}>{c.desc}</p>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }} style={{ overflow: "hidden" }}>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, marginTop: 4 }}>
                        <div style={{ fontSize: 10, color: `${T.cream}35`, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Examples</div>
                        {c.examples.map((ex, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.amber, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: `${T.cream}45` }}>{ex}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ fontSize: 11, color: T.amber, marginTop: 8, opacity: 0.7 }}>
                  {expanded === i ? "Show less ↑" : "See examples ↓"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POLICY CONTENT ── */}
      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <motion.div ref={bodyRef} variants={stag()} initial="hidden" animate={bodyV ? "visible" : "hidden"}>
            {SECTIONS.map((section, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ marginBottom: 52, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.amber, letterSpacing: "0.2em", marginTop: 6, flexShrink: 0 }}>{section.n}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: T.cream, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    {section.title}
                  </h3>
                </div>
                <p style={{ color: `${T.cream}60`, fontSize: 15, lineHeight: 1.85, paddingLeft: 36 }}>
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: 20, padding: "36px 40px", border: "1px solid rgba(79,168,240,0.15)", borderRadius: 16, background: "rgba(79,168,240,0.04)" }}>
            <p style={{ color: `${T.cream}55`, fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
              Questions about our use of cookies or want to update your preferences?
            </p>
            <a href="mailto:info@axony.digital"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, color: T.amber, fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: "0.04em", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}>
              info@axony.digital →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}