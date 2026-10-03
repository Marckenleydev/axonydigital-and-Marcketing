"use client";
import { useRef } from "react";
import { OrbitBackground } from "../components/OrbitBackground";
import { motion, useInView } from "framer-motion";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import {T} from "../data"
import { Cursor } from "../components/Cursor";
import { ContactSidebar } from "../components/ContactSider";
import { MultiStepForm } from "../components/MultiStepFom";
const ease=[0.22,1,0.36,1];
function useRev(m:"-70px"){const r=useRef(null);const v=useInView(r,{once:true,margin:m});return [r,v];}





/* ── PAGE ── */
export default function ContactPage(){
  const [r,v]=useRev();
  return(
    <div className="orbit-page" style={{fontFamily:"Inter, sans-serif",minHeight:"100vh"}}>
      <Cursor/>
      <OrbitBackground />
      <Navbar />

      {/* Hero */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"160px 24px 80px",position:"relative",overflow:"hidden"}}>

        <div ref={r} style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,x:-20}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.8,delay:0.1}} style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
            <span style={{width:48,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:11,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Let's Talk</span>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:1,delay:0.2,ease}}
            style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(3rem,8vw,8rem)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.03em",color:T.cream,marginBottom:28,maxWidth:900}}>
            Start Your<br/><span style={{fontStyle:"italic",color:T.creamDark}}>Next Chapter.</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.45}}
            style={{fontFamily:"Inter, sans-serif",color:`${T.cream}45`,fontSize:17,maxWidth:440,lineHeight:1.75}}>
            Tell us about your project. We reply within 24 hours with an honest assessment, rough timeline, and a few ideas.
          </motion.p>
        </div>
      </section>

      {/* Main grid */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",padding:"20px 24px 120px"}}>
       <div style={{
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
  gap: "clamp(24px, 4vw, 48px)",
  alignItems: "start",
  width: "100%"
}}>
  <MultiStepForm/>
  <ContactSidebar/>
</div>
      </section>

      {/* Map / Location band */}
     <section style={{
  background:  "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
  borderTop: `1px solid ${T.cream}08`,
  padding: "clamp(48px, 8vh, 72px) clamp(16px, 5vw, 24px)",
  width: "100%",
  display:"none"
}}>
  <div style={{
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Fixed 4 columns on desktop
    gap: 2, // Original gap preserved
     background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
    width: "100%"
  }} className="offices-grid">
    {[
      {city:"Dubai", addr:"Business Bay, Dubai UAE", tz:"GMT+4", flag:"🇦"},
      {city:"Remote", addr:"Serving clients worldwide", tz:"Your timezone", flag:"🇧"}
    ].map(office => (
      <div key={office.city} style={{
        background: T.inkSoft,
        padding: "32px 28px", // Original padding preserved
        width: "100%",
        boxSizing: "border-box"
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 18, // Original size preserved
          marginBottom: 12
        }}>
          {office.flag}
        </div>
        
        <h3 style={{
          fontFamily: "Inter",
          fontWeight: 900,
          fontSize: 22, // Original size preserved
          color: T.cream,
          marginBottom: 6,
          wordBreak: "break-word"
        }}>
          {office.city}
        </h3>
        
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12, // Original size preserved
          color: `${T.cream}40`,
          marginBottom: 8,
          lineHeight: 1.6,
          wordBreak: "break-word"
        }}>
          {office.addr}
        </p>
        
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10, // Original size preserved
          color: `${T.amber}80`,
          letterSpacing: "0.18em",
          display: "block"
        }}>
          {office.tz}
        </span>
      </div>
    ))}
  </div>

  {/* Responsive breakpoints that don't affect desktop */}
  <style>{`
    @media (max-width: 1024px) {
      .offices-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 16px !important;
      }
      .offices-grid > div {
          padding: 28px 24px !important;
        }
      }
      @media (max-width: 640px) {
        .offices-grid {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }
        .offices-grid > div {
          padding: 24px 20px !important;
        }
      }
    `}</style>
</section>

      <Footer/>
    </div>
  );
}