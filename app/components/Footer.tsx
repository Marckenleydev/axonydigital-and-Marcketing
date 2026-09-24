


import { NAV } from "./Navbar";
import { T } from "../data";

/* ─────────────────────────── FOOTER ─────────────────────────── */
export function Footer() {
  return (
    <footer style={{ background: "transparent",borderTop:`1px solid ${T.cream}07`,padding:"56px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:32,paddingBottom:40,marginBottom:32,borderBottom:`1px solid ${T.cream}07`}}>
          <a href="#" data-h style={{display:"flex",alignItems:"center",gap:12,textDecoration:"none"}}>
            <div style={{width:36,height:36,background:"linear-gradient(110deg, #7437ea, #5720d3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:T.cream,fontFamily:"Inter, sans-serif",fontWeight:900,fontSize:14}}>A</span>
            </div>
            <span style={{fontFamily:"Inter, sans-serif",fontWeight:800,fontSize:13,letterSpacing:"0.22em",color:T.cream,textTransform:"uppercase"}}>AXONY<span style={{color:T.amber}}>.</span>DIGITAL</span>
          </a>
          <nav style={{display:"flex",flexWrap:"wrap",gap:32}}>
            {NAV.map(l=>(
              <a key={l.label} href={l.href} data-h
                style={{fontFamily:"Inter, sans-serif",fontSize:10,fontWeight:600,color:`${T.cream}30`,textDecoration:"none",letterSpacing:"0.22em",textTransform:"uppercase",transition:"color 0.25s"}}
                onMouseEnter={e=>(e.target as HTMLElement).style.color=`${T.cream}70`}
                onMouseLeave={e=>(e.target as HTMLElement).style.color=`${T.cream}30`}>{l.label}</a>
            ))}
          </nav>
          <div style={{display:"flex",gap:20}}>
            {["Dribbble","LinkedIn","GitHub"].map(s=>(
              <a key={s} href="#" data-h
                style={{fontFamily:"Inter, sans-serif",fontSize:10,color:`${T.cream}25`,textDecoration:"none",letterSpacing:"0.2em",textTransform:"uppercase",transition:"color 0.25s"}}
                onMouseEnter={e=>(e.target as HTMLElement).style.color=T.amber}
                onMouseLeave={e=>(e.target as HTMLElement).style.color=`${T.cream}25`}>{s}</a>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:`${T.cream}30`,letterSpacing:"0.18em"}}>© 2026 CRAFT.STUDIO — All rights reserved.</span>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80"}} />
            <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:`${T.cream}30`,letterSpacing:"0.18em"}}>Open for new projects</span>
          </div>
          <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:`${T.cream}30`,letterSpacing:"0.16em"}}>Strategy · Creativity · Technology · Growth</span>
        </div>
      </div>
    </footer>
  );
}