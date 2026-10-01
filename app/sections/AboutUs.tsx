import { useRef, useEffect } from "react";

import { useInView, motion } from "framer-motion";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SplitText } from "gsap/all";

import { T } from "../data";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─────────────────────────── HELPERS ─────────────────────────── */

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

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

const skills = [
  { n: "Paid Advertising (Meta & Google)", p: 92 },
  { n: "Web Development & Conversion Optimization", p: 90 },
  { n: "Content & Creative Production", p: 85 },
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

/* ─────────────────────────── ABOUT ─────────────────────────── */

export function AboutUs() {
  const [lRef, lV] = useRev();
  const [rRef, rV] = useRev();

  const sectionRef = useRef<HTMLElement>(null);

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);

  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const rightBoxRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);

  const decorCircle1 = useRef<HTMLDivElement>(null);
  const decorCircle2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Headline word color animation ── */

      if (headlineRef.current) {
        const headlineSplit = SplitText.create(headlineRef.current, {
          type: "words",
        });

        gsap.fromTo(
          headlineSplit.words,
          {
            color: "rgba(255,255,255,0.55)",
          },
          {
            color: T.creamDark,
            ease: "none",
            stagger: 0.5,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      }

      /* ── Idle float animation on orbs ── */

      gsap.to(orb1Ref.current, {
        y: "+=18",
        x: "+=10",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(orb2Ref.current, {
        y: "-=14",
        x: "-=8",
        duration: 7.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(orb3Ref.current, {
        y: "+=10",
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* ── LEFT COLUMN ───────────────────────────────────── */

      // Eyebrow slides in from left on scroll enter

      gsap.fromTo(
        eyebrowRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Headline drifts left + skew as page scrolls past

      gsap.fromTo(
        headlineRef.current,
        { x: 0, skewX: 0 },
        {
          x: -45,
          skewX: -1.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        }
      );

      // Para 1 counter-drifts right

      gsap.fromTo(
        para1Ref.current,
        { x: 0 },
        {
          x: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.2,
          },
        }
      );

      // Para 2 drifts left

      gsap.fromTo(
        para2Ref.current,
        { x: 0 },
        {
          x: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.8,
          },
        }
      );

      // Value items stagger-wipe in with clip-path

      const items =
        valuesRef.current?.querySelectorAll<HTMLElement>(".value-item");

      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });

      // CTA button bounces in

      gsap.fromTo(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── RIGHT COLUMN ──────────────────────────────────── */

      // Whole right box rises slower than left

      gsap.fromTo(
        rightBoxRef.current,
        { y: 60 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        }
      );

      // Skills block drifts upward independently

      gsap.fromTo(
        skillsRef.current,
        { y: 30 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: rightBoxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // Quote slides in from right

      gsap.fromTo(
        quoteRef.current,
        {
          x: 60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 88%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Decorative circles spin + drift at different speeds

      gsap.fromTo(
        decorCircle1.current,
        { y: 0, rotate: 0 },
        {
          y: -80,
          rotate: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        decorCircle2.current,
        { y: 0, rotate: 0 },
        {
          y: -50,
          rotate: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .eyebrow-container {
            justify-content: center !important;
          }

          .eyebrow-line {
            display: none !important;
          }

          .eyebrow-text {
            text-align: center !important;
          }

          .section-title {
            text-align: center !important;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
          gap: "clamp(40px, 8vw, 80px)",
          alignItems: "start",
          width: "100%",
        }}
      >
        {/* ══════════ LEFT COLUMN ══════════ */}

        <motion.div
          ref={lRef}
          initial={{ opacity: 0, x: -36 }}
          animate={lV ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{ width: "100%" }}
        >
          {/* Eyebrow */}

          <div
            ref={eyebrowRef}
            className="eyebrow-container"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 2vw, 12px)",
              marginBottom: "clamp(16px, 3vh, 20px)",
              flexWrap: "wrap",
              willChange: "transform",
            }}
          >
            <span
              className="eyebrow-line"
              style={{
                width: "clamp(24px, 4vw, 32px)",
                height: 1,
                background: T.amber,
                display: "block",
              }}
            />

            <span
              className="eyebrow-text"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(9px, 2vw, 10px)",
                color: T.amber,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              About Us
            </span>
          </div>

          {/* Headline */}

          <motion.h2
            ref={headlineRef}
            className="section-title"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2rem, 8vw, 5.5rem)",
              fontWeight: 900,
              color: T.cream,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: "clamp(20px, 4vh, 28px)",
              maxWidth: "100%",
              willChange: "transform",
            }}
          >
            Obsessed with
            <br />
            <span
              style={{
                fontStyle: "italic",
                color: T.cream,
              }}
            >
              Digital Craft.
            </span>
          </motion.h2>

          {/* Para 1 */}

          <p
            ref={para1Ref}
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.78,
              marginBottom: "clamp(16px, 3vh, 18px)",
              fontSize: "clamp(13px, 2.2vw, 14px)",
              maxWidth: "100%",
              willChange: "transform",
            }}
          >
            A team of technology, creativity, and strategy working together to
            transform ideas into digital experiences <em>that</em> perform.
          </p>

          {/* Para 2 */}

          <p
            ref={para2Ref}
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.78,
              marginBottom: "clamp(28px, 5vh, 36px)",
              fontSize: "clamp(13px, 2.2vw, 14px)",
              willChange: "transform",
            }}
          >
            Since 2024, we've partnered with businesses, and ambitious brands
            across Europe, the Middle East, From digital products to growth
            campaigns, we create tailored solutions built around strategy,
            innovation, and measurable results.
          </p>

          {/* Values */}

          <div ref={valuesRef}>
            {VALUES.map((v, vi) => (
              <motion.div
                key={v.t}
                className="value-item"
                initial={{ opacity: 0, x: -16 }}
                animate={lV ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.3 + vi * 0.1,
                  duration: 0.6,
                }}
                style={{
                  display: "flex",
                  gap: "clamp(12px, 2vw, 16px)",
                  marginBottom: "clamp(18px, 3vh, 22px)",
                  alignItems: "flex-start",
                  width: "100%",
                  willChange: "transform",
                }}
              >
                <span
                  style={{
                    color: T.amber,
                    fontSize: "clamp(16px, 3vw, 18px)",
                    marginTop: 2,
                    flexShrink: 0,
                  }}
                >
                  {v.i}
                </span>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      color: T.cream,
                      fontSize: "clamp(12px, 2.2vw, 13px)",
                      marginBottom: "clamp(2px, 1vh, 3px)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {v.t}
                  </div>

                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "clamp(12px, 2.2vw, 13px)",
                      lineHeight: 1.65,
                    }}
                  >
                    {v.b}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}

          <motion.a
            ref={ctaRef}
            href="#contact"
            data-h
            initial={{ opacity: 0 }}
            animate={lV ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="contact-btn"
          >
            Work With Us →
          </motion.a>
        </motion.div>

        {/* ══════════ RIGHT COLUMN ══════════ */}

        <motion.div
          ref={rRef}
          initial={{ opacity: 0, x: 36 }}
          animate={rV ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{
            position: "relative",
            width: "100%",
            marginTop: "clamp(0px, 2vh, 20px)",
          }}
        >
          {/* Main content box */}

          <div
            ref={rightBoxRef}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid rgba(255,255,255,0.1)`,
              padding:
                "clamp(24px, 4vh, 40px) clamp(20px, 3vw, 40px)",
              width: "100%",
              boxSizing: "border-box",
              willChange: "transform",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(9px, 2vw, 10px)",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: "clamp(24px, 4vh, 36px)",
              }}
            >
              Technical Expertise
            </div>

            {/* Skills */}

            <div
              ref={skillsRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(20px, 3vh, 28px)",
                willChange: "transform",
              }}
            >
              {skills.map((s, si) => (
                <div key={s.n} style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "clamp(8px, 2vw, 16px)",
                      marginBottom: "clamp(6px, 1.5vh, 10px)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(12px, 2.2vw, 13px)",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {s.n}
                    </span>

                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(10px, 2vw, 11px)",
                        color: T.amber,
                      }}
                    >
                      {s.p}%
                    </span>
                  </div>

                  <div
                    style={{
                      height: 1,
                      background: "rgba(255,255,255,0.2)",
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={rV ? { scaleX: 1 } : {}}
                      transition={{
                        duration: 1.3,
                        delay: 0.2 + si * 0.1,
                        ease,
                      }}
                      style={{
                        transformOrigin: "left",
                        width: `${s.p}%`,
                        height: "100%",
                        background: T.amber,
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}

            <blockquote
              ref={quoteRef}
              style={{
                marginTop: "clamp(28px, 5vh, 40px)",
                paddingTop: "clamp(20px, 3vh, 28px)",
                willChange: "transform",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 3vw, 18px)",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.55,
                  marginBottom: "clamp(12px, 2vh, 16px)",
                }}
              >
                "We don't just build digital solutions — we create experiences
                that deliver clarity, performance, and measurable growth."
              </p>

              <footer
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 2vw, 12px)",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "clamp(32px, 6vw, 36px)",
                    height: "clamp(32px, 6vw, 36px)",
                    background: `${T.amber}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${T.amber}35`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: T.amber,
                      fontWeight: 900,
                      fontSize: "clamp(11px, 2vw, 13px)",
                    }}
                  >
                    A
                  </span>
                </div>

                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(11px, 2.2vw, 12px)",
                      color: "rgba(255,255,255,0.9)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Marckenley Dorsainvil
                  </span>

                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(9px, 1.8vw, 10px)",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.2em",
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Founder & Lead Engineer
                  </span>
                </div>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}