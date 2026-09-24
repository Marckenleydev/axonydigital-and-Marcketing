// import { useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { T } from "../data";

// gsap.registerPlugin(ScrollTrigger);

// const ease = [0.22, 1, 0.36, 1];

// export function Hero() {
//   const sectionRef = useRef<HTMLElement>(null);
//   // Orb refs for idle float animation
//   const orb1Ref    = useRef<HTMLDivElement>(null);
//   const orb2Ref    = useRef<HTMLDivElement>(null);
//   const orb3Ref    = useRef<HTMLDivElement>(null);

//   const lines = [
//     {
//       segments: [
//         { text: "WE TURN",   italic: false },
//         { text: "ATTENTION", italic: true  },
//       ],
//     },
//     {
//       segments: [
//         { text: "Into Sales", italic: false },
//       ],
//     },
//   ];

//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       // ── Idle float animation on orbs (CSS keyframe would work too) ──
//       gsap.to(orb1Ref.current, {
//         y: "+=18", x: "+=10",
//         duration: 6, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });
//       gsap.to(orb2Ref.current, {
//         y: "-=14", x: "-=8",
//         duration: 7.5, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });
//       gsap.to(orb3Ref.current, {
//         y: "+=10",
//         duration: 5, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       style={{
//         minHeight: "100vh",
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         paddingTop: "clamp(72px, 10vh, 112px)",
//         paddingBottom: "clamp(32px, 6vh, 56px)",
//         overflow: "hidden",
       
//         background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
//       }}
//     >
      

      

     

//       {/* ── Content ── */}
//       <motion.div style={{
//         position: "relative",
//         zIndex: 10,
//         maxWidth: 1200,
//         margin: "0 auto",
//         padding: "clamp(32px, 6vh, 56px) clamp(16px, 5vw, 24px)",
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//       }}>

//         {/* Eyebrow */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "clamp(8px, 2vw, 16px)",
//             marginBottom: "clamp(20px, 4vh, 36px)",
//             flexWrap: "wrap",
//           }}
//         >
         
//           <span style={{
//             fontFamily: "Inter, sans-serif",
//             fontSize: "clamp(9px, 2vw, 11px)",
//             color: T.amber,
//             letterSpacing: "0.28em",
//             textTransform: "uppercase",
//             whiteSpace: "nowrap",
//           }}>
//             Premium Digital Agency · Est. 2024
//           </span>
//         </motion.div>

//         {/* Heading */}
//         <motion.h1 style={{
//           fontFamily: "Inter, sans-serif",
//           fontSize: "clamp(2.5rem, 10.5vw, 7rem)",
//           fontWeight: 600,
//           lineHeight: 0.9,
//           letterSpacing: "0.01em",
//           color: T.cream,           // white on dark bg
//           marginBottom: "clamp(12px, 2.5vh, 24px)",
//           maxWidth: "min(1100px, 100%)",
//           marginLeft: "auto",
//           marginRight: "auto",
//           textAlign: "center",
//           transformOrigin: "center center",
//         }}>
//           {lines.map((line, li) => (
//             <span key={li} style={{ display: "block" }}>
//               {line.segments.map((seg, wi) =>
//                 seg.text.split(" ").map((word, i) => (
//                   <span
//                     key={`${wi}-${i}`}
//                     style={{
//                       overflow: "hidden",
//                       display: "inline-block",
//                       marginRight: "0.3em",
//                       paddingRight: "0.1em",
//                     }}
//                   >
//                     <motion.span
//                       initial={{ y: "115%", rotate: 2 }}
//                       animate={{ y: "0%", rotate: 0 }}
//                       transition={{
//                         duration: 1,
//                         delay: 0.3 + li * 0.18 + wi * 0.12 + i * 0.07,
//                         ease,
//                       }}
//                       style={{
//                         display: "inline-block",
//                         color: seg.italic ? T.amber : T.cream,
//                         fontSize: "inherit",
//                       }}
//                     >
//                       {word}
//                     </motion.span>
//                   </span>
//                 ))
//               )}
//             </span>
//           ))}
//         </motion.h1>

