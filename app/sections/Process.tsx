/* ─────────────────────────── PROCESS ─────────────────────────── */

import { useRef, useState } from "react";
import { useInView,motion } from "framer-motion";
import { T,STEPS } from "../data";
function useRev(margin:"-70px") {
  const r = useRef(null);
  const v = useInView(r, { once:true, margin });
  return [r, v];
}
const ease = [0.22, 1, 0.36, 1];
const fadeUp = { hidden:{opacity:0,y:36}, visible:{opacity:1,y:0,transition:{duration:0.75,ease}} };
const stag   = (d=0) => ({ hidden:{}, visible:{transition:{staggerChildren:0.1,delayChildren:d}} });
export function Process() {
  const [r,v] = useRev();

  return (
    <section id="process" style={{
      background: T.ink,
      padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
      overflow: "hidden"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%"
      }}>
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
            width: "100%"
          }}>
          <div style={{ width: "100%" }}>
            <motion.div 
              variants={fadeUp} 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                marginBottom: "clamp(12px, 2vh, 18px)",
                flexWrap: "wrap"
              }}>
              <span style={{
                width: "clamp(24px, 4vw, 32px)",
                height: 1,
                background: T.amber,
                display: "block"
              }} />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(9px, 2vw, 10px)",
                color: T.amber,
                letterSpacing: "0.28em",
                textTransform: "uppercase"
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
                maxWidth: "100%"
              }}>
              Our Process <br/>
              <span style={{fontStyle: "italic", color: T.amber}}>
                Structured for Results.
              </span>
            </motion.h2>
          </div>
          
          <motion.p 
            variants={fadeUp} 
            style={{
              fontFamily: "Inter, sans-serif",
              color: `${T.cream}40`,
              maxWidth: "min(400px, 100%)",
              lineHeight: 1.75,
              fontSize: "clamp(13px, 2vw, 14px)",
              marginBottom: "clamp(8px, 2vh, 16px)"
            }}>
            A repeatable framework refined over four years and 87 projects. Transparent, collaborative, always on time.
          </motion.p>
        </motion.div>

        {/* Responsive grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 2,
          width: "100%"
        }}>
          {STEPS.map((s,i) => <StepCard key={s.n} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function StepCard({s,i}) {
  const [r,v] = useRev("-50px");
  const [hov,setHov] = useState(false);
  
  return (
    <motion.div 
      ref={r} 
      initial={{opacity:0, y:28}} 
      animate={v ? {opacity:1, y:0} : {}} 
      transition={{duration:0.65, delay:i*0.08, ease}}
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.sand : T.inkSoft,
        padding: "clamp(24px, 4vh, 36px)",
        transition: "background 0.3s",
        cursor: "none",
        width: "100%",
        height: "100%",
        minHeight: "clamp(200px, 30vh, 240px)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box"
      }} 
      data-h>
      
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "clamp(8px, 2vw, 16px)",
        marginBottom: "clamp(16px, 3vh, 28px)",
        flexWrap: "wrap"
      }}>
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(32px, 8vw, 52px)",
          fontWeight: 700,
          color: hov ? `${T.amber}85` : `${T.cream}07`,
          lineHeight: 1,
          transition: "color 0.4s"
        }}>
          {s.n}
        </span>
        
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(9px, 2vw, 10px)",
          color: `${T.amberLight}100`,
          background: `${T.amber}70`,
          padding: "clamp(4px, 1vh, 6px) clamp(8px, 1.5vw, 12px)",
          letterSpacing: "0.14em",
          whiteSpace: "nowrap"
        }}>
          {s.dur}
        </span>
      </div>
      
      <h3 style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "clamp(16px, 3.5vw, 18px)",
        fontWeight: 700,
        color: T.cream,
        marginBottom: "clamp(6px, 1.5vh, 10px)",
        wordBreak: "break-word"
      }}>
        {s.t}
      </h3>
      
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "clamp(12px, 2.2vw, 13px)",
        color: `${T.cream}50`,
        lineHeight: 1.7,
        wordBreak: "break-word"
      }}>
        {s.d}
      </p>
    </motion.div>
  );
}