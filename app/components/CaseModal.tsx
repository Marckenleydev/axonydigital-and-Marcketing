import { motion } from "framer-motion";
import { T } from "../data";


export function CaseModal({project,onClose}: {project: any; onClose: () => void}) {
    const ease=[0.22,1,0.36,1];
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(17,16,8,0.85)",backdropFilter:"blur(8px)"}}/>
      <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} transition={{duration:0.5,ease}}
        onClick={e=>e.stopPropagation()}
        style={{position:"relative",background:T.creamDark,border:`1px solid ${T.sand}50`,maxWidth:760,width:"100%",maxHeight:"92vh",overflowY:"auto"}}>
        {/* Header */}
        <div style={{position:"sticky",top:0,background:T.creamDark,borderBottom:`1px solid ${T.sand}30`,padding:"20px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:10}}>
          <div>
            <div style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.sand,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:4}}>{project.cat} · {project.year}</div>
            <h2 style={{fontFamily:"Inter, sans-serif",fontWeight:900,fontSize:"1.8rem",color:T.ink,letterSpacing:"-0.02em"}}>{project.title} — {project.sub}</h2>
          </div>
          <button onClick={onClose} data-h
            style={{width:38,height:38,border:`1px solid ${T.sand}60`,background:"none",display:"flex",alignItems:"center",justifyContent:"center",color:T.sand,fontSize:20,cursor:"none",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=T.ink;e.currentTarget.style.color=T.cream;}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=T.sand;}}>×</button>
        </div>
        <div style={{padding:32}}>
          {/* Accent */}
          <div style={{height:2,marginBottom:28,background:`linear-gradient(90deg,${project.acc},transparent)`}}/>
          <p style={{fontFamily:"Inter, sans-serif",color:`${T.ink}65`,lineHeight:1.75,fontSize:15,marginBottom:28}}>{project.desc}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:28}}>
            <div>
              <div style={{fontFamily:"Inter, sans-serif",fontSize:9,color:T.sand,letterSpacing:"0.26em",textTransform:"uppercase",marginBottom:10}}>The Challenge</div>
              <p style={{fontFamily:"Inter, sans-serif",color:`${T.ink}55`,fontSize:13,lineHeight:1.72}}>{project.challenge}</p>
            </div>
            <div>
              <div style={{fontFamily:"Inter, sans-serif",fontSize:9,color:T.sand,letterSpacing:"0.26em",textTransform:"uppercase",marginBottom:10}}>Our Solution</div>
              <p style={{fontFamily:"Inter, sans-serif",color:`${T.ink}55`,fontSize:13,lineHeight:1.72}}>{project.solution}</p>
            </div>
          </div>
          <div style={{marginBottom:28}}>
            <div style={{fontFamily:"Inter, sans-serif",fontSize:9,color:T.sand,letterSpacing:"0.26em",textTransform:"uppercase",marginBottom:12}}>Results</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {project.results.map(r=>(
                <div key={r} style={{background:T.cream,border:`1px solid ${T.sand}40`,padding:"14px 16px",display:"flex",alignItems:"flex-start",gap:10}}>
                  <span style={{color:T.amber,flexShrink:0,marginTop:2}}>—</span>
                  <span style={{fontFamily:"Inter, sans-serif",fontSize:13,color:`${T.ink}70`,fontWeight:600}}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28}}>
            {project.tags.map(t=>(<span key={t} style={{fontFamily:"Inter, sans-serif",fontSize:10,padding:"6px 12px",border:`1px solid ${T.sand}50`,color:`${T.ink}45`,letterSpacing:"0.1em"}}>{t}</span>))}
          </div>
          <a href="/contact" data-h
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,background:T.ink,color:T.cream,fontFamily:"Inter, sans-serif",fontWeight:700,fontSize:11,letterSpacing:"0.22em",textTransform:"uppercase",padding:"20px",textDecoration:"none",transition:"background 0.3s"}}
            onMouseEnter={e=>e.currentTarget.style.background=T.amber}
            onMouseLeave={e=>e.currentTarget.style.background=T.ink}>Start a Similar Project →</a>
        </div>
      </motion.div>
    </motion.div>
  );
}