//         {/* Sub + CTA */}
//         <motion.div style={{
//           display: "flex",
//           flexDirection: "column",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "clamp(16px, 3vh, 24px)",
//           marginTop: "clamp(12px, 2.5vh, 24px)",
//           marginBottom: "clamp(20px, 4vh, 36px)",
//           textAlign: "center",
//         }}>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//             style={{
//               fontFamily: "Inter, sans-serif",
//               color: "rgba(255,255,255,0.55)",
//               fontSize: "clamp(15px, 3vw, 17px)",
//               maxWidth: "min(680px, 100%)",
//               lineHeight: 1.7,
//               flex: "0 1 auto",
//               textAlign: "center",
//             }}
//           >
//             Web platforms, marketing, and content built to scale ambitious brands.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.05 }}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "clamp(12px, 3vw, 20px)",
//               flexWrap: "wrap",
//               flex: "0 0 auto",
//               justifyContent: "center",
//             }}
//           >
//             <a
//             className="contact-btn"
//               href="/contact"
//               data-h
             
              
//             >
//               Get in touch <span style={{ fontSize: "clamp(16px, 3vw, 18px)" }}>→</span>
//             </a>
//           </motion.div>
//         </motion.div>

//       </motion.div>
//     </section>
//   );
// }









import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { T } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Orb refs for idle float animation
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

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

  // Framer Motion scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingScale = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, 1.6]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.8],
    [1, 0.5, 0]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Idle float animation on orbs
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "clamp(72px, 10vh, 112px)",
        paddingBottom: "clamp(32px, 6vh, 56px)",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      }}
    >
      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding:
            "clamp(32px, 6vh, 56px) clamp(16px, 5vw, 24px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(20px, 4vh, 36px)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(9px, 2vw, 11px)",
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Premium Digital Agency · Est. 2024
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          style={{
            scale: headingScale,
            opacity: headingOpacity,
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2.5rem, 10.5vw, 7rem)",
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "0.01em",
            color: T.cream,
            marginBottom: "clamp(12px, 2.5vh, 24px)",
            maxWidth: "min(1100px, 100%)",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          {lines.map((line, li) => (
            <span key={li} style={{ display: "block" }}>
              {line.segments.map((seg, wi) =>
                seg.text.split(" ").map((word, i) => (
                  <span
                    key={`${wi}-${i}`}
                    style={{
                      overflow: "hidden",
                      display: "inline-block",
                      marginRight: "0.3em",
                      paddingRight: "0.1em",
                    }}
                  >
                    <motion.span
                      initial={{ y: "115%", rotate: 2 }}
                      animate={{ y: "0%", rotate: 0 }}
                      transition={{
                        duration: 1,
                        delay:
                          0.3 +
                          li * 0.18 +
                          wi * 0.12 +
                          i * 0.07,
                        ease,
                      }}
                      style={{
                        display: "inline-block",
                        color: seg.italic ? T.amber : T.cream,
                        fontSize: "inherit",
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

        {/* Sub + CTA */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(16px, 3vh, 24px)",
            marginTop: "clamp(12px, 2.5vh, 24px)",
            marginBottom: "clamp(20px, 4vh, 36px)",
            textAlign: "center",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(15px, 3vw, 17px)",
              maxWidth: "min(680px, 100%)",
              lineHeight: 1.7,
              flex: "0 1 auto",
              textAlign: "center",
            }}
          >
            Web platforms, marketing, and content built to scale ambitious brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 3vw, 20px)",
              flexWrap: "wrap",
              flex: "0 0 auto",
              justifyContent: "center",
            }}
          >
            <a
              className="contact-btn"
              href="/contact"
              data-h
            >
              Get in touch{" "}
              <span style={{ fontSize: "clamp(16px, 3vw, 18px)" }}>
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}