"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PROJECTS, T } from "../data";
import { Cursor } from "../components/Cursor";
import { CaseModal } from "../components/CaseModal";


const ease=[0.22,1,0.36,1];


function useRev(m="-60px"){const r=useRef(null);const v=useInView(r,{once:true,margin:m});return [r,v];}



/* ── PROJECT CARD ── */
function ProjectCard({w,i,onClick}){
  const [hov,setHov]=useState(false);
  const [r,v]=useRev("-60px");
  return(
    <motion.div ref={r} layout initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{opacity:0}} transition={{duration:0.75,delay:(i%3)*0.1,ease}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={onClick} data-h
      style={{background:T.inkSoft,minHeight:360,padding:36,display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"none",position:"relative",overflow:"hidden"}}>
      <motion.div animate={{opacity:hov?0.14:0.05}} style={{position:"absolute",inset:0,background:`radial-gradient(circle at 30% 50%,${w.acc},transparent 70%)`,filter:"blur(50px)"}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32}}>
          <span style={{fontFamily:"Inter, sans-serif",fontSize:13,color:`${T.cream}70`,letterSpacing:"0.18em"}}>{w.id}</span>
          
        </div>
        <h3 style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:T.cream,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:4}}>{w.title}</h3>
        <p style={{fontFamily:"Inter, sans-serif",fontSize:12,color:`${T.cream}B0`,marginBottom:12,letterSpacing:"0.08em"}}>{w.sub}</p>
        <motion.p animate={{opacity:hov?1:0,y:hov?0:8}} transition={{duration:0.3}}
          style={{fontFamily:"Inter, sans-serif",fontSize:13,color:`${T.cream}55`,lineHeight:1.65,maxWidth:280}}>{w.desc}</motion.p>
      </div>
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:20,marginTop:16,borderTop:`1px solid ${w.acc}20`}}>
        {/* <span style={{fontFamily:"Inter, sans-serif",fontSize:11,color:`${w.acc}60`}}>{w.year}</span> */}
        <motion.span animate={{x:hov?0:-8,opacity:hov?1:0}} style={{fontFamily:"Inter, sans-serif",fontWeight:700,fontSize:12,color:T.cream}}>
          Case Study →
        </motion.span>
      </div>
      <motion.div animate={{scaleX:hov?1:0}} style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:w.acc,transformOrigin:"left"}} transition={{duration:0.4}}/>
    </motion.div>
  );
}

