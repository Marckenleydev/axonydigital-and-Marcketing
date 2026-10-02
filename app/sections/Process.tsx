// /* ─────────────────────────── PROCESS ─────────────────────────── */

// import { useRef, useState, useEffect } from "react";
// import { useInView, motion, useScroll, useTransform } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/all";
// import { T, STEPS } from "../data";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// function useRev(margin = "-70px") {
//   const r = useRef(null);
//   const v = useInView(r, { once: true, margin });
//   return [r, v];
// }

// const ease = [0.22, 1, 0.36, 1];

// const fadeUp = {
//   hidden: { opacity: 0, y: 36 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.75, ease },
//   },
// };

// const stag = (d = 0) => ({
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: d,
//     },
//   },
// });

// /* ─────────────────────────── PROCESS SECTION ─────────────────────────── */

// export function Process() {
//   const [r, v] = useRev();

//   const sectionRef = useRef<HTMLElement>(null);
//   const orb1Ref = useRef<HTMLDivElement>(null);
//   const orb2Ref = useRef<HTMLDivElement>(null);
//   const orb3Ref = useRef<HTMLDivElement>(null);
//   const headlineRef = useRef<HTMLHeadingElement>(null);
//   const subRef = useRef<HTMLParagraphElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);


 

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       /* ── Heading word color ── */

//       if (headlineRef.current) {
//         const headlineSplit = SplitText.create(
//           headlineRef.current,
//           {
//             type: "words",
//           }
//         );

//         gsap.fromTo(
//           headlineSplit.words,
//           {
//             color: "rgba(255,255,255,0.55)",
//           },
//           {
//             color: T.creamDark,
//             ease: "none",
//             stagger: 0.5,

//             scrollTrigger: {
//               trigger: headlineRef.current,
//               start: "top 50%",
//               end: "bottom 50%",
//               scrub: true,
//             },
//           }
//         );
//       }

//       /* ── Idle float animation on orbs ── */

//       gsap.to(orb1Ref.current, {
//         y: "+=18",
//         x: "+=10",
//         duration: 6,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });

//       gsap.to(orb2Ref.current, {
//         y: "-=14",
//         x: "-=8",
//         duration: 7.5,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });

//       gsap.to(orb3Ref.current, {
//         y: "+=10",
//         duration: 5,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });

//       /* ── Headline horizontal skew + drift on scroll ── */

//       gsap.fromTo(
//         headlineRef.current,
//         {
//           x: 0,
//           skewX: 0,
//         },
//         {
//           x: -60,
//           skewX: -2,
//           ease: "none",

//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 1.4,
//           },
//         }
//       );

//       /* ── Sub paragraph drifts opposite direction ── */

//       gsap.fromTo(
//         subRef.current,
//         {
//           x: 0,
//         },
//         {
//           x: 40,
//           ease: "none",

//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: 1.8,
//           },
//         }
//       );

//       /* ── Cards stagger-reveal with slight rotation ── */

//       const cards =
//         gridRef.current?.querySelectorAll<HTMLElement>(
//           ".step-card"
//         );

//       cards?.forEach((card, i) => {
//         gsap.fromTo(
//           card,
//           {
//             y: 80,
//             opacity: 0,
//             rotateX: 8,
//           },
//           {
//             y: 0,
//             opacity: 1,
//             rotateX: 0,
//             duration: 0.9,
//             ease: "power3.out",

//             scrollTrigger: {
//               trigger: card,
//               start: "top 88%",
//               toggleActions: "play none none none",
//             },

