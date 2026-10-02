import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { T } from "../data";

const ease = [0.22, 1, 0.36, 1];

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

export function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", service: "", budget: "", msg: "",
  });
  const [focus, setFocus] = useState<string | null>(null);
  const [sent,  setSent]  = useState(false);
  const [r, v] = useRev();

  const up = (k: string, val: string) => setForm(f => ({ ...f, [k]: val }));

  const BUDGETS = ["AED 5k–15k", "AED 15k–40k", "AED 40k–100k", "AED 100k+"];

  const SVCS = [
    "Performance Marketing (Meta & Google Ads)",
    "Website & Conversion Optimization",
    "Content & Creative Production",
    "Growth Strategy",
  ];

  return (
    <section
      id="contact"
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

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div
          ref={r}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
            gap: "clamp(40px, 8vw, 80px)",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Left Column */}
          <div style={{ width: "100%" }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={v ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
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
                Let's Talk
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={v ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(2rem, 8vw, 5.5rem)",
                fontWeight: 900,
                color: T.cream,
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
                marginBottom: "clamp(20px, 4vh, 28px)",
              }}
            >
              Start Your
              <br />
              <span style={{ fontStyle: "italic", color: T.cream }}>Next Chapter.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={v ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: "Inter, sans-serif",
                color: `${T.cream}45`,
                lineHeight: 1.78,
                marginBottom: "clamp(32px, 5vh, 44px)",
                maxWidth: "min(400px, 100%)",
                fontSize: "clamp(13px, 2.2vw, 14px)",
              }}
            >
              Tell us about your project. We reply within 24 hours with an honest assessment, rough timeline, and a few ideas.
            </motion.p>

            {/* Contact info */}
            {[
              { l: "Email",    v: "info@axonydigital.com" },
              { l: "Based in", v: "Dubai · Remote" },
            ].map(item => (
              <div key={item.l} style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "clamp(12px, 3vw, 24px)",
                marginBottom: "clamp(12px, 2vh, 16px)",
                flexWrap: "wrap",
              }}>
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(9px, 2vw, 10px)",
                  color: `${T.cream}28`,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  minWidth: "clamp(70px, 15vw, 88px)",
                  flexShrink: 0,
                }}>
                  {item.l}
                </span>
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  color: `${T.cream}55`,
                  wordBreak: "break-word",
                  flex: 1,
                }}>
                  {item.v}
                </span>
              </div>
            ))}

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={v ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                border: `1px solid ${T.cream}12`,
                padding: "clamp(10px, 2vh, 12px) clamp(16px, 3vw, 20px)",
                marginTop: "clamp(28px, 5vh, 36px)",
                flexWrap: "wrap",
              }}
            >
              <span style={{
                width: 8, height: 8,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 0 3px rgba(74,222,128,0.25)",
                animation: "pulse 2s infinite",
              }} />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(9px, 2vw, 10px)",
                color: `${T.cream}40`,
                letterSpacing: "0.2em",
                whiteSpace: "nowrap",
              }}>
                Taking on new projects now
              </span>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            style={{ width: "100%", marginTop: "clamp(0px, 2vh, 20px)" }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "clamp(40px, 8vh, 80px) 0", width: "100%" }}
                >
                  <div style={{
                    width: "clamp(50px, 8vw, 60px)",
                    height: "clamp(50px, 8vw, 60px)",
                    border: `1px solid ${T.amber}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto clamp(16px, 3vh, 20px)",
                    color: T.amber,
                    fontSize: "clamp(20px, 4vw, 22px)",
                  }}>
                    ✓
                  </div>
                  <h3 style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(1.5rem, 5vw, 1.8rem)",
                    fontWeight: 900,
                    color: T.cream,
                    marginBottom: "clamp(6px, 1.5vh, 10px)",
                  }}>
                    Message Received.
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", color: `${T.cream}45`, fontSize: "clamp(12px, 2.2vw, 13px)" }}>
                    We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vh, 28px)", width: "100%" }}
                >
                  {/* Name & Email */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                    gap: "clamp(16px, 3vw, 28px)",
                    width: "100%",
                  }}>
                    {[
                      { k: "name",  l: "Name *",  pl: "Your full name" },
                      { k: "email", l: "Email *", pl: "info@axony.com" },
                    ].map(f => (
                      <div key={f.k} style={{ width: "100%" }}>
                        <div style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "clamp(8px, 1.8vw, 9px)",
                          color: `${T.cream}35`,
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          marginBottom: "clamp(4px, 1vh, 6px)",
                        }}>
                          {f.l}
                        </div>
                        <input
                          value={form[f.k as keyof typeof form]}
                          onChange={e => up(f.k, e.target.value)}
                          onFocus={() => setFocus(f.k)}
                          onBlur={() => setFocus(null)}
                          placeholder={f.pl}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            borderBottom: `1px solid ${focus === f.k ? T.amber : `${T.cream}18`}`,
                            padding: "clamp(10px, 2vh, 14px) 0",
                            fontFamily: "Inter, sans-serif",
                            color: T.cream,
                            fontSize: "clamp(13px, 2.2vw, 14px)",
                            outline: "none",
                            transition: "border-color 0.3s",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Service */}
                  <div style={{ width: "100%" }}>
                    <div style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(8px, 1.8vw, 9px)",
                      color: `${T.cream}35`,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      marginBottom: "clamp(8px, 1.5vh, 10px)",
                    }}>
                      Service Needed
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(6px, 1.5vw, 8px)", width: "100%" }}>
                      {SVCS.map(s => (
                        <button
                          key={s}
                          onClick={() => up("service", s)}
                          data-h
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "clamp(10px, 2vw, 11px)",
                            padding: "clamp(6px, 1.5vh, 8px) clamp(12px, 3vw, 16px)",
                            border: `1px solid ${form.service === s ? T.amber : `${T.cream}18`}`,
                            background: form.service === s ? `${T.amber}18` : "transparent",
                            color: form.service === s ? T.amber : `${T.cream}50`,
                            transition: "all 0.2s",
                            letterSpacing: "0.06em",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div style={{ width: "100%" }}>
                    <div style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(8px, 1.8vw, 9px)",
                      color: `${T.cream}35`,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      marginBottom: "clamp(4px, 1vh, 6px)",
                    }}>
                      Project Brief
                    </div>
                    <textarea
                      value={form.msg}
                      onChange={e => up("msg", e.target.value)}
                      onFocus={() => setFocus("msg")}
                      onBlur={() => setFocus(null)}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={4}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${focus === "msg" ? T.amber : `${T.cream}18`}`,
                        padding: "clamp(10px, 2vh, 14px) 0",
                        fontFamily: "Inter, sans-serif",
                        color: T.cream,
                        fontSize: "clamp(13px, 2.2vw, 14px)",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.3s",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={() => { if (form.name && form.email) setSent(true); }}
                    data-h
                    className="send-message-btn"
                  >
                    Send Message <span>→</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}