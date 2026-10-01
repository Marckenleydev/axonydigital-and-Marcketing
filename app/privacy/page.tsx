"use client";
import { useRef } from "react";
import { OrbitBackground } from "../components/OrbitBackground";
import { motion, useInView } from "framer-motion";
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

const SECTIONS = [
  {
    n: "01",
    title: "Who We Are",
    content: "Axony Digital (\"we\", \"us\", or \"our\") is a digital agency based in Dubai, UAE, operating at axony.digital. We provide web development, Meta advertising, and content production services. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website or engage our services."
  },
  {
    n: "02",
    title: "Information We Collect",
    content: "We collect information you provide directly to us — such as your name, email address, phone number, company name, and project details when you contact us through our website, submit a project brief, or communicate with us via email or phone. We also collect technical data automatically, including your IP address, browser type, device information, pages visited, and time spent on our site."
  },
  {
    n: "03",
    title: "How We Use Your Information",
    content: "We use the information we collect to respond to your enquiries and provide our services, send project updates, invoices, and relevant communications, improve and personalise your experience on our website, comply with legal obligations, and protect against fraud or misuse. We do not sell, rent, or trade your personal data to third parties."
  },
  {
    n: "04",
    title: "Legal Basis for Processing",
    content: "Where applicable under GDPR or similar regulations, we process your data on the basis of your consent (e.g. contact forms), performance of a contract (e.g. service delivery), our legitimate interests (e.g. improving our services and preventing fraud), and compliance with a legal obligation. You may withdraw consent at any time by contacting us at info@axony.digital."
  },
  {
    n: "05",
    title: "Data Sharing & Third Parties",
    content: "We may share your information with trusted third-party service providers who assist in operating our business — including hosting providers, analytics platforms (such as Google Analytics), email services, and payment processors. These parties are contractually obligated to handle your data securely and only for the purposes we specify. We may also disclose your information if required by law or to protect our legal rights."
  },
  {
    n: "06",
    title: "Data Retention",
    content: "We retain your personal data for as long as necessary to fulfil the purposes described in this policy, maintain our business records, and comply with applicable legal requirements. Client project data is typically retained for five years post-project completion. You may request deletion of your data at any time, subject to any overriding legal obligations."
  },
  {
    n: "07",
    title: "Your Rights",
    content: "Depending on your location, you may have the right to access the personal data we hold about you, request correction of inaccurate data, request erasure of your data, object to or restrict our processing of your data, request portability of your data, and lodge a complaint with a supervisory authority. To exercise any of these rights, contact us at info@axony.digital. We will respond within 30 days."
  },
  {
    n: "08",
    title: "Data Security",
    content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, alteration, or disclosure. Our website uses HTTPS encryption, and access to client data is restricted to authorised personnel only. While we take these precautions seriously, no method of data transmission over the internet is 100% secure."
  },
  {
    n: "09",
    title: "International Transfers",
    content: "Your data may be transferred to and processed in countries outside your country of residence, including countries that may not provide the same level of data protection. When we transfer data internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses approved by relevant authorities."
  },
  {
    n: "10",
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The updated version will be posted on this page with a revised date. We encourage you to review this policy periodically. Material changes will be communicated via email where we hold your contact details."
  },
  {
    n: "11",
    title: "Contact Us",
    content: "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us at: info@axony.digital — Axony Digital, Dubai, UAE. We are committed to resolving any privacy concerns promptly and transparently."
  },
];

export default function PrivacyPage() {
  const [heroRef, heroV] = useRev();
  const [bodyRef, bodyV] = useRev();

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
            Privacy<br /><span style={{ fontStyle: "italic", color: T.creamDark }}>Policy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={heroV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ color: `${T.cream}65`, fontSize: 17, maxWidth: 480, lineHeight: 1.75 }}>
            Last updated: August 2026. We take your privacy seriously — this policy explains exactly how we handle your data.
          </motion.p>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={heroV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 40 }}>
            {SECTIONS.map(s => (
              <a key={s.n} href={`#section-${s.n}`}
                style={{ fontFamily: "Inter, sans-serif", fontSize: 11, padding: "6px 14px", border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 999, color: `${T.cream}55`, textDecoration: "none", letterSpacing: "0.04em", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = T.amber; (e.currentTarget as HTMLAnchorElement).style.color = T.amber; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLAnchorElement).style.color = `${T.cream}55`; }}>
                {s.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <motion.div ref={bodyRef} variants={stag()} initial="hidden" animate={bodyV ? "visible" : "hidden"}>
            {SECTIONS.map((section, i) => (
              <motion.div key={i} id={`section-${section.n}`} variants={fadeUp}
                style={{ marginBottom: 52, paddingBottom: 40, borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
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
            style={{ marginTop: 20, padding: "36px 40px", border: `1px solid rgba(79,168,240,0.15)`, borderRadius: 16, background: "rgba(79,168,240,0.04)" }}>
            <p style={{ color: `${T.cream}55`, fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
              Have questions about how we handle your data?
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