"use client";
import { useState, useRef } from "react";
import { OrbitBackground } from "../components/OrbitBackground";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Cursor } from "../components/Cursor";
import { Navbar } from "../components/Navbar";
import { SERVICES, FAQS } from "../data";
import { Footer } from "../components/Footer";
import { T } from "../data";

const ease = [0.22,1,0.36,1];
const fadeUp = { hidden:{opacity:0,y:36}, visible:{opacity:1,y:0,transition:{duration:0.75,ease}} };
const stag = (d=0) => ({ hidden:{}, visible:{transition:{staggerChildren:0.1,delayChildren:d}} });
function useRev(m="-70px"){ const r=useRef(null); const v=useInView(r,{once:true,margin:m}); return [r,v]; }

/* ── DATA ── */







/* ── HERO ── */
function Hero(){
  const [r,v]=useRev();
  return(
    <section 
    style={{
      padding:"160px 24px 100px",
      position:"relative",
      overflow:"hidden",
      background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
    }}
    >
      <div style={{position:"absolute",top:"clamp(10%, 15vw, 20%)",right:"clamp(5%, 8vw, 10%)",width:"min(350px, 50vw)",height:"min(350px, 50vw)",borderRadius:"50%",background:`${T.amber}08`,filter:"blur(clamp(40px, 8vw, 80px))",pointerEvents:"none"}}/>

      <div ref={r} style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,x:-20}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.8,delay:0.1}} style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
          <span style={{width:48,height:1,background:T.amber,display:"block"}}/>
          <span style={{fontFamily:"Inter, sans-serif",fontSize:11,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Our Services</span>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:1,delay:0.2,ease}}
          style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(3rem,8vw,8rem)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.03em",color:"white",marginBottom:28,maxWidth:800}}>
          What We<br/><span style={{fontStyle:"italic",color:T.amber}}>Build</span><br/>For You.
        </motion.h1>
        <motion.div initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.45}}
          style={{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:32,marginTop:40}}>
          <p style={{fontFamily:"Inter, sans-serif",color:`${T.ink}65`,fontSize:17,maxWidth:440,lineHeight:1.75}}>
            Three core disciplines. One integrated senior team. Every service engineered for performance, scale, and your business goals.
          </p>
          <a href="/contact" data-h
            className="cta_link">
            Get a Free Quote <span style={{fontSize:18}}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}


