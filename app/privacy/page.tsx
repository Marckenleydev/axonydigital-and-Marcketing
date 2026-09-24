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

export default function PrivacyPage() {
  const [r, v] = useRev();

  return (
    <div className="orbit-page" style={{ fontFamily: "Inter, sans-serif", background: T.cream, minHeight: "100vh" }}>
      <Cursor />
      <OrbitBackground />
      <Navbar />

      {/* Hero */}
      <section style={{ background: T.creamDark, padding: "160px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div ref={r} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(3rem, 8vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: T.ink, marginBottom: 28, maxWidth: 800 }}>
            Privacy<br /><span style={{ fontStyle: "italic", color: T.amber }}>Policy.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ fontFamily: "Inter, sans-serif", color: `${T.ink}65`, fontSize: 17, maxWidth: 440, lineHeight: 1.75 }}>
            Last updated: August 2026. Your privacy is important to us.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: T.ink, padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <motion.div ref={r} variants={stag()} initial="hidden" animate={v ? "visible" : "hidden"}>
            {[
              {
                title: "Information We Collect",
                content: "We collect information you provide directly, such as your name, email address, and any other information you choose to share when contacting us or using our services. We may also collect technical data about your device and browsing behavior for analytics and improvement purposes."
              },
              {
                title: "How We Use Your Information",
                content: "Your information is used to provide and improve our services, communicate with you about projects and inquiries, and analyze usage patterns to enhance our website performance. We do not sell your personal data to third parties."
              },
              {
                title: "Data Security",
                content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure."
              },
              {
                title: "Third-Party Services",
                content: "We may use third-party services for analytics, hosting, and communication. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these external services."
              },
              {
                title: "Your Rights",
                content: "You have the right to access, correct, or delete your personal data. You may also opt out of certain communications. To exercise these rights, please contact us using the information provided on our website."
              },
              {
                title: "Cookies",
                content: "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences."
              },
              {
                title: "Contact Us",
                content: "If you have questions about this Privacy Policy or how we handle your data, please contact us at info@veraa.digital. We will respond to your inquiries within a reasonable timeframe."
              }
            ].map((section, i) => (
              <motion.div key={i} variants={fadeUp} style={{ marginBottom: 48, borderBottom: `1px solid ${T.cream}10`, paddingBottom: 32 }}>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: T.cream, marginBottom: 16, letterSpacing: "-0.02em" }}>
                  {section.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: `${T.cream}60`, fontSize: 15, lineHeight: 1.8 }}>
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