//             delay: i * 0.07,
//           }
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="process"
//       style={{
//         padding:
//           "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
//         overflow: "hidden",
//         background:
//           "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
//         position: "relative",
//       }}
//     >
//       <style>{`
//         @media (max-width: 640px) {
//           .process-header {
//             text-align: center !important;
//           }
//           .process-eyebrow {
//             justify-content: center !important;
//           }
//           .process-line {
//             display: none !important;
//           }
//         }
//       `}</style>
//       <div
//         style={{
//           maxWidth: 1200,
//           margin: "0 auto",
//           width: "100%",
//         }}
//       >
//         <motion.div
//           ref={r}
//           variants={stag()}
//           initial="hidden"
//           animate={v ? "visible" : "hidden"}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             gap: "clamp(16px, 3vw, 24px)",
//             marginBottom: "clamp(40px, 8vh, 72px)",
//             width: "100%",
//           }}
//         >
//           <div style={{ width: "100%" }} className="process-header">
//             <motion.div
//               variants={fadeUp}
//               className="process-eyebrow"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "clamp(8px, 2vw, 12px)",
//                 marginBottom: "clamp(12px, 2vh, 18px)",
//                 flexWrap: "wrap",
//               }}
//             >
//               <span
//                 className="process-line"
//                 style={{
//                   width: "clamp(24px, 4vw, 32px)",
//                   height: 1,
//                   background: T.amber,
//                   display: "block",
//                 }}
//               />

//               <span
//                 style={{
//                   fontFamily: "Inter, sans-serif",
//                   fontSize: "clamp(9px, 2vw, 10px)",
//                   color: T.amber,
//                   letterSpacing: "0.28em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 How We Work
//               </span>
//             </motion.div>

//             <motion.h2
//               ref={headlineRef}
//               style={{
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "clamp(2rem, 8vw, 5.5rem)",
//                 fontWeight: 900,
//                 color: T.cream,
//                 letterSpacing: "-0.03em",
//                 lineHeight: 1.05,
//                 maxWidth: "100%",
//                 willChange: "transform",
//               }}
//             >
//               Our Process
//               <br />

//               <span
//                 style={{
//                   fontStyle: "italic",
//                   color: T.creamDark,
//                 }}
//               >
//                 Structured for Results.
//               </span>
//             </motion.h2>
//           </div>

//           <motion.p
//             ref={subRef}
//             variants={fadeUp}
//             style={{
//               fontFamily: "Inter, sans-serif",
//               color: "rgba(255,255,255,0.6)",
//               maxWidth: "min(400px, 100%)",
//               lineHeight: 1.75,
//               fontSize: "clamp(13px, 2vw, 14px)",
//               marginBottom: "clamp(8px, 2vh, 16px)",
//               willChange: "transform",
//             }}
//           >
//             A repeatable framework refined over four years and 87
//             projects. Transparent, collaborative, always on time.
//           </motion.p>
//         </motion.div>

//         {/* Responsive grid */}

//         <div
//           ref={gridRef}
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
//             gap: 2,
//             width: "100%",
//             willChange: "transform",
//             perspective: "1200px",
//           }}
//         >
//           {STEPS.map((s, i) => (
//             <StepCard key={s.n} s={s} i={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─────────────────────────── STEP CARD ─────────────────────────── */

// function StepCard({ s, i }) {
//   const [hov, setHov] = useState(false);

//   const cardRef = useRef<HTMLDivElement>(null);
//   const overlayRef = useRef<HTMLDivElement>(null);

//   /* ── Mouse-tracking tilt (local to each card) ── */

//   const handleMouseMove = (
//     e: React.MouseEvent<HTMLDivElement>
//   ) => {
//     const card = cardRef.current;

//     if (!card) return;

//     const rect = card.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const rotateY =
//       ((x / rect.width) - 0.5) * 10;

//     const rotateX =
//       ((y / rect.height) - 0.5) * -10;

//     gsap.to(card, {
//       rotateY,
//       rotateX,
//       duration: 0.4,
//       ease: "power2.out",
//     });

