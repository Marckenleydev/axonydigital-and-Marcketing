"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Cursor } from "../components/Cursor";
import { OrbitBackground } from "../components/OrbitBackground";
import { T } from "../data";

const ease = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } };
const stag = (d = 0) => ({ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: d } } });

function useRev(margin = "-60px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

/* ── MOCK DATA — replace with real content ── */

const STATS = [
  { val: "34+",  label: "Clients Served"      },
  { val: "98%",  label: "Retention Rate"       },
  { val: "3.8×", label: "Average ROAS"         },
  { val: "$2M+", label: "Revenue Generated"    },
];

const SERVICES_MAP: Record<string, string> = {
  web:     "Web Development",
  ads:     "Meta Ads",
  content: "Content Production",
};

const SERVICE_COLORS: Record<string, string> = {
  web:     "#4FA8F0",
  ads:     "#E5433F",
  content: "#A78BFA",
};

const CLIENTS = [
  {
    id: 1,
    name:     "NovaBrand",
    industry: "E-Commerce",
    logo:     "NB",
    color:    "#4FA8F0",
    services: ["web", "ads"],
    since:    "2023",
    result:   { metric: "Revenue increase", value: "+142%" },
    quote:    "Axony completely transformed our online presence. Our sales doubled within 3 months of launching the new site.",
    author:   "Sarah Mitchell",
    role:     "CEO, NovaBrand",
    featured: true,
  },
  {
    id: 2,
    name:     "Luxe Interiors",
    industry: "Interior Design",
    logo:     "LI",
    color:    "#C8A84B",
    services: ["web", "content"],
    since:    "2023",
    result:   { metric: "Lead generation", value: "+89%" },
    quote:    "The content strategy they built for us elevated our brand to a level we never thought possible in such a short time.",
    author:   "James Hartwell",
    role:     "Founder, Luxe Interiors",
    featured: true,
  },
  {
    id: 3,
    name:     "FitCore Dubai",
    industry: "Fitness",
    logo:     "FC",
    color:    "#E5433F",
    services: ["ads", "content"],
    since:    "2024",
    result:   { metric: "Cost per lead", value: "-61%" },
    quote:    "Our Meta ads went from burning cash to printing memberships. Best investment we made this year.",
    author:   "Khalid Al Mansoori",
    role:     "Owner, FitCore Dubai",
    featured: true,
  },
  {
    id: 4,
    name:     "Verdant Organics",
    industry: "Food & Beverage",
    logo:     "VO",
    color:    "#34A853",
    services: ["web", "ads", "content"],
    since:    "2024",
    result:   { metric: "ROAS", value: "4.2×" },
    quote:    "Full-package clients get full attention — they took our brand from zero to 40k followers and profitable ads in 90 days.",
    author:   "Amina Rahoui",
    role:     "Marketing Director, Verdant Organics",
    featured: false,
  },
  {
    id: 5,
    name:     "Apex Clinics",
    industry: "Healthcare",
    logo:     "AC",
    color:    "#4FA8F0",
    services: ["web", "ads"],
    since:    "2023",
    result:   { metric: "Appointment bookings", value: "+210%" },
    quote:    "Professional, fast, and results-driven. Our booking system is now flawless and our ads finally convert.",
    author:   "Dr. Omar ",
    role:     "Director, Apex Clinics",
    featured: false,
  },
  {
    id: 6,
    name:     "StyleHaus",
    industry: "Fashion",
    logo:     "SH",
    color:    "#A78BFA",
    services: ["content", "ads"],
    since:    "2024",
    result:   { metric: "Engagement rate", value: "+320%" },
    quote:    "Our Instagram went from 2k to 18k in 4 months. The content quality is unlike anything we had before.",
    author:   "Leila Fontaine",
    role:     "Brand Manager, StyleHaus",
    featured: false,
  },
  {
    id: 7,
    name:     "Meridian Tech",
    industry: "SaaS",
    logo:     "MT",
    color:    "#4FA8F0",
    services: ["web"],
    since:    "2024",
    result:   { metric: "Page load time", value: "-78%" },
    quote:    "They rebuilt our platform from scratch in 6 weeks. Clean code, great communication, zero drama.",
    author:   "Ryan Clarke",
    role:     "CTO, Meridian Tech",
    featured: false,
  },
  {
    id: 8,
    name:     "Dunes Realty",
    industry: "Real Estate",
    logo:     "DR",
    color:    "#C8A84B",
    services: ["web", "ads", "content"],
    since:    "2023",
    result:   { metric: "Qualified leads / month", value: "85+" },
    quote:    "Every service they offer works together seamlessly. Our pipeline has never been this full.",
    author:   "Fatima Al Zaabi",
    role:     "Sales Director, Dunes Realty",
    featured: false,
  },
];

const FILTERS = ["All", "Web Development", "Meta Ads", "Content Production"];

/* ── COMPONENTS ── */


function FeaturedCard({ client }: { client: typeof CLIENTS[0] }) {
  const [r, v] = useRev();
  return (
    <motion.div
      ref={r}
      initial={{ opacity: 0, y: 40 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "clamp(28px,5vh,48px) clamp(24px,4vw,48px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(24px,4vw,56px)",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: `${client.color}12`, filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Left */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${client.color}18`, border: `1px solid ${client.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 16, color: client.color }}>{client.logo}</span>
          </div>
          <div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18, color: T.cream }}>{client.name}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 2, letterSpacing: "0.06em" }}>{client.industry}</div>
          </div>
        </div>

        {/* Big result */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.4rem,5vw,3.6rem)", fontWeight: 800, color: client.color, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {client.result.value}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6, letterSpacing: "0.04em" }}>
            {client.result.metric}
          </div>
        </div>

        {/* Service tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {client.services.map(s => (
            <span key={s} style={{ fontFamily: "Inter, sans-serif", fontSize: 10, padding: "4px 12px", borderRadius: 999, border: `1px solid ${SERVICE_COLORS[s]}40`, color: SERVICE_COLORS[s], letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {SERVICES_MAP[s]}
            </span>
          ))}
        </div>
      </div>

      {/* Right — testimonial */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 48, color: client.color, opacity: 0.25, lineHeight: 1, marginBottom: 12, fontFamily: "Georgia, serif" }}>"</div>
        <blockquote style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.8vw,16px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, fontStyle: "italic", marginBottom: 24 }}>
          {client.quote}
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${client.color}20`, border: `1px solid ${client.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, color: client.color }}>{client.author.split(" ").map(w => w[0]).join("")}</span>
          </div>
          <div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: T.cream }}>{client.author}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{client.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ClientCard({ client, i }: { client: typeof CLIENTS[0]; i: number }) {
  const [hov, setHov] = useState(false);
  const [r, v] = useRev();

  return (
    <motion.div
      ref={r}
      initial={{ opacity: 0, y: 28 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? `${client.color}30` : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        padding: "clamp(20px,3.5vh,32px) clamp(18px,3vw,28px)",
        cursor: "default",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 180, height: 180, borderRadius: "50%", background: `${client.color}08`, filter: "blur(40px)", pointerEvents: "none", transition: "opacity 0.3s", opacity: hov ? 1 : 0 }} />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${client.color}15`, border: `1px solid ${client.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 14, color: client.color }}>{client.logo}</span>
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 4 }}>Since {client.since}</span>
      </div>

      {/* Name + industry */}
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(15px,2vw,18px)", color: T.cream, marginBottom: 4 }}>{client.name}</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 18, letterSpacing: "0.04em" }}>{client.industry}</div>

      {/* Result */}
      <div style={{ background: `${client.color}0D`, border: `1px solid ${client.color}20`, borderRadius: 10, padding: "12px 16px", marginBottom: 18 }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(18px,2.5vw,24px)", color: client.color, letterSpacing: "-0.03em" }}>{client.result.value}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 3, letterSpacing: "0.06em" }}>{client.result.metric}</div>
      </div>

      {/* Quote preview */}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 18 }}>
        "{client.quote.substring(0, 90)}{client.quote.length > 90 ? "…" : ""}"
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${client.color}18`, border: `1px solid ${client.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, color: client.color }}>{client.author.split(" ").map(w => w[0]).join("")}</span>
        </div>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{client.author}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{client.role}</div>
        </div>
      </div>

      {/* Services */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
        {client.services.map(s => (
          <span key={s} style={{ fontFamily: "Inter, sans-serif", fontSize: 9, padding: "3px 9px", borderRadius: 999, border: `1px solid ${SERVICE_COLORS[s]}35`, color: SERVICE_COLORS[s], letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {SERVICES_MAP[s]}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── PAGE ── */

export default function ClientsPage() {
  const [filter, setFilter] = useState("All");
  const [heroRef, heroV] = useRev();

  const featured = CLIENTS.filter(c => c.featured);
  const rest = CLIENTS.filter(c => {
    if (c.featured) return false;
    if (filter === "All") return true;
    const key = Object.entries(SERVICES_MAP).find(([, v]) => v === filter)?.[0];
    return key ? c.services.includes(key) : true;
  });

  return (
    <div className="orbit-page" style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <Cursor />
      <OrbitBackground />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: "160px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div ref={heroRef} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={heroV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontSize: 11, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>Our Clients</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease }}
            style={{ fontSize: "clamp(3rem,8vw,7.5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: T.cream, marginBottom: 28, maxWidth: 900 }}>
            Brands We've<br />
            <span style={{ fontStyle: "italic" }}>Helped Grow.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px,2.5vw,18px)", maxWidth: 520, lineHeight: 1.75 }}>
            Real results for real businesses. From startups to established brands — here's what we've built together.
          </motion.p>
        </div>
      </section>

    

      {/* ── FEATURED ── */}
      <section style={{ padding: "80px 24px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <span style={{ width: 28, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontSize: 10, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>Featured Clients</span>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {featured.map(client => <FeaturedCard key={client.id} client={client} />)}
          </div>
        </div>
      </section>

      {/* ── ALL CLIENTS ── */}
      <section style={{ padding: "60px 24px 120px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 28, height: 1, background: T.amber, display: "block" }} />
              <span style={{ fontSize: 10, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>All Clients</span>
            </motion.div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: 11, padding: "8px 16px", borderRadius: 999, border: `1px solid ${filter === f ? T.amber : "rgba(255,255,255,0.12)"}`,
                    background: filter === f ? `${T.amber}15` : "transparent", color: filter === f ? T.amber : "rgba(255,255,255,0.45)",
                    cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s",
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,320px),1fr))", gap: 16 }}>
              {rest.map((client, i) => (
                <ClientCard key={client.id} client={client} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            style={{ textAlign: "center", padding: "clamp(40px,8vh,72px) clamp(24px,5vw,72px)", border: "1px solid rgba(79,168,240,0.14)", borderRadius: 24, background: "rgba(79,168,240,0.03)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, borderRadius: "50%", background: "rgba(79,168,240,0.05)", filter: "blur(80px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 0 3px rgba(74,222,128,0.15)" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em" }}>Currently accepting new clients</span>
              </div>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.8rem)", color: T.cream, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16 }}>
                Ready to be our<br />
                <span style={{ fontStyle: "italic"}}>next success story?</span>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "clamp(14px,2vw,16px)", maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.75 }}>
                Free strategy call. We'll audit your current situation and tell you exactly what's holding your growth back.
              </p>
              <a href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 12, background: T.sand, color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 36px", borderRadius: 999, textDecoration: "none", transition: "filter 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.12)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
                Book a Free Strategy Call →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
}