/* ── PAGE ── */
export default function WorkPage(){
  const [selected,setSelected]=useState<typeof PROJECTS[0] | null>(null);
  const [r,v]=useRev();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return(
    <div style={{fontFamily:"Inter, sans-serif",background:T.creamDark,minHeight:"100vh",cursor:"none"}}>
      <Cursor/>
      <Navbar />

      {/* Hero */}
      <section style={{background:T.creamDark,padding:"160px 24px 80px",position:"relative",overflow:"hidden"}}>
        <div ref={r} style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,x:-20}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.8,delay:0.1}} style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
            <span style={{width:48,height:1,background:T.amber,display:"block"}}/>
            <span style={{fontFamily:"Inter, sans-serif",fontSize:11,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Selected Work</span>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:1,delay:0.2,ease}}
            style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(3rem,8vw,8rem)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.03em",color:T.ink,marginBottom:28,maxWidth:800}}>
            Selected Work &
            <br/>
           <span style={{ fontStyle: "italic", color: T.amber, whiteSpace: "nowrap" }}>Case Studies.</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:0.45}}
            style={{fontFamily:"Inter, sans-serif",color:`${T.ink}65`,fontSize:17,maxWidth:440,lineHeight:1.75}}>
            A selection of digital experiences we&apos;ve crafted for ambitious brands. Every project reflects strategy, creativity, and a commitment to delivering exceptional results.
          </motion.p>
        </div>
      </section>

      {/* Carousel */}
      <section style={{background:T.creamDark,padding:"4px 24px 120px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <style>{`
            .work-carousel {
              overflow: hidden;
              width: 100%;
              cursor: grab;
            }

            .work-carousel:active {
              cursor: grabbing;
            }

            .work-carousel-container {
              display: flex;
              gap: 2px;
              touch-action: pan-y pinch-zoom;
            }

            .work-slide {
              flex: 0 0 88%;
              min-width: 0;
            }

            .work-arrow {
              transition:
                background 0.3s ease,
                color 0.3s ease,
                border-color 0.3s ease,
                transform 0.3s ease;
            }

            .work-arrow:hover {
              transform: translateY(-2px);
            }

            .work-arrow-prev:hover {
              background: ${T.ink} !important;
              color: ${T.cream} !important;
              border-color: ${T.ink} !important;
            }

            .work-arrow-next:hover {
              background: ${T.amber} !important;
              border-color: ${T.amber} !important;
            }

            .work-pagination {
              transition:
                width 0.35s ease,
                background 0.35s ease;
            }

            @media (min-width: 640px) {
              .work-slide {
                flex: 0 0 70%;
              }
            }

            @media (min-width: 1024px) {
              .work-slide {
                flex: 0 0 58%;
              }
            }

            @media (min-width: 1280px) {
              .work-slide {
                flex: 0 0 56%;
              }
            }
          `}</style>

          <div style={{ position: "relative", width: "100%" }}>
            <div ref={emblaRef} className="work-carousel">
              <div className="work-carousel-container">
                {PROJECTS.map((w, i) => (
                  <div key={w.id} className="work-slide">
                    <ProjectCard w={w} i={i} onClick={()=>setSelected(w)}/>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {PROJECTS.map((_, i: number) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className="work-pagination"
                    style={{
                      width: i === selectedIndex ? 28 : 7,
                      height: 2,
                      padding: 0,
                      border: 0,
                      background: i === selectedIndex ? T.amber : `${T.ink}30`,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={scrollPrev}
                  aria-label="Previous project"
                  className="work-arrow work-arrow-prev"
                  style={{
                    width: 46,
                    height: 46,
                    border: `1px solid ${T.ink}20`,
                    background: "transparent",
                    color: T.ink,
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    padding: 0,
                  }}
                >
                  ←
                </button>

                <button
                  onClick={scrollNext}
                  aria-label="Next project"
                  className="work-arrow work-arrow-next"
                  style={{
                    width: 46,
                    height: 46,
                    border: `1px solid ${T.ink}`,
                    background: T.ink,
                    color: T.cream,
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    padding: 0,
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:T.cream,padding:"120px 24px"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9,ease}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:24}}>
              <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
              <span style={{fontFamily:"Inter, sans-serif",fontSize:10,color:T.amber,letterSpacing:"0.28em",textTransform:"uppercase"}}>Your Turn</span>
              <span style={{width:32,height:1,background:T.amber,display:"block"}}/>
            </div>
            <h2 style={{fontFamily:"Inter, sans-serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:900,color:T.ink,letterSpacing:"-0.03em",lineHeight:1.05,marginBottom:20}}>
              Your Project<br/><span style={{fontStyle:"italic",color:T.amber}}>Could Be Next.</span>
            </h2>
            <p style={{fontFamily:"Inter, sans-serif",color:`${T.ink}55`,fontSize:16,lineHeight:1.75,marginBottom:40}}>
              Free discovery call to kick things off. No commitment — just a conversation.
            </p>
            <a href="/contact" data-h
              style={{display:"inline-flex",alignItems:"center",gap:14,background:T.sand,color:T.cream,fontFamily:"Inter, sans-serif",fontWeight:700,fontSize:12,letterSpacing:"0.22em",textTransform:"uppercase",padding:"20px 40px",textDecoration:"none",transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=T.amber}
              onMouseLeave={e=>e.currentTarget.style.background=T.sand}>
              Start a Project →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer/>

      <AnimatePresence>
        {selected&&<CaseModal project={selected} onClose={()=>setSelected(null)}/>}
      </AnimatePresence>
    </div>
  );
}