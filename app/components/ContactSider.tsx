


"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {T} from "../data";
const ease=[0.22,1,0.36,1];
const fadeUp={hidden:{opacity:0,y:36},visible:{opacity:1,y:0,transition:{duration:0.75,ease}}};
const stag=(d=0)=>({hidden:{},visible:{transition:{staggerChildren:0.1,delayChildren:d}}});
function useRev(m="-70px"){const r=useRef(null);const v=useInView(r,{once:true,margin:m});return [r,v];}

export function ContactSidebar(){
  const [r,v]=useRev();
  return(
    <motion.div
      ref={r}
      variants={stag(0.2)}
      initial="hidden"
      animate={v?"visible":"hidden"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 3vh, 24px)",
        width: "100%"
      }}>
      
      {/* Direct contact */}
      <motion.div variants={fadeUp} style={{
        border: `1px solid ${T.cream}10`,
        padding: "clamp(20px, 3vh, 28px) clamp(16px, 3vw, 28px)",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(8px, 1.8vw, 9px)",
          color: `${T.cream}30`,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          marginBottom: "clamp(16px, 3vh, 20px)"
        }}>
          Get In Touch Directly
        </div>
        
        {[{l:"Email", v:"info@axonydigital.com"},
          {l:"Based In", v:"Dubai "},
          {l:"Phone", v:"+971 55 263 5229"}
        ].map(item=>(
          <div key={item.l} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "clamp(8px, 2vw, 16px)",
            padding: "clamp(8px, 1.5vh, 12px) 0",
            borderBottom: `1px solid ${T.cream}08`,
            flexWrap: "wrap"
          }}>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(8px, 1.8vw, 9px)",
              color: `${T.cream}25`,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              paddingTop: 1,
              flexShrink: 0
            }}>
              {item.l}
            </span>
            
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(11px, 2vw, 12px)",
              color: `${T.cream}55`,
              textAlign: "right",
              wordBreak: "break-word",
              flex: 1
            }}>
              {item.v}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Response times */}
      <motion.div variants={fadeUp} style={{
        border: `1px solid ${T.cream}10`,
        padding: "clamp(20px, 3vh, 28px) clamp(16px, 3vw, 28px)",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(8px, 1.8vw, 9px)",
          color: `${T.cream}30`,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          marginBottom: "clamp(16px, 3vh, 20px)"
        }}>
          What to Expect
        </div>
        
        {[{l:"First response", t:"< 24 hours", c:"#4ade80"},
          {l:"Discovery call", t:"Within 48 hrs", c:T.amber},
          {l:"Full proposal", t:"3 – 5 days", c:"#60a5fa"}
        ].map(item=>(
          <div key={item.l} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 16px)",
            padding: "clamp(8px, 1.5vh, 12px) 0",
            borderBottom: `1px solid ${T.cream}08`,
            flexWrap: "wrap"
          }}>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(11px, 2vw, 12px)",
              color: `${T.cream}45`,
              wordBreak: "break-word"
            }}>
              {item.l}
            </span>
            
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(10px, 2vw, 11px)",
              color: item.c,
              fontWeight: 700,
              whiteSpace: "nowrap"
            }}>
              {item.t}
            </span>
          </div>
        ))}
      </motion.div>

     
    </motion.div>
  );
}