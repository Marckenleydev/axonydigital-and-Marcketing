


"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { T } from "../data";
import { SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);



export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

   // Refs for the three text parts
  const line1Ref   = useRef<HTMLDivElement>(null); // "Scale your revenue with"
  const badgeRef   = useRef<HTMLDivElement>(null); // "predictable" pill
  const line2Ref   = useRef<HTMLDivElement>(null); // "

  const [isMobile, setIsMobile] = useState(false);

 
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

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const line1 = line1Ref.current;
    const badge = badgeRef.current;
    const line2 = line2Ref.current;

    const splitInstances: SplitText[] = [];

    // Set the initial animation states before removing the CSS guard.
    // This prevents the original, unsplit text from flashing.
    gsap.set([line1, line2].filter(Boolean), {
      autoAlpha: 1,
    });

    if (badge) {
      gsap.set(badge, {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });
    }

    const tl = gsap.timeline();

    // First line
    if (line1) {
      const split1 = SplitText.create(line1, {
        type: "chars",
        charsClass: "hero-char",
      });

      splitInstances.push(split1);

      gsap.set(split1.chars, {
        yPercent: 110,
        autoAlpha: 0,
      });

      tl.to(
        split1.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.025,
          ease: "power3.out",
        },
        0.1
      );
    }

    // Predictable badge
    if (badge) {
      tl.to(
        badge,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.55
      );
    }

    // Second line
    if (line2) {
      const split2 = SplitText.create(line2, {
        type: "chars",
        charsClass: "hero-char",
      });

      splitInstances.push(split2);

      gsap.set(split2.chars, {
        yPercent: 110,
        autoAlpha: 0,
      });

      tl.to(
        split2.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.025,
          ease: "power3.out",
        },
        0.95
      );
    }

    // All elements now have their GSAP initial states.
    // Removing this class is safe before the next browser paint.
    document.documentElement.classList.remove("js-enabled");

    return () => {
      splitInstances.forEach((split) => split.revert());
    };
  }, sectionRef);

  return () => {
    ctx.revert();

    // Restore the safe default for cleanup and remounts.
    document.documentElement.classList.remove("js-enabled");
  };
}, []);

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
          end: "bottom bottom+=90",
          scrub: 1.5,
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

      tl.to(headingRef.current, {
  scale: 1.15,
  opacity: 0,
  ease: "power2.out",
  duration: 0.9,
}, 0);

      // ------------------------------------------------
      // STEP 2
      // SUBTITLE + CTA FADE OUT
      // ------------------------------------------------
      // Because both the paragraph and button are inside
      // subRef, they fade together automatically.
      //
      // The fade begins immediately when scrolling starts.
      // ------------------------------------------------

      tl.to(
        subRef.current,
        {
         scale: 1.15,
  opacity: 0,
  ease: "power2.out",
  duration: 0.4,
}, 0);

      // ------------------------------------------------
      // STEP 3
      // DASHBOARD MOVES UP
      // ------------------------------------------------

      tl.to(
        imageRef.current,
        {
          y: "-45vh",
          scale: 1,
          ease: "power2.out",
          duration: 1,
        },
        0
      );

      // ------------------------------------------------
      // STEP 4
      // DASHBOARD SCALE
      // ------------------------------------------------

      tl.to(imageRef.current, {
        scale: 1.18,
        ease: "none",
        duration: 1,
      });

      // ------------------------------------------------
      // STEP 5
      // HOLD DASHBOARD SCALE
      // ------------------------------------------------

      tl.to(imageRef.current, {
        scale: 1.18,
        ease: "none",
        duration: 0.5,
      });

      // ------------------------------------------------
      // STEP 6
      // FINAL DASHBOARD POSITION
      // ------------------------------------------------

      tl.to(imageRef.current, {
        scale: 1.18,
        y: "-50vh",
        ease: "none",
        duration: 0.5,
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
              ease: "easeOut",
            }}
            style={{
              marginBottom: isMobile ? "22px" : "clamp(16px, 3vh, 28px)",
              width: "100%",
            }}
          >
            {/* Eyebrow content stays here */}
          </motion.div>

          {/* =================================================
              HEADING
              ================================================= */}

          <div
            ref={headingRef}
            style={{
              willChange:   isMobile ? "auto" : "transform, opacity",
              marginBottom: isMobile ? "24px" : "clamp(16px,3vh,28px)",
              width:        "100%",
            }}
          >
            <h1
             className="hero-title"
              style={{
                fontFamily:    "Inter, sans-serif",
                fontSize:      isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2.5rem,7vw,5rem)",
                fontWeight:    isMobile ? 600 : 800,
                lineHeight:    1.1,
                letterSpacing: "-0.035em",
                color:         T.creamDark,
                maxWidth:      isMobile ? "100%" : "min(1100px,100%)",
                margin:        "0 auto",
                textAlign:     "center",
                // allow inline-flex for badge to sit inline
                display:       "flex",
                flexWrap:      "wrap",
                justifyContent:"center",
                alignItems:    "center",
                gap:           "0.28em",
                rowGap:        "0.18em",
              }}
            >
              {/* LINE 1 — "Scale your revenue with" — chars animate up */}
              <span
               className="hero-line"
                ref={line1Ref}
                style={{
                  display:    "block",
                  overflow:   "hidden",
                  width:      "100%",
                  // clip chars rising from below
                  paddingBottom: "0.08em",
                }}
              >
                Scale your revenue with
              </span>

              {/* BADGE — "predictable" — clipPath wipe */}
              <span
                ref={badgeRef}
                 className="hero-badge"
                style={{
                  display:       "inline-block",
                  background:    T.amber,           // your brand blue
                  color:         "#050E1F",
                  fontStyle:     "italic",
                  fontWeight:    800,
                  borderRadius:  "0",
                  padding:       isMobile ? "4px 18px" : "6px 28px",
                  fontSize:      isMobile ? "clamp(1.6rem,7vw,2.4rem)" : "clamp(2.2rem,6vw,4.4rem)",
                  lineHeight:    1.1,
                  letterSpacing: "-0.03em",
                  // starts invisible — GSAP drives the reveal
                  clipPath:      "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  whiteSpace:    "nowrap",
                }}
              >
                predictable
              </span>

              {/* LINE 2 — "web marketing." — chars animate up */}
              <span
                ref={line2Ref}
                className="hero-line"
                style={{
                  display:       "block",
                  overflow:      "hidden",
                  width:         "100%",
                  paddingBottom: "0.08em",
                }}
              >
                web marketing.
              </span>
            </h1>
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
                delay: 0.6,
              }}
              style={{
                fontFamily: "var(--font-roboto), sans-serif",

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
            Strategy, digital experiences, and creative campaigns designed to move your business forward.
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
                delay: 0.7,
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
                    fontSize: isMobile
                      ? "19px"
                      : "clamp(16px, 3vw, 18px)",
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
                delay: 0.9,
                ease: "easeOut",
              }}
            >
              <img
                src="/images/marketing-dashboard-5.png"
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