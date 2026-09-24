"use client";
import { useState, useRef, useEffect } from "react";
import { OrbitBackground } from "../components/OrbitBackground";
import { motion, useInView } from "framer-motion";
import {  VALUES, MILESTONES, SKILLS } from "../data";
import { Cursor } from "../components/Cursor";
import { Navbar } from "../components/Navbar";
import { T } from "../data";
import { Footer } from "../components/Footer";
import { TeamCard } from "../components/TeamCard";
import { Loading } from "../components/Loading";

const ease=[0.22,1,0.36,1];
const fadeUp={hidden:{opacity:0,y:36},visible:{opacity:1,y:0,transition:{duration:0.75,ease}}};
const stag=(d=0)=>({hidden:{},visible:{transition:{staggerChildren:0.1,delayChildren:d}}});
function useRev(m="-70px"){const r=useRef(null);const v=useInView(r,{once:true,margin:m});return [r,v];}





/* ── HERO ── */
function Hero(){
  const [r,v]=useRev();
  return(
    <section style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      padding: "clamp(100px, 15vh, 160px) clamp(16px, 5vw, 24px) clamp(60px, 8vh, 100px)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div ref={r} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        <motion.div 
          initial={{opacity:0, x:-20}} 
          animate={v ? {opacity:1, x:0} : {}} 
          transition={{duration:0.8, delay:0.1}} 
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(20px, 4vh, 28px)",
            flexWrap: "wrap"
          }}>
          <span style={{
            width: "clamp(32px, 6vw, 48px)",
            height: 1,
            background: T.amber,
            display: "block"
          }}/>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(10px, 2vw, 11px)",
            color: T.amber,
            letterSpacing: "0.28em",
            textTransform: "uppercase"
          }}>
            About Us
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{opacity:0, y:40}} 
          animate={v ? {opacity:1, y:0} : {}} 
          transition={{duration:1, delay:0.2, ease}}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2.5rem, 10vw, 8rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "white",
            marginBottom: "clamp(20px, 4vh, 28px)",
            maxWidth: "100%",
            wordBreak: "break-word"
          }}>
          Obsessed<br/>With <span style={{fontStyle: "italic", color: T.amber}}>Digital</span><br/>Craft.
        </motion.h1>
        
        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={v ? {opacity:1, y:0} : {}} 
          transition={{duration:0.8, delay:0.45}}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "clamp(24px, 5vw, 48px)",
            marginTop: "clamp(30px, 5vh, 40px)",
            maxWidth: "min(900px, 100%)",
            width: "100%"
          }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            color: `${T.cream}45`,
            fontSize: "clamp(15px, 2.5vw, 16px)",
            lineHeight: 1.78,
            maxWidth: "100%"
          }}>
            We're a tight-knit team of senior engineers, product designers, and growth strategists united by one belief: digital products should be beautiful <em>and</em> performant.
          </p>
          
          <p style={{
            fontFamily: "Inter, sans-serif",
            color: `${T.cream}45`,
            fontSize: "clamp(13px, 2.2vw, 14px)",
            lineHeight: 1.78,
            maxWidth: "100%"
          }}>
            Founded in 2022, we've partnered with startups and scale-ups across Europe, the Middle East. We don't do templated work — every project starts from first principles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}