/* ── SERVICE BLOCK ── */
function ServiceBlock({svc,i}){
  const [r,v] = useRev("-60px");
  const isEven = i % 2 === 0;
  
  return(
    <section style={{
       background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      padding: "clamp(60px, 8vh, 100px) clamp(16px, 5vw, 24px)",
      
      width: "100%"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%"
      }}>
        {/* Label */}
        <motion.div 
          ref={r} 
          initial={{opacity:0, x:-16}} 
          animate={v ? {opacity:1, x:0} : {}} 
          transition={{duration:0.6}}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 12px)",
            marginBottom: "clamp(32px, 6vh, 52px)",
            flexWrap: "wrap",
            width: "100%"
          }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(9px, 2vw, 10px)",
            color: T.amber,
            letterSpacing: "0.28em",
            textTransform: "uppercase"
          }}>
            Service {svc.n}
          </span>
          <span style={{
            flex: 1,
            height: 1,
            background: `${T.cream}40`,
            minWidth: "50px"
          }}/>
        </motion.div>

        {/* Main content - responsive grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
          gap: "clamp(40px, 8vw, 80px)",
          alignItems: "start",
          width: "100%"
        }}>
          
          {/* Left Column */}
          <motion.div 
            initial={{opacity:0, x:isEven ? -40 : 40}} 
            animate={v ? {opacity:1, x:0} : {}} 
            transition={{duration:0.9, ease}}
            style={{
              order: isEven ? 0 : 1,
              width: "100%"
            }}>
            <span style={{
              fontSize: "clamp(32px, 6vw, 40px)",
              marginBottom: "clamp(16px, 3vh, 20px)",
              display: "block"
            }}>
              {svc.icon}
            </span>
            
            <h2 style={{
              fontFamily: "Georgia,serif",
              fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
              fontWeight: 900,
              color: T.ink,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "clamp(8px, 2vh, 12px)",
              wordBreak: "break-word"
            }}>
              {svc.title}
            </h2>
            
            <p style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 600,
              color: T.amber,
              fontSize: "clamp(13px, 2.2vw, 14px)",
              marginBottom: "clamp(16px, 3vh, 20px)",
              letterSpacing: "0.04em"
            }}>
              {svc.tagline}
            </p>
            
            <p style={{
              fontFamily: "'Syne',sans-serif",
              color: `${T.ink}55`,
              lineHeight: 1.78,
              marginBottom: "clamp(28px, 5vh, 36px)",
              fontSize: "clamp(13px, 2.2vw, 14px)"
            }}>
              {svc.desc}
            </p>

            {/* Pricing tiers - responsive grid */}
            <div style={{
              borderTop: `1px solid ${T.cream}40`,
              paddingTop: "clamp(20px, 4vh, 28px)",
              width: "100%"
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "clamp(8px, 1.8vw, 9px)",
                color: `${T.ink}35`,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                marginBottom: "clamp(12px, 2vh, 16px)"
              }}>
                Pricing
              </div>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))",
                gap: "clamp(8px, 2vw, 12px)",
                width: "100%"
              }}>
                {svc.tiers.map((tier, ti) => (
                  <div key={tier.n} style={{
                    padding: "clamp(12px, 2vh, 16px) clamp(8px, 1.5vw, 14px)",
                    border: `1px solid ${ti === 1 ? T.amber : `${T.cream}50`}`,
                    
                    textAlign: "center",
                    width: "100%"
                  }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(8px, 1.8vw, 9px)",
                      color: `${T.ink}35`,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      marginBottom: "clamp(4px, 1vh, 6px)"
                    }}>
                      {tier.n}
                    </div>
                    <div style={{
                      fontFamily: "Georgia,serif",
                      fontWeight: 900,
                      fontSize: "clamp(16px, 3vw, 18px)",
                      color: ti === 1 ? T.amber : T.ink,
                      marginBottom: "clamp(2px, 0.5vh, 4px)",
                      wordBreak: "break-word"
                    }}>
                      {tier.p}
                    </div>
                    <div style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "clamp(10px, 2vw, 11px)",
                      color: `${T.ink}40`,
                      lineHeight: 1.45
                    }}>
                      {tier.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a href="/contact" data-h
           className="start-project-link"
              
              >
              Start This Project →
            </a>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{opacity:0, x:isEven ? 40 : -40}} 
            animate={v ? {opacity:1, x:0} : {}} 
            transition={{duration:0.9, delay:0.1, ease}}
            style={{
              order: isEven ? 1 : 0,
              width: "100%"
            }}>
            
            {/* What's Included */}
            <div style={{
             
              border: `1px solid ${T.cream}40`,
              padding: "clamp(24px, 4vh, 36px) clamp(20px, 3vw, 36px)",
              marginBottom: "clamp(12px, 2vh, 16px)",
              width: "100%",
              boxSizing: "border-box"
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "clamp(8px, 1.8vw, 9px)",
                color: `${T.ink}35`,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                marginBottom: "clamp(16px, 3vh, 20px)"
              }}>
                What's Included
              </div>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
                gap: "clamp(8px, 2vw, 12px)",
                width: "100%"
              }}>
                {svc.features.map(f => (
                  <div key={f} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(6px, 1.5vw, 10px)",
                    width: "100%"
                  }}>
                    <span style={{
                      color: T.amber,
                      fontSize: "clamp(11px, 2vw, 12px)",
                      marginTop: 2,
                      flexShrink: 0
                    }}>
                      —
                    </span>
                    <span style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "clamp(12px, 2.2vw, 13px)",
                      color: `${T.ink}60`,
                      lineHeight: 1.55,
                      wordBreak: "break-word"
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tech tags */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(6px, 1.5vw, 8px)",
              width: "100%"
            }}>
              {svc.tech.map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "clamp(9px, 2vw, 10px)",
                  padding: "clamp(4px, 1vh, 6px) clamp(8px, 2vw, 12px)",
                  border: `1px solid ${T.cream}50`,
                  color: `${T.cream}`,
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap"
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ(){
  const [open,setOpen]=useState(null);
  const [r,v]=useRev();
  return(
    <section style={{  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"120px 24px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <motion.div ref={r} variants={stag()} initial="hidden" animate={v?"visible":"hidden"}>
          <motion.div variants={fadeUp} style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>FAQ</span>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2.5rem,5vw,4.5rem)",fontWeight:900,color:T.cream,letterSpacing:"-0.03em",lineHeight:1.05,marginBottom:56}}>
            Common<br/><span style={{fontStyle:"italic",color:T.amber}}>Questions.</span>
          </motion.h2>
        </motion.div>
        <div style={{borderTop:`1px solid ${T.cream}10`}}>
          {FAQS.map((faq,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${T.cream}10`}}>
              <button onClick={()=>setOpen(open===i?null:i)} data-h
                style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"24px 0",background:"none",border:"none",textAlign:"left",gap:24}}>
                <span style={{fontFamily:"Inter, sans-serif",fontWeight:600,color:`${T.cream}80`,fontSize:15}}>{faq.q}</span>
                <motion.div animate={{rotate:open===i?45:0}} transition={{duration:0.3}}
                  style={{width:34,height:34,border:`1px solid ${T.cream}20`,display:"flex",alignItems:"center",justifyContent:"center",color:T.amber,fontSize:22,flexShrink:0}}>+</motion.div>
              </button>
              <AnimatePresence>
                {open===i&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.4,ease}}>
                    <p style={{fontFamily:"Inter, sans-serif",color:`${T.cream}40`,lineHeight:1.75,fontSize:14,paddingBottom:24}}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA BANNER ── */
function CTA(){
  const [r,v]=useRev();
  return(
    <section style={{  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"120px 24px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.045,backgroundImage:`radial-gradient(circle,${T.inkSoft} 1px,transparent 1px)`,backgroundSize:"clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)"}}/>
      <div style={{position:"absolute",top:"50%",left:"clamp(40%, 50vw, 60%)",width:"min(500px, 70vw)",height:"min(500px, 70vw)",borderRadius:"50%",background:`${T.amber}07`,filter:"blur(clamp(50px, 10vw, 100px))",transform:"translateY(-50%)",pointerEvents:"none"}}/>
      <div ref={r} style={{maxWidth:900,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,y:30}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.9,ease}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:24}}>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Ready to Start</span>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
          </div>
          <h2 style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2.5rem,6vw,5.5rem)",fontWeight:900,color:T.ink,letterSpacing:"-0.03em",lineHeight:1.05,marginBottom:20}}>
            Ready to Build<br/><span style={{fontStyle:"italic",color:T.amber}}>Something Great?</span>
          </h2>
          <p style={{fontFamily:"Inter, sans-serif",color:`${T.ink}55`,fontSize:16,lineHeight:1.75,maxWidth:440,margin:"0 auto 44px"}}>
            Schedule a free 30-minute discovery call. No commitment — just honest conversation about your project.
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
            <a href="/contact" data-h
              className="cta_link"
              >
              Book a Discovery Call →
            </a>
            <a href="/work" data-h
              className="cta_work_link"
              >
              See Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ── PAGE ── */
export default function ServicesPage(){
  return(
    <div className="orbit-page" style={{fontFamily:"Inter, sans-serif",minHeight:"100vh"}}>
      <Cursor/>
      <OrbitBackground />
      <Navbar/>
      <Hero/>
      {SERVICES.map((svc,i)=><ServiceBlock key={svc.n} svc={svc} i={i}/>)}
      <FAQ/>
      <CTA/>
      <Footer/>
    </div>
  );
}