//     gsap.to(overlayRef.current, {
//       background: `radial-gradient(
//         circle at ${x}px ${y}px,
//         rgba(116,55,234,0.12) 0%,
//         rgba(5,14,31,0.35) 35%,
//         rgba(5,14,31,0.88) 100%
//       )`,
//       duration: 0.4,
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(cardRef.current, {
//       rotateY: 0,
//       rotateX: 0,
//       duration: 0.7,
//       ease: "elastic.out(1, 0.5)",
//     });

//     gsap.to(overlayRef.current, {
//       background:
//         "linear-gradient(to top, rgba(5,14,31,0.88) 0%, rgba(5,14,31,0.60) 50%, rgba(5,14,31,0.35) 100%)",
//       duration: 0.5,
//     });

//     setHov(false);
//   };

//   return (
//     <div
//       className="step-card"
    
//       onMouseEnter={() => setHov(true)}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         width: "100%",
//         height: "100%",
//         minHeight: "clamp(240px, 32vh, 320px)",
//         display: "flex",
//         flexDirection: "column",
//         boxSizing: "border-box",
//         transformStyle: "preserve-3d",
//         willChange: "transform",
//       }}
//       data-h
//     >
//       {/* ── Background image ── */}

//       <div
//         className="card-bg"
//         style={{
//           position: "absolute",
//           inset: "-15%",
//           backgroundImage: `url(${s.img})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           transition: "transform 0.5s ease",
//           transform: hov ? "scale(1.05)" : "scale(1)",
//           willChange: "transform",
//         }}
//       />

//       {/* ── Gradient overlay ── */}

//       <div
//         ref={overlayRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(to top, rgba(5,14,31,0.88) 0%, rgba(5,14,31,0.60) 50%, rgba(5,14,31,0.35) 100%)",
//           transition: "background 0.4s",
//         }}
//       />

//       {/* ── Watermark number ── */}

//       <span
//         style={{
//           position: "absolute",
//           top: "clamp(12px, 2vh, 20px)",
//           left: "clamp(16px, 2.5vw, 28px)",
//           fontFamily: "Georgia, serif",
//           fontSize: "clamp(56px, 10vw, 96px)",
//           fontWeight: 900,
//           color: "rgba(255,255,255,0.30)",
//           lineHeight: 1,
//           letterSpacing: "-0.04em",
//           userSelect: "none",
//           pointerEvents: "none",
//           zIndex: 1,
//         }}
//       >
//         {s.n}
//       </span>

//       {/* ── Content pinned to bottom ── */}

//       <div
//         style={{
//           position: "relative",
//           zIndex: 2,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-end",
//           height: "100%",
//           padding: "clamp(20px, 3.5vh, 32px)",
//         }}
//       >
//         {/* Duration badge */}

//         <div
//           style={{
//             position: "absolute",
//             top: "clamp(16px, 2.5vh, 24px)",
//             right: "clamp(16px, 2.5vw, 24px)",
//           }}
//         >
//           <span
//             style={{
//               fontSize: "clamp(9px, 1.5vw, 10px)",
//               color: "rgba(255,255,255,0.9)",
//               background: T.sand,
//               padding: "4px 10px",
//               letterSpacing: "0.18em",
//               textTransform: "uppercase",
//             }}
//           >
//             {s.dur}
//           </span>
//         </div>

//         {/* Title */}

//         <h3
//           style={{
//             fontFamily: "Inter, sans-serif",
//             fontSize: "clamp(18px, 3vw, 26px)",
//             fontWeight: 700,
//             color: "#FFFFFF",
//             lineHeight: 1.15,
//             letterSpacing: "-0.02em",
//             margin: "0 0 10px",
//           }}
//         >
//           {s.t}
//         </h3>

//         {/* Description */}

//         <motion.p
//           animate={{
//             opacity: hov ? 1 : 0,
//             y: hov ? 0 : 8,
//           }}
//           transition={{
//             duration: 0.35,
//             ease,
//           }}
//           style={{
//             fontSize: "clamp(12px, 1.8vw, 14px)",
//             color: "rgba(255,255,255,0.72)",
//             lineHeight: 1.65,
//             margin: 0,
//             maxWidth: 280,
//           }}
//         >
//           {s.d}
//         </motion.p>
//       </div>

//       {/* ── Amber bottom accent line on hover ── */}

//       <motion.div
//         animate={{
//           scaleX: hov ? 1 : 0,
//         }}
//         transition={{
//           duration: 0.4,
//           ease,
//         }}
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: 2,
//           background: T.amber,
//           transformOrigin: "left",
//           zIndex: 3,
//         }}
//       />
//     </div>
//   );
// }



import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { T, STEPS } from "../data";

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const stag = (d = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: d } },
});

