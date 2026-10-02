// import { useRef, useState, useEffect } from "react";
// import { motion, useInView } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { T, SERVICESHome as SERVICES } from "../data";

// gsap.registerPlugin(ScrollTrigger);

// /* ─────────────────────────── HELPERS ─────────────────────────── */

// function useRev(margin = "-70px") {
//   const r = useRef(null);
//   const v = useInView(r, { once: true, margin });
//   return [r, v];
// }

// const ease = [0.22, 1, 0.36, 1];

// const fadeUp = {
//   hidden: { opacity: 0, y: 36 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
// };

// const stag = (d = 0) => ({
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1, delayChildren: d } },
// });
// const serviceRows = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.16 } },
// };
// const serviceRow = {
//   hidden: { opacity: 0, y: 36 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease },
//   },
// };

// /* ─────────────────────────── SERVICES ─────────────────────────── */

// export function Services() {
//   const [open, setOpen]       = useState<number | null>(null);
//   const [hovered, setHovered] = useState<number | null>(null);

//   const [r, v] = useRev();

//   const sectionRef  = useRef<HTMLElement>(null);

//   const subRef      = useRef<HTMLParagraphElement>(null);
//   const listRef     = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const sub = subRef.current;
//     const list = listRef.current;
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="services"
//       style={{
//         padding: "120px 24px",
//         overflow: "hidden",
//         background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
//         position: "relative",
//       }}
//     >
    

//       <style>{`
//         @media (max-width: 640px) {
//           .eyebrow-container {
//             justify-content: center !important;
//           }
//           .eyebrow-line {
//             display: none !important;
//           }
//           .eyebrow-text {
//             text-align: center !important;
//           }
//           .headline-container {
//             justify-content: center !important;
//             align-items: center !important;
//           }
//           .section-title {
//             text-align: center !important;
//           }
//         }
//       `}</style>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>

//         {/* ── Header ── */}
//         <motion.div
//           ref={r}
//           variants={stag()}
//           initial="hidden"
//           animate={v ? "visible" : "hidden"}
//         >
//           {/* Eyebrow */}
//           <motion.div
           
//             className="eyebrow-container"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               marginBottom: 18,
//               willChange: "transform",
//             }}
//           >
//             <span className="eyebrow-line" style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
//             <span className="eyebrow-text" style={{
//               fontFamily: "Inter, sans-serif",
//               fontSize: 10,
//               color: T.amber,
//               letterSpacing: "0.28em",
//               textTransform: "uppercase",
//             }}>
//               What We Do
//             </span>
//           </motion.div>

//           {/* Headline + sub */}
//           <div className="headline-container" style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "flex-end",
//             justifyContent: "space-between",
//             gap: 24,
//             marginBottom: 56,
//           }}>
//             <motion.h2

//               style={{
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
//                 fontWeight: 900,
//                 color: T.cream,
//                 letterSpacing: "-0.03em",
//                 lineHeight: 1.05,
//               }}
//               className="section-title"
//             >
//               Our{" "}
//               <span style={{ fontStyle: "italic", color: T.cream }}>Core</span>
//               <br />
//               Services.
//             </motion.h2>

//             <motion.p
//               ref={subRef}
//               variants={fadeUp}
//               style={{
//                 fontFamily: "Inter, sans-serif",
//                 color: "rgba(255,255,255,0.7)",
//                 maxWidth: 320,
//                 lineHeight: 1.75,
//                 fontSize: 14,
//                 willChange: "transform",
//               }}
//             >
//               Three disciplines, one integrated team. Every service works in
//               concert; so your digital presence is coherent, fast, and beautiful.
//             </motion.p>
//           </div>
//         </motion.div>

//         {/* ── Service rows ── */}
//         <motion.div
//           ref={listRef}
//           variants={serviceRows}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.12 }}
//           style={{
//             willChange: "transform",
//           }}
//         >
//           {SERVICES.map((svc, i) => (
//             <ServiceRow
//               key={svc.n}
//               svc={svc}
//               i={i}
//               open={open}
//               setOpen={setOpen}
//               hovered={hovered}
//               setHovered={setHovered}
//               ease={ease}
//             />
//           ))}
//         </motion.div>

//       </div>
//     </section>
//   );
// }

// /* ─────────────────────────── SERVICE ROW ─────────────────────────── */

// function ServiceRow({ svc, i, open, setOpen, ease }) {
//   return (
//     <motion.div
//       className="service-row"
//       variants={serviceRow}
//       style={{
//         borderBottom: `0.5px solid ${T.cream}`,
//         position: "relative",
//         willChange: "transform",
//       }}
     
