


"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { T } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  const lines = [
    {
      segments: [
        { text: "WE TURN", italic: false },
        { text: "ATTENTION", italic: true },
      ],
    },
    {
      segments: [{ text: "Into Sales", italic: false }],
    },
  ];

  // ------------------------------------------------
  // DETECT MOBILE
  // ------------------------------------------------

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // ------------------------------------------------
  // DESKTOP SCROLL ANIMATION ONLY
  // ------------------------------------------------

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      // ------------------------------------------------
      // INITIAL STATES
      // ------------------------------------------------

      gsap.set(headingRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        transformOrigin: "center center",
      });

      gsap.set(subRef.current, {
        opacity: 1,
        y: 0,
      });

      gsap.set(imageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        transformOrigin: "center center",
      });

      // ------------------------------------------------
      // MAIN DESKTOP SCROLL TIMELINE
      // ------------------------------------------------

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ------------------------------------------------
      // STEP 1
      // HEADING DISAPPEARS
      // ------------------------------------------------

      tl.to(
        headingRef.current,
        {
          scale: 1.15,
          opacity: 0,
          ease: "power1.inOut",
          duration: 2,
        },
        0
      );

      // ------------------------------------------------
      // SUBTITLE DISAPPEARS
      // ------------------------------------------------

      tl.to(
        subRef.current,
        {
          opacity: 0,
          y: -15,
          ease: "power1.inOut",
          duration: 2,
        },
        0
      );

      // ------------------------------------------------
      // DASHBOARD MOVES UP
      // ------------------------------------------------

      tl.to(
        imageRef.current,
        {
          y: "-50vh",
          scale: 1,
          ease: "none",
          duration: 1.2,
        },
        0
      );

      // ------------------------------------------------
      // DASHBOARD SCALE
      // ------------------------------------------------

      tl.to(imageRef.current, {
        scale: 1.18,
        ease: "power2.inOut",
        duration: 1,
      });

      tl.to(imageRef.current, {
        scale: 1.18,
        ease: "none",
        duration: 0.5,
      });

      tl.to(imageRef.current, {
        scale: 1.18,
        y: "-50vh",
        ease: "none",
        duration: 0.1,
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",

        // Desktop = scroll animation
        // Mobile = natural page height
        height: isMobile ? "auto" : "400vh",

        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      }}
    >
      {/* =================================================
          HERO VIEWPORT
          ================================================= */}

      <div
        ref={stickyRef}
        style={{
          position: "relative",

          // Desktop pinned viewport
          // Mobile natural height
          height: isMobile ? "auto" : "100vh",

          minHeight: isMobile ? "auto" : "100vh",

          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",

          overflow: isMobile ? "visible" : "hidden",

          paddingTop: isMobile
            ? "clamp(115px, 22vw, 150px)"
            : "clamp(100px, 14vh, 140px)",

          paddingBottom: isMobile
            ? "40px"
            : "clamp(32px, 5vh, 56px)",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 10,

            width: "100%",

            maxWidth: isMobile ? "100%" : 1200,

            padding: isMobile
              ? "0 16px"
              : "0 clamp(16px, 5vw, 24px)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            textAlign: "center",
          }}
        >
          {/* =================================================
              EYEBROW
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease,
            }}
            style={{
              marginBottom: isMobile ? "22px" : "clamp(16px, 3vh, 28px)",
              width: "100%",
            }}
          >
            {/* <span
              style={{
                fontFamily: "Inter, sans-serif",

                fontSize: isMobile
                  ? "10px"
                  : "clamp(9px, 2vw, 11px)",

                color: T.amber,

                letterSpacing: isMobile
                  ? "0.24em"
                  : "0.28em",

                textTransform: "uppercase",

                whiteSpace: "nowrap",
              }}
            >
              Premium Digital Agency · Est. 2024
            </span> */}
          </motion.div>

          {/* =================================================
              HEADING
              ================================================= */}

          <div
            ref={headingRef}
            style={{
              willChange: isMobile ? "auto" : "transform, opacity",

              marginBottom: isMobile
                ? "24px"
                : "clamp(16px, 3vh, 28px)",

              width: "100%",
            }}
          >
            <motion.h1
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.25,
              }}
              style={{
                fontFamily: "Inter, sans-serif",

                fontSize: isMobile
                  ? "clamp(1.8rem, 11vw, 3.2rem)"
                  : "clamp(2.8rem, 10.5vw, 7rem)",

                fontWeight: 600,

                lineHeight: isMobile ? 0.95 : 0.85,

                letterSpacing: "-0.035em",

                color: T.creamDark,

                maxWidth: isMobile
                  ? "100%"
                  : "min(1100px, 100%)",

                margin: "0 auto",

                textAlign: "center",
              }}
            >
              {lines.map((line, li) => (
                <span
                  key={li}
                  style={{
                    display: "block",
                    overflow: "hidden",
                  }}
                >
                  {line.segments.map((seg, wi) =>
                    seg.text.split(" ").map((word, i) => (
                      <span
                        key={`${li}-${wi}-${i}`}
                        style={{
                          overflow: "hidden",
                          display: "inline-block",
                          marginRight: "0.28em",
                        }}
                      >
                        <motion.span
                          initial={{
                            y: "115%",
                            rotate: 2,
                          }}
                          animate={{
                            y: "0%",
                            rotate: 0,
                          }}
                          transition={{
                            duration: 1,
                            delay:
                              0.3 +
                              li * 0.18 +
                              wi * 0.12 +
                              i * 0.07,
                            ease: ease as any,
                          }}
                          style={{
                            display: "inline-block",
                            color: T.creamDark,
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))
                  )}
                </span>
              ))}
            </motion.h1>
          </div>

          {/* =================================================
              SUBTITLE + CTA
              ================================================= */}

          <div
            ref={subRef}
            style={{
              willChange: isMobile ? "auto" : "opacity, transform",

              width: "100%",
            }}
          >
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.9,
              }}
              style={{
                fontFamily: "Inter, sans-serif",

                color: "rgba(255,255,255,0.55)",

                fontSize: isMobile
                  ? "16px"
                  : "clamp(15px, 2.5vw, 17px)",

                maxWidth: isMobile
                  ? "350px"
                  : "min(620px, 100%)",

                lineHeight: isMobile ? 1.65 : 1.7,

                margin: isMobile
                  ? "0 auto 24px"
                  : "0 auto clamp(20px, 3vh, 28px)",

                textAlign: "center",
              }}
            >
              Web platforms, marketing, and content built to scale ambitious
              businesses.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.05,
              }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a
                className="contact-btn"
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",

                  minWidth: isMobile ? "250px" : undefined,

                  padding: isMobile
                    ? "20px 38px"
                    : undefined,

                  borderRadius: isMobile ? "999px" : undefined,
                }}
              >
                Get in touch{" "}
                <span
                  style={{
                    fontSize: isMobile ? "19px" : "clamp(16px, 3vw, 18px)",
                  }}
                >
                  →
                </span>
              </a>
            </motion.div>
          </div>

          {/* =================================================
              DASHBOARD
              ================================================= */}

          <div
            ref={imageRef}
            style={{
              width: "100%",

              maxWidth: isMobile ? "100%" : 1000,

              marginTop: isMobile
                ? "54px"
                : "clamp(40px, 7vh, 80px)",

              opacity: 1,

              willChange: isMobile ? "auto" : "transform",

              position: "relative",
              zIndex: 5,

              // Mobile image is intentionally large
              padding: isMobile ? "0 0px" : undefined,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease,
              }}
            >
              <img
                src="/images/marketing-dashboard-4.png"
                alt="Digital marketing performance dashboard"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",

                  borderRadius: isMobile ? 18 : 16,

                  objectFit: "contain",

                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}