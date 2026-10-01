import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T } from "../data";

const ease=[0.22,1,0.36,1];
const fadeUp={hidden:{opacity:0,y:36},visible:{opacity:1,y:0,transition:{duration:0.75,ease}}};
const stag=(d=0)=>({hidden:{},visible:{transition:{staggerChildren:0.1,delayChildren:d}}});
function useRev(m="-70px"){const r=useRef(null);const v=useInView(r,{once:true,margin:m});return [r,v];}

export function TeamCard({ member, i }: { member: any; i: number }) {
  const [ref, inView] = useRev("-50px");
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
       
        padding: 32,
        transition: "background 0.3s",
      }}
      data-h
    >
      <div
        style={{
          width: 52,
          height: 52,
         
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          border: `1px solid ${member.color}40`,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            color: hover ? T.cream : member.color,
            fontSize: 16,
          }}
        >
          {member.ini}
        </span>
      </div>

      <h3 style={{ fontWeight: 800, fontSize: 15, color: T.cream }}>{member.name}</h3>
      <p style={{ fontSize: 12, opacity: 0.6 }}>{member.role}</p>
      <p style={{ fontSize: 10, opacity: 0.4 }}>{member.exp}</p>
    </motion.div>
  );
}