//     >
//       {/* ── Toggle button ── */}
//       <button
//         onClick={() => setOpen(open === i ? null : i)}
//         data-h
//         style={{
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "28px 0",
//           background: "none",
//           border: "none",
//           textAlign: "left",
//           position: "relative",
//           zIndex: 3,
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
//           {/* Number */}
//           <span
//             className="svc-num"
//             style={{
//               fontFamily: "Inter, sans-serif",
//               fontSize: 11,
//               color: T.cream,
//               letterSpacing: "0.18em",
//             }}
//           >
//             {svc.n}
//           </span>

//           {/* Title */}
//           <span
//             style={{
//               fontFamily: "Inter, sans-serif",
//               fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
//               fontWeight: 900,
//               color: T.cream,
//               transition: "color 0.3s",
//               letterSpacing: "-0.02em",
//             }}
//           >
//             {svc.title}
//           </span>
//         </div>

//         {/* + button */}
//         <motion.div
//           animate={{ rotate: open === i ? 45 : 0 }}
//           transition={{ duration: 0.3 }}
//           style={{
//             width: 38,
//             height: 38,
//             border: `1px solid ${T.cream}`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: T.cream,
//             fontSize: 22,
//             flexShrink: 0,
//           }}
//         >
//           +
//         </motion.div>
//       </button>

//       {/* ── Expanded content — UNCHANGED ── */}
//       <motion.div
//         initial={false}
//         animate={{
//           height: open === i ? "auto" : 0,
//           opacity: open === i ? 1 : 0,
//         }}
//         transition={{ duration: 0.5, ease }}
//         style={{ overflow: "hidden" }}
//       >
//         <div style={{
//           paddingBottom: 36,
//           paddingLeft: 66,
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: 28,
//         }}>
//           <p style={{
//             fontFamily: "Inter, sans-serif",
//             color: `${T.ink}55`,
//             lineHeight: 1.75,
//             fontSize: 14,
//           }}>
//             {svc.desc}
//           </p>

//           <div style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 10,
//             alignContent: "flex-start",
//           }}>
//             {svc.tags.map((t) => (
//               <span key={t} style={{
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: 10,
//                 padding: "6px 12px",
//                 border: `1px solid ${T.cream}60`,
//                 color: `${T.ink}50`,
//                 letterSpacing: "0.1em",
//               }}>
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }


import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { T, SERVICESHome as SERVICES } from "../data";

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

const serviceRows = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const serviceRow = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Services() {
  const [open,    setOpen]    = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [r, v] = useRev();

  return (
    <section
      id="services"
      style={{
        padding: "120px 24px",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .eyebrow-container  { justify-content: center !important; }
          .eyebrow-line       { display: none !important; }
          .eyebrow-text       { text-align: center !important; }
          .headline-container { justify-content: center !important; align-items: center !important; }
          .section-title      { text-align: center !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          ref={r}
          variants={stag()}
          initial="hidden"
          animate={v ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="eyebrow-container"
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}
          >
            <span className="eyebrow-line" style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
            <span className="eyebrow-text" style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}>
              What We Do
            </span>
          </motion.div>

          {/* Headline + sub */}
          <div
            className="headline-container"
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
              className="section-title"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 900,
                color: T.cream,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Our{" "}
              <span style={{ fontStyle: "italic", color: T.cream }}>Core</span>
              <br />
              Services.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.7)",
                maxWidth: 320,
                lineHeight: 1.75,
                fontSize: 14,
              }}
            >
              Three disciplines, one integrated team. Every service works in
              concert; so your digital presence is coherent, fast, and beautiful.
            </motion.p>
          </div>
        </motion.div>

        {/* Service rows */}
        <motion.div
          variants={serviceRows}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.n}
              svc={svc}
              i={i}
              open={open}
              setOpen={setOpen}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function ServiceRow({ svc, i, open, setOpen, hovered, setHovered }) {
  return (
    <motion.div
      variants={serviceRow}
      style={{
        borderBottom: `0.5px solid ${T.cream}`,
        position: "relative",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen(open === i ? null : i)}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        data-h
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 0",
          background: "none",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          zIndex: 3,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: T.cream,
            letterSpacing: "0.18em",
          }}>
            {svc.n}
          </span>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
            fontWeight: 900,
            color: T.cream,
            letterSpacing: "-0.02em",
          }}>
            {svc.title}
          </span>
        </div>

        <motion.div
          animate={{ rotate: open === i ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 38, height: 38,
            border: `1px solid ${T.cream}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.cream,
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          +
        </motion.div>
      </button>

      {/* Expanded content */}
      <motion.div
        initial={false}
        animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        style={{ overflow: "hidden" }}
      >
        <div style={{
          paddingBottom: 36,
          paddingLeft: 66,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
        }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            color: `${T.ink}55`,
            lineHeight: 1.75,
            fontSize: 14,
          }}>
            {svc.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignContent: "flex-start" }}>
            {svc.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                padding: "6px 12px",
                border: `1px solid ${T.cream}60`,
                color: `${T.ink}50`,
                letterSpacing: "0.1em",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}