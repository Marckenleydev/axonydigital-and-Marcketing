
import { useRef } from "react";
import { useInView , motion} from "framer-motion";
import {T} from "../data";

/* ─────────────────────────── HELPERS ─────────────────────────── */
const ease = [0.22, 1, 0.36, 1];
const fadeUp = { hidden:{opacity:0,y:36}, visible:{opacity:1,y:0,transition:{duration:0.75,ease}} };
const stag   = (d=0) => ({ hidden:{}, visible:{transition:{staggerChildren:0.1,delayChildren:d}} });

function useRev(margin="-70px") {
  const r = useRef(null);
  const v = useInView(r, { once:true, margin });
  return [r, v];
}


export function About() {
  const [lRef,lV] = useRev();
  const [rRef,rV] = useRev();
 const skills = [
  { n: "Paid Advertising (Meta & Google)", p: 92 },
  { n: "Web Development & Conversion Optimization", p: 90 },
  { n: "Content & Creative Production", p: 85 }
];

  return (
    <section id="about" style={{
      background: T.cream,
      padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
      overflow: "hidden"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
        gap: "clamp(40px, 8vw, 80px)",
        alignItems: "start",
        width: "100%"
      }}>
        
        {/* Left Column */}
        <motion.div 
          ref={lRef} 
          initial={{opacity:0, x:-36}} 
          animate={lV ? {opacity:1, x:0} : {}} 
          transition={{duration:0.9, ease}}
          style={{ width: "100%" }}>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 12px)",
            marginBottom: "clamp(16px, 3vh, 20px)",
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
              About Us
            </span>
          </div>
          
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 900,
            color: T.ink,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            marginBottom: "clamp(20px, 4vh, 28px)",
            maxWidth: "100%"
          }}>
            Obsessed with<br/>
            <span style={{fontStyle: "italic", color: T.amber}}>
              Digital Craft.
            </span>
          </h2>
          
          <p style={{
            fontFamily: "Inter, sans-serif",
            color: `${T.ink}55`,
            lineHeight: 1.78,
            marginBottom: "clamp(16px, 3vh, 18px)",
            fontSize: "clamp(13px, 2.2vw, 14px)",
            maxWidth: "100%"
          }}>
           A team of technology, creativity, and strategy working together to transform ideas into digital experiences <em>that</em> perform.
          </p>
          
          <p style={{
            fontFamily: "Inter, sans-serif",
            color: `${T.ink}55`,
            lineHeight: 1.78,
            marginBottom: "clamp(28px, 5vh, 36px)",
            fontSize: "clamp(13px, 2.2vw, 14px)"
          }}>
           Since 2022, we’ve partnered with businesses, and ambitious brands across Europe, the Middle East, From digital products to growth campaigns, we create tailored solutions built around strategy, innovation, and measurable results.
          </p>
          
          {[
  {
    i:"◈",
    t:"Purposeful Creation",
    b:"We craft every digital experience with intention, combining strategy, design, and technology to elevate brands."
  },
  {
    i:"◉",
    t:"Complete Partnership",
    b:"We work alongside our clients with transparency, communication, and a shared commitment to success."
  },
  {
    i:"⬡",
    t:"Results Driven",
    b:"From digital products to marketing campaigns, every solution is built to engage audiences and accelerate growth."
  }
].map((v, vi) => (
            <motion.div 
              key={v.t} 
              initial={{opacity:0, x:-16}} 
              animate={lV ? {opacity:1, x:0} : {}} 
              transition={{delay:0.3+vi*0.1, duration:0.6}}
              style={{
                display: "flex",
                gap: "clamp(12px, 2vw, 16px)",
                marginBottom: "clamp(18px, 3vh, 22px)",
                alignItems: "flex-start",
                width: "100%"
              }}>
              <span style={{
                color: T.amber,
                fontSize: "clamp(16px, 3vw, 18px)",
                marginTop: 2,
                flexShrink: 0
              }}>
                {v.i}
              </span>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  color: T.ink,
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  marginBottom: "clamp(2px, 1vh, 3px)",
                  letterSpacing: "0.04em"
                }}>
                  {v.t}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  color: `${T.ink}50`,
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  lineHeight: 1.65
                }}>
                  {v.b}
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.a 
            href="#contact" 
            data-h 
            initial={{opacity:0}} 
            animate={lV ? {opacity:1} : {}} 
            transition={{delay:0.7}}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 16px)",
              background: T.sand,
              color: T.cream,
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(10px, 2vw, 11px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "clamp(14px, 2vh, 16px) clamp(24px, 4vw, 32px)",
              textDecoration: "none",
              marginTop: "clamp(12px, 2vh, 16px)",
              transition: "background 0.3s",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={e => e.currentTarget.style.background = T.amber}
            onMouseLeave={e => e.currentTarget.style.background = T.sand}>
            Work With Us →
          </motion.a>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          ref={rRef} 
          initial={{opacity:0, x:36}} 
          animate={rV ? {opacity:1, x:0} : {}} 
          transition={{duration:0.9, ease}} 
          style={{
            position: "relative",
            width: "100%",
            marginTop: "clamp(0px, 2vh, 20px)"
          }}>
          
        
          
          {/* Main content box */}
          <div style={{
            background: T.creamDark,
            border: `1px solid ${T.sand}40`,
            padding: "clamp(24px, 4vh, 40px) clamp(20px, 3vw, 40px)",
            width: "100%",
            boxSizing: "border-box"
          }}>
            
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(9px, 2vw, 10px)",
              color: `${T.ink}45`,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "clamp(24px, 4vh, 36px)"
            }}>
              Technical Expertise
            </div>
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 3vh, 28px)"
            }}>
              {skills.map((s, si) => (
                <div key={s.n} style={{ width: "100%" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "clamp(8px, 2vw, 16px)",
                    marginBottom: "clamp(6px, 1.5vh, 10px)",
                    flexWrap: "wrap"
                  }}>
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(12px, 2.2vw, 13px)",
                      fontWeight: 600,
                      color: `${T.ink}75`
                    }}>
                      {s.n}
                    </span>
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(10px, 2vw, 11px)",
                      color: T.amber
                    }}>
                      {s.p}%
                    </span>
                  </div>
                  
                  <div style={{
                    height: 1,
                    background: `${T.sand}35`,
                    position: "relative",
                    overflow: "hidden",
                    width: "100%"
                  }}>
                    <motion.div 
                      initial={{scaleX:0}} 
                      animate={rV ? {scaleX:1} : {}} 
                      transition={{duration:1.3, delay:0.2+si*0.1, ease}}
                      style={{
                        transformOrigin: "left",
                        width: `${s.p}%`,
                        height: "100%",
                        background: T.amber,
                        position: "absolute",
                        top: 0,
                        left: 0
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <blockquote style={{
              marginTop: "clamp(28px, 5vh, 40px)",
              paddingTop: "clamp(20px, 3vh, 28px)",
             
            }}>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 3vw, 18px)",
                color: `${T.ink}70`,
                lineHeight: 1.55,
                marginBottom: "clamp(12px, 2vh, 16px)"
              }}>
                "We don't just build digital solutions — we create experiences that deliver clarity, performance, and measurable growth."
              </p>
              
              <footer style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                flexWrap: "wrap"
              }}>
                <div style={{
                  width: "clamp(32px, 6vw, 36px)",
                  height: "clamp(32px, 6vw, 36px)",
                  background: `${T.amber}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${T.amber}35`,
                  flexShrink: 0
                }}>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    color: T.amber,
                    fontWeight: 900,
                    fontSize: "clamp(11px, 2vw, 13px)"
                  }}>
                    A
                  </span>
                </div>
                
                <div style={{ minWidth: 0 }}>
                  <span style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(11px, 2.2vw, 12px)",
                    color: `${T.ink}65`,
                    whiteSpace: "nowrap"
                  }}>
                    Marckenley Dorsainvil
                  </span>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(9px, 1.8vw, 10px)",
                    color: `${T.ink}35`,
                    letterSpacing: "0.2em",
                    display: "block",
                    whiteSpace: "nowrap"
                  }}>
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