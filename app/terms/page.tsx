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

export default function TermsPage() {
  const [r, v] = useRev();

  return (
    <div className="orbit-page" style={{ fontFamily: "Inter, sans-serif",  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)", minHeight: "100vh" }}>
      <Cursor />
      <OrbitBackground />
      <Navbar />

      {/* Hero */}
      <section style={{  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)", padding: "160px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div ref={r} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: T.amber, display: "block" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: T.amber, letterSpacing: "0.28em", textTransform: "uppercase" }}>Legal</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(3rem, 8vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: T.cream, marginBottom: 28, maxWidth: 800 }}>
            Terms of<br /><span style={{ fontStyle: "italic", color: T.creamDark }}>Service.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ fontFamily: "Inter, sans-serif", color: `${T.cream}65`, fontSize: 17, maxWidth: 440, lineHeight: 1.75 }}>
            Last updated: August 2026. Please read these terms carefully.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)", padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <motion.div ref={r} variants={stag()} initial="hidden" animate={v ? "visible" : "hidden"}>
            {[
              {
                title: "Acceptance of Terms",
                content: "By accessing and using Axony Digital's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes."
              },
              {
                title: "Services Provided",
                content: "axony Digital provides web development, digital marketing, and related services as described on our website. We strive to deliver high-quality work, but specific outcomes and timelines may vary based on project scope, client cooperation, and external factors beyond our control."
              },
              {
                title: "Client Responsibilities",
                content: "Clients agree to provide accurate information, timely feedback, and necessary materials required for project completion. Delays caused by client inaction or incomplete information may affect project timelines and incur additional charges."
              },
              {
                title: "Payment Terms",
                content: "Payment terms are specified in individual project agreements. Deposits are required to initiate work, and final payments are due upon project completion. Late payments may result in project suspension or additional fees. All prices are in AED unless otherwise stated."
              },
              {
                title: "Intellectual Property",
                content: "Upon full payment, clients receive ownership of final deliverables as specified in their agreement. axony Digital retains rights to pre-existing code, frameworks, and tools. We reserve the right to showcase completed work in our portfolio unless otherwise agreed."
              },
              {
                title: "Confidentiality",
                content: "We agree to maintain the confidentiality of client information and project details. Both parties agree not to disclose sensitive information to third parties without prior written consent, except as required by law."
              },
              {
                title: "Limitation of Liability",
                content: "axony Digital shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question."
              },
              {
                title: "Termination",
                content: "Either party may terminate the agreement with written notice. Clients will be responsible for payment for work completed up to the termination date. axony Digital reserves the right to terminate services for violation of these terms or non-payment."
              },
              {
                title: "Contact Information",
                content: "For questions about these Terms of Service, please contact us at info@axony.digital. We are committed to addressing any concerns promptly and professionally."
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