export function Process() {
  const [r, v] = useRev();

  return (
    <section
      id="process"
      style={{
        padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .process-header { text-align: center !important; }
          .process-eyebrow { justify-content: center !important; }
          .process-line { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.div
          ref={r}
          variants={stag()}
          initial="hidden"
          animate={v ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(16px, 3vw, 24px)",
            marginBottom: "clamp(40px, 8vh, 72px)",
            width: "100%",
          }}
        >
          <div style={{ width: "100%" }} className="process-header">
            <motion.div
              variants={fadeUp}
              className="process-eyebrow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                marginBottom: "clamp(12px, 2vh, 18px)",
                flexWrap: "wrap",
              }}
            >
              <span
                className="process-line"
                style={{
                  width: "clamp(24px, 4vw, 32px)",
                  height: 1,
                  background: T.amber,
                  display: "block",
                }}
              />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(9px, 2vw, 10px)",
                color: T.amber,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}>
                How We Work
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(2rem, 8vw, 5.5rem)",
                fontWeight: 900,
                color: T.cream,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: "100%",
              }}
            >
              Our Process
              <br />
              <span style={{ fontStyle: "italic", color: T.creamDark }}>
                Structured for Results.
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "min(400px, 100%)",
              lineHeight: 1.75,
              fontSize: "clamp(13px, 2vw, 14px)",
              marginBottom: "clamp(8px, 2vh, 16px)",
            }}
          >
            A repeatable framework refined over four years and 87 projects. Transparent, collaborative, always on time.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 2,
            width: "100%",
          }}
        >
          {STEPS.map((s, i) => (
            <StepCard key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ s, i }) {
  const [hov, setHov] = useState(false);
  const [r, v] = useRev("-60px");

  return (
    <motion.div
      ref={r}
      initial={{ opacity: 0, y: 40 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.07, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="step-card"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        minHeight: "clamp(240px, 32vh, 320px)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        cursor: "pointer",
      }}
      data-h
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: `url(${s.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.5s ease",
          transform: hov ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(5,14,31,0.88) 0%, rgba(5,14,31,0.60) 50%, rgba(5,14,31,0.35) 100%)",
        }}
      />

      {/* Watermark number */}
      <span
        style={{
          position: "absolute",
          top: "clamp(12px, 2vh, 20px)",
          left: "clamp(16px, 2.5vw, 28px)",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(56px, 10vw, 96px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.30)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {s.n}
      </span>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
          padding: "clamp(20px, 3.5vh, 32px)",
        }}
      >
        {/* Duration badge */}
        <div style={{ position: "absolute", top: "clamp(16px, 2.5vh, 24px)", right: "clamp(16px, 2.5vw, 24px)" }}>
          <span style={{
            fontSize: "clamp(9px, 1.5vw, 10px)",
            color: "rgba(255,255,255,0.9)",
            background: T.sand,
            padding: "4px 10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            {s.dur}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(18px, 3vw, 26px)",
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          margin: "0 0 10px",
        }}>
          {s.t}
        </h3>

        {/* Description */}
        <motion.p
          animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
          transition={{ duration: 0.35, ease }}
          style={{
            fontSize: "clamp(12px, 1.8vw, 14px)",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 280,
          }}
        >
          {s.d}
        </motion.p>
      </div>

      {/* Amber bottom line */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: T.amber,
          transformOrigin: "left",
          zIndex: 3,
        }}
      />
    </motion.div>
  );
}