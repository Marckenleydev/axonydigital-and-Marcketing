import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { T } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const ref = useRef(null);
  const clipRef = useRef(null);   // outer — holds border-radius, NEVER scales
  const scaleRef = useRef(null);  // inner — GSAP scales/moves THIS, no radius
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Layered parallax speeds — each element drifts at its own rate for depth
  const y          = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yEyebrow   = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yHeading   = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const ySub       = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opac       = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const headingOpac= useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.6]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const headingBlur  = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const headingFilter = useTransform(headingBlur, (v) => `blur(${v}px)`);

  const lines = [
    { segments: [
        { text: "WE TURN", italic: false },
        { text: "ATTENTION", italic: true },
      ]
    },
    { segments: [
        { text: "Into Sales.", italic: false },
      ]
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Radius lives on the OUTER, non-scaled element — no compositor conflict
      gsap.fromTo(clipRef.current,
        { borderRadius: 50 },
        {
          borderRadius: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: clipRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Scale/opacity/position live on the INNER element — no radius here at all
      gsap.fromTo(scaleRef.current,
        { scale: 0.82, opacity: 0.7, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: clipRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // subtle parallax on the video itself while scrolling past
      gsap.to(scaleRef.current.querySelector("video"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: clipRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      minHeight: "100vh",
      background: T.creamDark,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingBottom: "clamp(40px, 8vh, 80px)",
      overflow: "hidden"
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.055,
        backgroundImage: `radial-gradient(circle, ${T.amber} 1px, transparent 1px)`,
        backgroundSize: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)"
      }} />

      {/* Amber blob */}
      <div style={{
        position: "absolute",
        top: "clamp(10%, 15%, 18%)",
        right: "clamp(2%, 5%, 8%)",
        width: "min(380px, 50vw)",
        height: "min(380px, 50vw)",
        borderRadius: "50%",
        background: `${T.amber}09`,
        filter: "blur(clamp(40px, 8vw, 90px))",
        pointerEvents: "none"
      }} />

      <motion.div style={{
        y,
        opacity: opac,
        position: "relative",
        zIndex: 10,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(60px, 12vh, 128px) clamp(16px, 5vw, 24px) 0",
        width: "100%"
      }}>
        {/* Eyebrow */}
        <motion.div 
          initial={{opacity:0, x:-20}} 
          animate={{opacity:1, x:0}} 
          transition={{duration:0.8, delay:0.2}}
          style={{
            y: yEyebrow,
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(20px, 4vh, 36px)",
            flexWrap: "wrap"
          }}>
          <span style={{
            width: "clamp(32px, 6vw, 48px)",
            height: 1,
            background: T.amber,
            display: "block"
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "clamp(9px, 2vw, 11px)",
            color: T.amber,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            whiteSpace: "nowrap"
          }}>
            Premium Digital Agency · Est. 2024
          </span>
        </motion.div>

        {/* Heading - 2 lines */}
        <motion.h1 style={{
          y: yHeading,
          opacity: headingOpac,
          scale: headingScale,
          filter: headingFilter,
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(2.5rem, 12vw, 8.5rem)",
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "0.03em",
          color: T.ink,
          marginBottom: "clamp(16px, 3vh, 28px)",
          maxWidth: "min(900px, 100%)",
          transformOrigin: "left center"
        }}>
          {lines.map((line, li)=>(
            <span key={li} style={{display:"block"}}>
              {line.segments.map((w, wi)=>(
                w.text.split(" ").map((wd, i)=>(
                  <span key={`${wi}-${i}`} style={{
                    overflow:"hidden",
                    display:"inline-block",
                    marginRight:"0.3em",
                    paddingRight:"0.1em"
                  }}>
                    <motion.span 
                      initial={{y:"115%", rotate:2}} 
                      animate={{y:"0%", rotate:0}}
                      transition={{duration:1, delay:0.3+li*0.18+wi*0.12+i*0.07, ease}}
                      style={{
                        display:"inline-block",
                        fontStyle:w.italic?"italic":"normal",
                        color:w.italic?T.amber:T.ink,
                        fontSize: "inherit"
                      }}>
                      {wd}
                    </motion.span>
                  </span>
                ))
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Sub + CTA */}
        <motion.div style={{
          y: ySub,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(16px, 4vw, 32px)",
          marginTop: "clamp(16px, 3vh, 32px)",
          marginBottom: "clamp(32px, 6vh, 56px)"
        }}>
          <motion.p 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            transition={{duration:0.8, delay:0.9}}
            style={{
              fontFamily: "'Syne',sans-serif",
              color: `${T.ink}70`,
              fontSize: "clamp(15px, 3vw, 17px)",
              maxWidth: "min(400px, 100%)",
              lineHeight: 1.7,
              flex: "1 1 300px"
            }}>
           Web platforms, marketing, and content built to scale ambitious brands.
          </motion.p>
          
          <motion.div 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            transition={{duration:0.8, delay:1.05}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 3vw, 20px)",
              flexWrap: "wrap",
              flex: "1 1 auto",
              justifyContent: "flex-start"
            }}>
            <a href="/contact" data-h
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 14px)",
                background: T.sand,
                color: T.cream,
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "clamp(12px, 2vh, 18px) clamp(20px, 4vw, 32px)",
                textDecoration: "none",
                transition: "background 0.3s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={e=>e.currentTarget.style.background=T.amber}
              onMouseLeave={e=>e.currentTarget.style.background=T.sand}>
              Get in touch <span style={{fontSize: "clamp(16px, 3vw, 18px)"}}>→</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* VIDEO — clipRef holds radius (static), scaleRef holds scale (no radius) */}
      <div
        ref={clipRef}
        style={{
          position: "relative",
          zIndex: 5,
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
            
          height: "clamp(320px, 55vh, 640px)",
          overflow: "hidden"
        }}
      >
        <div
          ref={scaleRef}
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "center center"
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
              display: "block"
            }}
          >
            <source src="/videos/Meta_Smart_Glasses.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}