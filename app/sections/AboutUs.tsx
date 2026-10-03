import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { T } from "../data";

const ease = [0.22, 1, 0.36, 1];

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

const skills = [
  { n: "Paid Advertising (Meta & Google)",            p: 92 },
  { n: "Web Development & Conversion Optimization",   p: 90 },
  { n: "Content & Creative Production",               p: 85 },
];

const VALUES = [
  {
    i: "◈",
    t: "Purposeful Creation",
    b: "We craft every digital experience with intention, combining strategy, design, and technology to elevate brands.",
  },
  {
    i: "◉",
    t: "Complete Partnership",
    b: "We work alongside our clients with transparency, communication, and a shared commitment to success.",
  },
  {
    i: "⬡",
    t: "Results Driven",
    b: "From digital products to marketing campaigns, every solution is built to engage audiences and accelerate growth.",
  },
];

export function AboutUs() {
  const [lRef, lV] = useRev();
  const [rRef, rV] = useRev();

  return (
    <section
      id="about"
      style={{
        padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .eyebrow-container { justify-content: center !important; }
          .eyebrow-line       { display: none !important; }
          .eyebrow-text       { text-align: center !important; }
          .section-title      { text-align: center !important; }
        }
      `}</style>

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
        gap: "clamp(40px, 8vw, 80px)",
        alignItems: "start",
        width: "100%",
      }}>

        {/* ── LEFT COLUMN ── */}
        <motion.div
          ref={lRef}
          initial={{ opacity: 0, x: -36 }}
          animate={lV ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{ width: "100%" }}
        >
          {/* Eyebrow */}
          <div
            className="eyebrow-container"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
              marginBottom: "clamp(16px, 3vh, 20px)",
              flexWrap: "wrap",
            }}
          >
            <span className="eyebrow-line" style={{ width: "clamp(24px, 4vw, 32px)", height: 1, background: T.amber, display: "block" }} />
            <span className="eyebrow-text" style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(9px, 2vw, 10px)",
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}>
              About Us
            </span>
          </div>

          {/* Headline */}
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={lV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2rem, 8vw, 5.5rem)",
              fontWeight: 900,
              color: T.cream,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: "clamp(20px, 4vh, 28px)",
            }}
          >
            Obsessed with
            <br />
            <span style={{ fontStyle: "italic", color: T.cream }}>Digital Craft.</span>
          </motion.h2>

          {/* Para 1 */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={lV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.78,
              marginBottom: "clamp(16px, 3vh, 18px)",
              fontSize: "clamp(13px, 2.2vw, 14px)",
            }}
          >
            A team of technology, creativity, and strategy working together to
            transform ideas into digital experiences <em>that</em> perform.
          </motion.p>

          {/* Para 2 */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={lV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.78,
              marginBottom: "clamp(28px, 5vh, 36px)",
              fontSize: "clamp(13px, 2.2vw, 14px)",
            }}
          >
            Since 2024, we've partnered with businesses, and ambitious brands
            across Europe, the Middle East. From digital products to growth
            campaigns, we create tailored solutions built around strategy,
            innovation, and measurable results.
          </motion.p>

          {/* Values */}
          <div>
            {VALUES.map((v, vi) => (
              <motion.div
                key={v.t}
                className="value-item"
                initial={{ opacity: 0, x: -16 }}
                animate={lV ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + vi * 0.1, duration: 0.6 }}
                style={{
                  display: "flex",
                  gap: "clamp(12px, 2vw, 16px)",
                  marginBottom: "clamp(18px, 3vh, 22px)",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <span style={{ color: T.amber, fontSize: "clamp(16px, 3vw, 18px)", marginTop: 2, flexShrink: 0 }}>
                  {v.i}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    color: T.cream,
                    fontSize: "clamp(12px, 2.2vw, 13px)",
                    marginBottom: "clamp(2px, 1vh, 3px)",
                    letterSpacing: "0.04em",
                  }}>
                    {v.t}
                  </div>
                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "clamp(12px, 2.2vw, 13px)",
                    lineHeight: 1.65,
                  }}>
                    {v.b}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#contact"
            data-h
            initial={{ opacity: 0, y: 16 }}
            animate={lV ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="contact-btn"
          >
            Work With Us →
          </motion.a>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          ref={rRef}
          initial={{ opacity: 0, x: 36 }}
          animate={rV ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{ position: "relative", width: "100%", marginTop: "clamp(0px, 2vh, 20px)" }}
        >
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "clamp(24px, 4vh, 40px) clamp(20px, 3vw, 40px)",
            width: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(9px, 2vw, 10px)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "clamp(24px, 4vh, 36px)",
            }}>
              Technical Expertise
            </div>

            {/* Skills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vh, 28px)" }}>
              {skills.map((s, si) => (
                <div key={s.n} style={{ width: "100%" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "clamp(8px, 2vw, 16px)",
                    marginBottom: "clamp(6px, 1.5vh, 10px)",
                    flexWrap: "wrap",
                  }}>
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(12px, 2.2vw, 13px)",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                    }}>
                      {s.n}
                    </span>
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(10px, 2vw, 11px)",
                      color: T.amber,
                    }}>
                      {s.p}%
                    </span>
                  </div>
                  <div style={{
                    height: 1,
                    background: "rgba(255,255,255,0.2)",
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                  }}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={rV ? { scaleX: 1 } : {}}
                      transition={{ duration: 1.3, delay: 0.2 + si * 0.1, ease }}
                      style={{
                        transformOrigin: "left",
                        width: `${s.p}%`,
                        height: "100%",
                        background: T.amber,
                        position: "absolute",
                        top: 0, left: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 30 }}
              animate={rV ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              style={{ marginTop: "clamp(28px, 5vh, 40px)", paddingTop: "clamp(20px, 3vh, 28px)" }}
            >
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 3vw, 18px)",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.55,
                marginBottom: "clamp(12px, 2vh, 16px)",
              }}>
                "We don't just build digital solutions — we create experiences
                that deliver clarity, performance, and measurable growth."
              </p>

              <footer style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 12px)", flexWrap: "wrap" }}>
              
              </footer>
            </motion.blockquote>
          </div>
        </motion.div>

      </div>
    </section>
  );
}