/* ── VALUES ── */
function Values(){
  const [r,v]=useRev();
  
  return(
    <section style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
    
      width: "100%"
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
            marginBottom: "clamp(32px, 6vh, 56px)",
            width: "100%"
          }}>
          
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
            }}/>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(9px, 2vw, 10px)",
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase"
            }}>
              How We Think
            </span>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp} 
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2rem, 7vw, 5rem)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: "100%"
            }}>
            Our Values —<br/><span style={{fontStyle: "italic", color: T.amber}}>Non-Negotiable.</span>
          </motion.h2>
        </motion.div>
        
        {/* Fixed responsive grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Default: 2 columns
          gap: "clamp(16px, 3vw, 32px)",
          width: "100%"
        }}>
          {VALUES.map((val,i) => {
            const [vr,vv] = useRev("-50px");
            return(
              <motion.div 
                key={val.t} 
                ref={vr} 
                initial={{opacity:0, y:24}} 
                animate={vv ? {opacity:1, y:0} : {}} 
                transition={{duration:0.65, delay:i*0.1, ease}}
                style={{
                 
                  padding: "clamp(24px, 4vh, 48px) clamp(20px, 3vw, 48px)",
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  boxSizing: "border-box",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}>
                
             
                
                <span style={{
                  fontSize: "clamp(24px, 5vw, 32px)",
                  color: T.amber,
                  display: "block",
                  marginBottom: "clamp(16px, 3vh, 20px)"
                }}>
                  {val.i}
                </span>
                
                <h3 style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.3rem, 3vw, 1.5rem)",
                  color: T.ink,
                  marginBottom: "clamp(8px, 2vh, 12px)",
                  letterSpacing: "-0.02em",
                  wordBreak: "break-word"
                }}>
                  {val.t}
                </h3>
                
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  color: `${T.ink}50`,
                  fontSize: "clamp(13px, 2vw, 14px)",
                  lineHeight: 1.75,
                  wordBreak: "break-word",
                  flex: 1
                }}>
                  {val.d}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Add media query for mobile via style tag */}
        <style>{`
          @media (max-width: 768px) {
            .values-grid {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .values-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ── SKILLS + QUOTE ── */
function Skills(){
  const [lRef,lV] = useRev("-60px");
  const [rRef,rV] = useRev("-60px");
  
  return(
    <section style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      padding: "clamp(60px, 10vh, 120px) clamp(16px, 5vw, 24px)",
     
      width: "100%"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(450px, 100%), 1fr))",
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
            }}/>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(9px, 2vw, 10px)",
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase"
            }}>
              Technical Excellence
            </span>
          </div>
          
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: T.ink,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            marginBottom: "clamp(12px, 2vh, 16px)",
            wordBreak: "break-word"
          }}>
            Experienced Specialists,<br/><span style={{fontStyle: "italic", color: T.amber}}>Focused on Results.</span>
          </h2>
          
          <p style={{
            fontFamily: "Inter, sans-serif",
            color: `${T.ink}50`,
            lineHeight: 1.78,
            fontSize: "clamp(13px, 2.2vw, 14px)",
            marginBottom: "clamp(28px, 5vh, 36px)",
            maxWidth: "100%"
          }}>
            Every member of the CODEVERAA team has at minimum 4 years of production experience. We hire slow and stay small intentionally — so every project gets senior attention.
          </p>
          
          {[{i:"◈", t:"100% Senior Talent", b:"No account managers, no handoffs. You talk directly to the engineers building your product."},
            {i:"◉", t:"Clear Communication", b:"Weekly async video updates plus live demos. You'll never wonder what's happening."},
            {i:"⬡", t:"Quality Standards", b:"Every line of code is reviewed, every design pixel is intentional, every launch is prepared."},
          ].map((vl, vi) => (
            <motion.div 
              key={vl.t} 
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
                {vl.i}
              </span>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  color: T.ink,
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  marginBottom: "clamp(2px, 1vh, 3px)",
                  wordBreak: "break-word"
                }}>
                  {vl.t}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  color: `${T.ink}50`,
                  fontSize: "clamp(12px, 2.2vw, 13px)",
                  lineHeight: 1.65,
                  wordBreak: "break-word"
                }}>
                  {vl.b}
                </div>
              </div>
            </motion.div>
          ))}
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
          
         
          
          <div style={{
            background: T.cream,
            border: `1px solid ${T.sand}40`,
            padding: "clamp(28px, 5vh, 40px) clamp(24px, 4vw, 40px)",
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
              gap: "clamp(20px, 3vh, 28px)",
              marginBottom: "clamp(30px, 5vh, 40px)",
              width: "100%"
            }}>
              {SKILLS.map((s, si) => (
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
                      color: `${T.ink}75`,
                      wordBreak: "break-word"
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
                      }}/>
                  </div>
                </div>
              ))}
            </div>
            
            <blockquote style={{
              paddingTop: "clamp(20px, 3vh, 28px)",
             
            }}>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 3vw, 18px)",
                color: `${T.ink}70`,
                lineHeight: 1.55,
                marginBottom: "clamp(12px, 2vh, 16px)",
                wordBreak: "break-word"
              }}>
                &quot;We don&apos;t just build digital solutions — we create experiences that deliver clarity, performance, and measurable growth.&quot;
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
                    M
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

/* ── TIMELINE ── */
function Timeline(){
  const [r,v]=useRev("-40px");
  return(
    <section style={{  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"120px 24px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <motion.div ref={r} variants={stag()} initial="hidden" animate={v?"visible":"hidden"} style={{marginBottom:60}}>
          <motion.div variants={fadeUp} style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Our Journey</span>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2.5rem,5.5vw,5rem)",fontWeight:900,color:T.cream,letterSpacing:"-0.03em",lineHeight:1.05}}>
            Four Years of<br/><span style={{fontStyle:"italic",color:T.amber}}>Building.</span>
          </motion.h2>
        </motion.div>
        <div style={{position:"relative"}}>
          <motion.div initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true}} transition={{duration:2,ease}}
            style={{position:"absolute",left:70,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,${T.amber}60,${T.cream}10)`,transformOrigin:"top"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:32}}>
            {MILESTONES.map((m,i)=>{
              const [mr,mv]=useRev("-20px");
              return(
                <motion.div key={m.year} ref={mr} initial={{opacity:0,x:-28}} animate={mv?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:i*0.05}}
                  style={{display:"flex",gap:28,alignItems:"flex-start"}}>
                  <div style={{flexShrink:0,width:70,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:4}}>
                    <motion.div initial={{scale:0}} animate={mv?{scale:1}:{}} transition={{delay:i*0.05+0.2,type:"spring",stiffness:400}}
                      style={{width:12,height:12,borderRadius:"50%",background:T.amber,border:`2px solid ${T.inkSoft}`,zIndex:1}}/>
                    <span style={{fontFamily:"Inter, sans-serif",fontSize:11,color:`${T.cream}35`,marginTop:8,letterSpacing:"0.18em"}}>{m.year}</span>
                  </div>
                  <div style={{background:T.inkSoft,border:`1px solid ${T.cream}08`,padding:"22px 28px",flex:1}}>
                    <h3 style={{fontFamily:"Inter, sans-serif",fontWeight:900,fontSize:18,color:T.cream,marginBottom:6}}>{m.event}</h3>
                    <p style={{fontFamily:"Inter, sans-serif",fontSize:13,color:`${T.cream}40`,lineHeight:1.7}}>{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TEAM ── */
function Team(){
  const [r,v]=useRev();

  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();

        setTeam(data.team || []);
      } catch (err) {
        console.error("Failed to fetch team", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();

},[])

  return(
    <section style={{  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"120px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <motion.div ref={r} variants={stag()} initial="hidden" animate={v?"visible":"hidden"} style={{marginBottom:56}}>
          <motion.div variants={fadeUp} style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>The Team</span>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2.5rem,5.5vw,5rem)",fontWeight:900,color:T.cream,letterSpacing:"-0.03em",lineHeight:1.05}}>
            People Behind<br/><span style={{fontStyle:"italic",color:T.amber}}>The Work.</span>
          </motion.h2>
        </motion.div>
           {loading && <Loading />}

  {!loading && team.length === 0 && (
    <p style={{padding:20}}>No team members found.</p>
  )}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:1}}>
       
          {team.map((member, i) => (
  <TeamCard key={member._id} member={member} i={i} />
))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA(){
  const [r,v]=useRev();
  return(
    <section style={{  background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"120px 24px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle,${T.cream}80 1px,transparent 1px)`,backgroundSize:"clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(700px, 90vw)",height:"min(400px, 50vw)",borderRadius:"50%",background:`${T.amber}06`,filter:"blur(clamp(60px, 12vw, 120px))",pointerEvents:"none"}}/>
      <div ref={r} style={{maxWidth:800,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,y:30}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.9,ease}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:24}}>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Start a Project</span>
            <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
          </div>
          <h2 style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2.5rem,6vw,5.5rem)",fontWeight:900,color:T.cream,letterSpacing:"-0.03em",lineHeight:1.05,marginBottom:20}}>
            Become<br/><span style={{fontStyle:"italic",color:T.amber}}>Client #88.</span>
          </h2>
          <p style={{fontFamily:"Inter, sans-serif",color:`${T.cream}45`,fontSize:16,lineHeight:1.75,maxWidth:440,margin:"0 auto 44px"}}>
            We take on 3–4 new projects per quarter. Spots go fast. Let's talk before they're gone.
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
            <a href="/contact" data-h
className="cta_link">
              Start a Conversation →
            </a>
            <a href="/work" data-h
              className="cta_work_link">
              See Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage(){
  return(
    <div className="orbit-page" style={{fontFamily:"Inter, sans-serif",background:T.cream,minHeight:"100vh"}}>
      <Cursor/>
      <OrbitBackground />
      <Navbar />
      <Hero/>
     
      <Values/>
      <Skills/>
      <Timeline/>
      <Team/>
      <CTA/>
      <Footer/>
      
    </div>
  );
}