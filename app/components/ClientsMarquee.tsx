"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { T } from "../data";

/* ── same mock data shape as ClientsPage ── */
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

/* All 8 clients (non-featured) — replace with your real data */
const ALL_CLIENTS = [
  { id: 1, name: "NovaBrand",      industry: "E-Commerce",     logo: "NB", color: "#4FA8F0", services: ["web","ads"],          result: { metric: "Revenue increase",        value: "+42%" }, quote: "Axony completely transformed our online presence. Our sales doubled within 3 months.", author: "Sarah Mitchell",    role: "CEO, NovaBrand"           },
  { id: 2, name: "Luxe Interiors", industry: "Interior Design", logo: "LI", color: "#C8A84B", services: ["web","content"],       result: { metric: "Lead generation",         value: "+59%"  }, quote: "The content strategy elevated our brand to a level we never thought possible.",       author: "James Hartwell",    role: "Founder, Luxe Interiors"  },
  { id: 3, name: "FitCore Dubai",  industry: "Fitness",         logo: "FC", color: "#E5433F", services: ["ads","content"],       result: { metric: "Cost per lead",           value: "-61%"  }, quote: "Our Meta ads went from burning cash to printing memberships.",                       author: "Khalid Al Mansoori",role: "Owner, FitCore Dubai"     },
  { id: 4, name: "Verdant Organics",industry:"Food & Beverage", logo: "VO", color: "#34A853", services: ["web","ads","content"], result: { metric: "ROAS",                    value: "4.2×"  }, quote: "From zero to 40k followers and profitable ads in 90 days.",                         author: "Amina Rahoui",      role: "Marketing Director"       },
  { id: 5, name: "Apex Clinics",   industry: "Healthcare",      logo: "AC", color: "#4FA8F0", services: ["web","ads"],          result: { metric: "Appointment bookings",    value: "+70%" }, quote: "Our booking system is now flawless and our ads finally convert.",                    author: "Dr. Omar Hassan",   role: "Director, Apex Clinics"   },
  { id: 6, name: "StyleHaus",      industry: "Fashion",         logo: "SH", color: "#A78BFA", services: ["content","ads"],      result: { metric: "Engagement rate",         value: "+820%" }, quote: "Our Instagram went from 2k to 18k followers in just 4 months.",                     author: "Leila Fontaine",    role: "Brand Manager, StyleHaus" },
  { id: 7, name: "Meridian Tech",  industry: "SaaS",            logo: "MT", color: "#4FA8F0", services: ["web"],                result: { metric: "Page load time",          value: "-78%"  }, quote: "Clean code, great communication, zero drama. Rebuilt in 6 weeks.",                  author: "Ryan Clarke",       role: "CTO, Meridian Tech"       },
  { id: 8, name: "Dunes Realty",   industry: "Real Estate",     logo: "DR", color: "#C8A84B", services: ["web","ads","content"], result: { metric: "Qualified leads / month", value: "85+"   }, quote: "Our pipeline has never been this full. Every service works seamlessly together.",    author: "Fatima Al Zaabi",   role: "Sales Director, Dunes Realty"},
];

/* Duplicate for seamless loop */
const ROW1 = [...ALL_CLIENTS, ...ALL_CLIENTS];
const ROW2 = [...ALL_CLIENTS.slice(4), ...ALL_CLIENTS.slice(0,4), ...ALL_CLIENTS.slice(4), ...ALL_CLIENTS.slice(0,4)];

/* ── SINGLE CARD ── */
function MarqueeCard({ client }: { client: typeof ALL_CLIENTS[0] }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: 300,
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${client.color}35` : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "24px 22px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Glow on hover */}
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%",
        width: 160, height: 160, borderRadius: "50%",
        background: `${client.color}10`, filter: "blur(40px)",
        pointerEvents: "none", opacity: hov ? 1 : 0, transition: "opacity 0.4s",
      }} />

      {/* Logo + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${client.color}15`, border: `1px solid ${client.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 12, color: client.color }}>{client.logo}</span>
        </div>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, color: T.cream }}>{client.name}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.32)", marginTop: 1 }}>{client.industry}</div>
        </div>
      </div>

      {/* Result */}
      <div style={{ background: `${client.color}0D`, border: `1px solid ${client.color}18`, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 22, color: client.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{client.result.value}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3, letterSpacing: "0.06em" }}>{client.result.metric}</div>
      </div>

      {/* Quote */}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 14 }}>
        "{client.quote}"
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${client.color}18`, border: `1px solid ${client.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, color: client.color }}>{client.author.split(" ").map(w=>w[0]).join("")}</span>
        </div>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{client.author}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.28)" }}>{client.role}</div>
        </div>
      </div>

      {/* Service tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {client.services.map(s => (
          <span key={s} style={{ fontFamily: "Inter, sans-serif", fontSize: 9, padding: "3px 8px", borderRadius: 999, border: `1px solid ${SERVICE_COLORS[s]}30`, color: SERVICE_COLORS[s], letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {SERVICES_MAP[s]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── MARQUEE ROW ── */
function MarqueeRow({
  clients,
  direction = "left",
  speed = 40,
}: {
  clients: typeof ALL_CLIENTS;
  direction?: "left" | "right";
  speed?: number;
}) {
  const [paused, setPaused] = useState(false);

  // Total width of one set: card width (300) + gap (16) × count
  const totalWidth = clients.length / 2 * (300 + 16);

  return (
    <div
      style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        style={{ display: "flex", gap: 16, width: "max-content" }}
        animate={{ x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            // pause on hover
          },
        }}
        // Pause by reducing playback rate to 0 via CSS
      >
        <style>{`
          @keyframes marquee-left  { from { transform: translateX(0); }         to { transform: translateX(-${totalWidth}px); } }
          @keyframes marquee-right { from { transform: translateX(-${totalWidth}px); } to { transform: translateX(0); } }
        `}</style>
        {clients.map((client, i) => (
          <MarqueeCard key={`${client.id}-${i}`} client={client} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── PURE CSS MARQUEE (most reliable infinite loop) ── */
function CSSMarqueeRow({
  clients,
  direction = "left",
  speed = 40,
}: {
  clients: typeof ALL_CLIENTS;
  direction?: "left" | "right";
  speed?: number;
}) {
  const animName = direction === "left" ? "scroll-left" : "scroll-right";
  const totalW = (clients.length / 2) * (300 + 16);

  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
      <style>{`
        @keyframes scroll-left  { 0% { transform: translateX(0); } 100% { transform: translateX(-${totalW}px); } }
        @keyframes scroll-right { 0% { transform: translateX(-${totalW}px); } 100% { transform: translateX(0); } }
      `}</style>
      <div
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {clients.map((client, i) => (
          <MarqueeCard key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

/* ── EXPORTED SECTION ── */
export function ClientsMarqueeSection() {
  return (
    <section style={{ padding: "60px 0 120px", position: "relative", zIndex: 1, overflow: "hidden" }}>

      {/* Section label */}
      <div style={{ padding: "0 24px", maxWidth: 1200, margin: "0 auto 40px" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 28, height: 1, background: T.amber, display: "block" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>All Clients</span>
        </motion.div>
      </div>

      <CSSMarqueeRow clients={ROW1} direction="left" speed={45} />
    </section>
  );
}