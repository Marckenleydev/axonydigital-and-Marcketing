import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { T, SERVICESHome as SERVICES } from "../data";

/* ─────────────────────────── SERVICES ─────────────────────────── */

export function Services() {
  function useRev(margin = "-70px") {
    const r = useRef(null);
    const v = useInView(r, { once: true, margin });
    return [r, v];
  }

  const ease = [0.22, 1, 0.36, 1];

  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease },
    },
  };

  const stag = (d = 0) => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: d,
      },
    },
  });

  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const [r, v] = useRev();

 

  return (
    <section
      id="services"
      style={{
        background: T.cream,
        padding: "120px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <motion.div
          ref={r}
          variants={stag()}
          initial="hidden"
          animate={v ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: T.amber,
                display: "block",
              }}
            />

            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                color: T.amber,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              What We Do
            </span>
          </motion.div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 56,
            }}
          >
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 900,
                color: T.ink,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Our{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: T.amber,
                }}
              >
                Core
              </span>
              <br />
              Services.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "Inter, sans-serif",
                color: `${T.ink}55`,
                maxWidth: 320,
                lineHeight: 1.75,
                fontSize: 14,
              }}
            >
              Three disciplines, one integrated team. Every service works in
              concert; so your digital presence is coherent, fast, and
              beautiful.
            </motion.p>
          </div>
        </motion.div>

        <div
          style={{
            borderTop: `1px solid ${T.sand}50`,
          }}
        >
          {SERVICES.map((svc, i) => (
            <div
              key={svc.n}
              style={{
                borderBottom: `1px solid ${T.sand}50`,
                position: "relative",
              }}
              onMouseEnter={(e) => {
                setHovered(i);

                const video = e.currentTarget.querySelector("video");

                if (video) {
                  video.play().catch(() => {});
                }
              }}
              onMouseLeave={(e) => {
                setHovered(null);

                const video = e.currentTarget.querySelector("video");

                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            >
             


              <button
                onClick={() => setOpen(open === i ? null : i)}
                data-h
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "28px 0",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  textAlign: "left",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: T.sand,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {svc.n}
                  </span>

                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                      fontWeight: 900,
                      color: open === i ? T.amber : T.ink,
                      transition: "color 0.3s",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {svc.title}
                  </span>
                </div>

                <motion.div
                  animate={{
                    rotate: open === i ? 45 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  style={{
                    width: 38,
                    height: 38,
                    border: `1px solid ${T.sand}70`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.ink,
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  +
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: open === i ? "auto" : 0,
                  opacity: open === i ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease,
                }}
                style={{
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    paddingBottom: 36,
                    paddingLeft: 66,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 28,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: `${T.ink}55`,
                      lineHeight: 1.75,
                      fontSize: 14,
                    }}
                  >
                    {svc.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      alignContent: "flex-start",
                    }}
                  >
                    {svc.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 10,
                          padding: "6px 12px",
                          border: `1px solid ${T.sand}60`,
                          color: `${T.ink}50`,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
