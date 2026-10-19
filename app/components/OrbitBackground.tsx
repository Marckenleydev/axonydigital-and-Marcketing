// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export function OrbitBackground() {
//   const orb1Ref = useRef<HTMLDivElement>(null);
//   const orb2Ref = useRef<HTMLDivElement>(null);
//   const orb3Ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

//     const ctx = gsap.context(() => {
//       gsap.to(orb1Ref.current, {
//         y: "+=18", x: "+=10", duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1,
//       });
//       gsap.to(orb2Ref.current, {
//         y: "-=14", x: "-=8", duration: 7.5, ease: "sine.inOut", yoyo: true, repeat: -1,
//       });
//       gsap.to(orb3Ref.current, {
//         y: "+=10", duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1,
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="page-orbit-layer" aria-hidden="true">
//       <div ref={orb1Ref} style={{
//         position: "absolute", top: "-10%", right: "-5%",
//         width: "clamp(400px, 55vw, 700px)", height: "clamp(400px, 55vw, 700px)",
//         borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(79,90,240,0.22) 0%, rgba(27,42,107,0.08) 65%, transparent 100%)",
//         filter: "blur(60px)", pointerEvents: "none", willChange: "transform",
//       }} />
//       <div ref={orb2Ref} style={{
//         position: "absolute", bottom: "5%", left: "-8%",
//         width: "clamp(280px, 38vw, 500px)", height: "clamp(280px, 38vw, 500px)",
//         borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(79,168,240,0.18) 0%, rgba(13,21,53,0.05) 65%, transparent 100%)",
//         filter: "blur(50px)", pointerEvents: "none", willChange: "transform",
//       }} />
//       <div ref={orb3Ref} style={{
//         position: "absolute", top: "35%", left: "40%",
//         width: "clamp(180px, 22vw, 320px)", height: "clamp(180px, 22vw, 320px)",
//         borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(130,198,255,0.10) 0%, transparent 70%)",
//         filter: "blur(40px)", pointerEvents: "none", opacity: 0.5, willChange: "transform",
//       }} />
//     </div>
//   );
// }




// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export function OrbitBackground() {
//   const orb1Ref = useRef<HTMLDivElement>(null);
//   const orb2Ref = useRef<HTMLDivElement>(null);
//   const orb3Ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
//       return;

//     const ctx = gsap.context(() => {
//       gsap.to(orb1Ref.current, {
//         y: "+=18",
//         x: "+=10",
//         duration: 6,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });

//       gsap.to(orb2Ref.current, {
//         y: "-=14",
//         x: "-=8",
//         duration: 7.5,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });

//       gsap.to(orb3Ref.current, {
//         y: "+=10",
//         duration: 5,
//         ease: "sine.inOut",
//         yoyo: true,
//         repeat: -1,
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="page-orbit-layer" aria-hidden="true">
//       {/* Top-right: Royal blue glow */}
//       <div
//         ref={orb1Ref}
//         style={{
//           position: "absolute",
//           top: "-10%",
//           right: "-5%",
//           width: "clamp(400px, 55vw, 700px)",
//           height: "clamp(400px, 55vw, 700px)",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(37, 99, 235, 0.30) 0%, rgba(29, 78, 216, 0.18) 35%, rgba(30, 58, 138, 0.08) 65%, transparent 100%)",
//           filter: "blur(60px)",
//           pointerEvents: "none",
//           willChange: "transform",
//         }}
//       />

//       {/* Bottom-left: Electric blue glow */}
//       <div
//         ref={orb2Ref}
//         style={{
//           position: "absolute",
//           bottom: "5%",
//           left: "-8%",
//           width: "clamp(280px, 38vw, 500px)",
//           height: "clamp(280px, 38vw, 500px)",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(29, 78, 216, 0.28) 0%, rgba(30, 64, 175, 0.16) 40%, rgba(15, 23, 72, 0.06) 70%, transparent 100%)",
//           filter: "blur(50px)",
//           pointerEvents: "none",
//           willChange: "transform",
//         }}
//       />

//       {/* Center: Subtle blue atmospheric highlight */}
//       <div
//         ref={orb3Ref}
//         style={{
//           position: "absolute",
//           top: "35%",
//           left: "40%",
//           width: "clamp(180px, 22vw, 320px)",
//           height: "clamp(180px, 22vw, 320px)",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(37, 99, 235, 0.07) 45%, transparent 70%)",
//           filter: "blur(40px)",
//           pointerEvents: "none",
//           opacity: 0.7,
//           willChange: "transform",
//         }}
//       />
//     </div>
//   );
// }


// "use client";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export function OrbitBackground() {
//   const orb1Ref = useRef<HTMLDivElement>(null);
//   const orb2Ref = useRef<HTMLDivElement>(null);
//   const orb3Ref = useRef<HTMLDivElement>(null);
//   const orb4Ref = useRef<HTMLDivElement>(null);
//   const orb5Ref = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // ── Scroll-driven orbit ──
// const orbits = [
//   { ref: orb1Ref, yTo: "-20%", xTo: "5%",  rotate: 20  },
//   { ref: orb2Ref, yTo: "10%",  xTo: "-5%", rotate: -15 },
//   { ref: orb3Ref, yTo: "-15%", xTo: "8%",  rotate: 10  },
//   { ref: orb4Ref, yTo: "8%",   xTo: "12%", rotate: -20 },
//   { ref: orb5Ref, yTo: "-10%", xTo: "-8%", rotate: 15  },
// ];

// orbits.forEach(({ ref, yTo, xTo, rotate }) => {
//   gsap.to(ref.current, {
//     y: yTo,
//     x: xTo,
//     rotate,
//     ease: "none",
//     scrollTrigger: {
//       trigger: document.body,
//       start: "top top",
//       end: "bottom bottom",
//       scrub: 2.5,
//     },
//   });
// });

// // ── Grid parallax on scroll ──
// gsap.to(gridRef.current, {
//   y: "15%",
//   ease: "none",
//   scrollTrigger: {
//     trigger: document.body,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: 1.5,
//   },
// });
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

//     const ctx = gsap.context(() => {

//       // Orb 1 — slow drift top-right
//       gsap.to(orb1Ref.current, {
//         y: "+=28", x: "+=16",
//         duration: 9, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });

//       // Orb 2 — counter drift bottom-left
//       gsap.to(orb2Ref.current, {
//         y: "-=22", x: "-=14",
//         duration: 11, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });

//       // Orb 3 — center breathe
//       gsap.to(orb3Ref.current, {
//         scale: 1.25, opacity: 0.5,
//         duration: 7, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });

//       // Orb 4 — top-left slow rotation drift
//       gsap.to(orb4Ref.current, {
//         y: "+=20", x: "+=12", rotate: 15,
//         duration: 13, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });

//       // Orb 5 — bottom-right pulse
//       gsap.to(orb5Ref.current, {
//         scale: 1.3, opacity: 0.3,
//         duration: 8, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//         delay: 2,
//       });

//       // Grid fade in
//       gsap.fromTo(gridRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 2, ease: "power2.out" }
//       );

//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       aria-hidden="true"
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 0,
//         pointerEvents: "none",
//         overflow: "hidden",
//       }}
//     >

//       {/* ── Perspective grid ── */}
//       <div
//         ref={gridRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           opacity: 0,
//           backgroundImage: `
//             linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
//           `,
//           backgroundSize: "80px 80px",
//           maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
//           WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
//         }}
//       />

//       {/* ── Scanline texture ── */}
//       <div style={{
//         position: "absolute",
//         inset: 0,
//         backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.015) 2px, rgba(59,130,246,0.015) 4px)",
//         pointerEvents: "none",
//       }} />

//       {/* ── Orb 1 — large royal blue, top-right ── */}
//       <div
//         ref={orb1Ref}
//         style={{
//           position: "absolute",
//           top: "-15%", right: "-8%",
//           width: "clamp(500px, 60vw, 900px)",
//           height: "clamp(500px, 60vw, 900px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.12) 40%, rgba(30,58,138,0.05) 70%, transparent 100%)",
//           filter: "blur(70px)",
//           willChange: "transform",
//         }}
//       />

//       {/* ── Orb 2 — deep indigo, bottom-left ── */}
//       <div
//         ref={orb2Ref}
//         style={{
//           position: "absolute",
//           bottom: "0%", left: "-10%",
//           width: "clamp(320px, 42vw, 650px)",
//           height: "clamp(320px, 42vw, 650px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(29,78,216,0.24) 0%, rgba(30,64,175,0.12) 45%, rgba(15,23,72,0.04) 75%, transparent 100%)",
//           filter: "blur(60px)",
//           willChange: "transform",
//         }}
//       />

//       {/* ── Orb 3 — center atmospheric pulse ── */}
//       <div
//         ref={orb3Ref}
//         style={{
//           position: "absolute",
//           top: "30%", left: "35%",
//           width: "clamp(200px, 28vw, 420px)",
//           height: "clamp(200px, 28vw, 420px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(37,99,235,0.06) 50%, transparent 75%)",
//           filter: "blur(50px)",
//           opacity: 0.6,
//           willChange: "transform, opacity",
//         }}
//       />

//       {/* ── Orb 4 — top-left accent ── */}
//       <div
//         ref={orb4Ref}
//         style={{
//           position: "absolute",
//           top: "5%", left: "-5%",
//           width: "clamp(180px, 22vw, 360px)",
//           height: "clamp(180px, 22vw, 360px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(67,56,202,0.08) 50%, transparent 80%)",
//           filter: "blur(55px)",
//           opacity: 0.7,
//           willChange: "transform",
//         }}
//       />

//       {/* ── Orb 5 — bottom-right warm pulse ── */}
//       <div
//         ref={orb5Ref}
//         style={{
//           position: "absolute",
//           bottom: "10%", right: "5%",
//           width: "clamp(160px, 20vw, 300px)",
//           height: "clamp(160px, 20vw, 300px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(37,99,235,0.20) 0%, rgba(29,78,216,0.08) 55%, transparent 80%)",
//           filter: "blur(45px)",
//           opacity: 0.5,
//           willChange: "transform, opacity",
//         }}
//       />

//       {/* ── Top edge glow beam ── */}
//       <div style={{
//         position: "absolute",
//         top: 0, left: "20%",
//         width: "60%", height: "1px",
//         background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(99,102,241,0.5), rgba(59,130,246,0.4), transparent)",
//         filter: "blur(1px)",
//       }} />

//       {/* ── Bottom edge glow beam ── */}
//       <div style={{
//         position: "absolute",
//         bottom: 0, left: "15%",
//         width: "50%", height: "1px",
//         background: "linear-gradient(90deg, transparent, rgba(29,78,216,0.3), transparent)",
//         filter: "blur(1px)",
//       }} />

//       {/* ── Vignette ── */}
//       <div style={{
//         position: "absolute",
//         inset: 0,
//         background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,9,31,0.6) 100%)",
//       }} />

//     </div>
//   );
// }



// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export function OrbitBackground() {
//   const orb1Ref = useRef<HTMLDivElement>(null);
//   const orb2Ref = useRef<HTMLDivElement>(null);
//   const orb3Ref = useRef<HTMLDivElement>(null);
//   const orb4Ref = useRef<HTMLDivElement>(null);
//   const orb5Ref = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);
//   const ring1Ref = useRef<HTMLDivElement>(null);
//   const ring2Ref = useRef<HTMLDivElement>(null);
//   const ring3Ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

//     const ctx = gsap.context(() => {

//       // ── IDLE FLOAT ANIMATIONS ──
//       gsap.to(orb1Ref.current, {
//         y: "+=28", x: "+=16",
//         duration: 9, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });
//       gsap.to(orb2Ref.current, {
//         y: "-=22", x: "-=14",
//         duration: 11, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });
//       gsap.to(orb3Ref.current, {
//         scale: 1.25, opacity: 0.5,
//         duration: 7, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });
//       gsap.to(orb4Ref.current, {
//         y: "+=20", x: "+=12",
//         duration: 13, ease: "sine.inOut",
//         yoyo: true, repeat: -1,
//       });
//       gsap.to(orb5Ref.current, {
//         scale: 1.3, opacity: 0.3,
//         duration: 8, ease: "sine.inOut",
//         yoyo: true, repeat: -1, delay: 2,
//       });

//       // ── RINGS IDLE SPIN ──
//       gsap.to(ring1Ref.current, {
//         rotation: 360,
//         duration: 40, ease: "none",
//         repeat: -1,
//       });
//       gsap.to(ring2Ref.current, {
//         rotation: -360,
//         duration: 28, ease: "none",
//         repeat: -1,
//       });
//       gsap.to(ring3Ref.current, {
//         rotation: 360,
//         duration: 55, ease: "none",
//         repeat: -1,
//       });

//       // ── GRID FADE IN ──
//       gsap.fromTo(gridRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 2, ease: "power2.out" }
//       );

//       // ── SCROLL: ORB 1 — sweeps left across viewport ──
//       gsap.to(orb1Ref.current, {
//         x: "-55vw",
//         y: "30vh",
//         scale: 1.6,
//         opacity: 0.08,
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 3,
//         },
//       });

//       // ── SCROLL: ORB 2 — rises and drifts right ──
//       gsap.to(orb2Ref.current, {
//         x: "40vw",
//         y: "-35vh",
//         scale: 1.4,
//         opacity: 0.15,
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 4,
//         },
//       });

//       // ── SCROLL: ORB 3 — center expands and moves up ──
//       gsap.to(orb3Ref.current, {
//         y: "-40vh",
//         scale: 2.2,
//         opacity: 0.08,
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 2.5,
//         },
//       });

//       // ── SCROLL: ORB 4 — top-left drifts down-right ──
//       gsap.to(orb4Ref.current, {
//         x: "30vw",
//         y: "45vh",
//         rotate: 45,
//         opacity: 0.12,
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 5,
//         },
//       });

//       // ── SCROLL: ORB 5 — bottom-right sweeps up ──
//       gsap.to(orb5Ref.current, {
//         x: "-30vw",
//         y: "-50vh",
//         scale: 1.8,
//         opacity: 0.18,
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 3.5,
//         },
//       });

//       // ── SCROLL: RING 1 — parallax scale ──
//       gsap.to(ring1Ref.current, {
//         scale: 2.5,
//         opacity: 0,
//         y: "-30vh",
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "60% bottom",
//           scrub: 2,
//         },
//       });

//       // ── SCROLL: RING 2 — counter parallax ──
//       gsap.to(ring2Ref.current, {
//         scale: 0.4,
//         opacity: 0.6,
//         y: "20vh",
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 2.5,
//         },
//       });

//       // ── SCROLL: GRID — slow parallax ──
//       gsap.to(gridRef.current, {
//         y: "20%",
//         opacity: 0.3,
//         ease: "none",
//         scrollTrigger: {
//           trigger: document.body,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 1.8,
//         },
//       });

//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       aria-hidden="true"
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 0,
//         pointerEvents: "none",
//         overflow: "hidden",
//       }}
//     >

//       {/* ── Perspective grid ── */}
//       <div
//         ref={gridRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           opacity: 0,
//           backgroundImage: `
//             linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
//           `,
//           backgroundSize: "80px 80px",
//           maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
//           WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
//         }}
//       />

//       {/* ── Scanlines ── */}
//       <div style={{
//         position: "absolute",
//         inset: 0,
//         backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.012) 2px, rgba(59,130,246,0.012) 4px)",
//       }} />

//       {/* ── Ring 1 — large outer orbit ── */}
//       <div
//         ref={ring1Ref}
//         style={{
//           position: "absolute",
//           top: "50%", left: "50%",
//           width: "clamp(600px, 80vw, 1100px)",
//           height: "clamp(600px, 80vw, 1100px)",
//           borderRadius: "50%",
//           border: "1px solid rgba(59,130,246,0.07)",
//           transform: "translate(-50%, -50%)",
//           willChange: "transform",
//         }}
//       >
//         {/* Dot on ring */}
//         <div style={{
//           position: "absolute",
//           top: "2%", left: "50%",
//           width: 6, height: 6,
//           borderRadius: "50%",
//           background: "rgba(99,102,241,0.7)",
//           boxShadow: "0 0 12px rgba(99,102,241,0.8)",
//           transform: "translateX(-50%)",
//         }} />
//       </div>

//       {/* ── Ring 2 — medium inner orbit ── */}
//       <div
//         ref={ring2Ref}
//         style={{
//           position: "absolute",
//           top: "50%", left: "50%",
//           width: "clamp(380px, 50vw, 700px)",
//           height: "clamp(380px, 50vw, 700px)",
//           borderRadius: "50%",
//           border: "1px solid rgba(37,99,235,0.09)",
//           transform: "translate(-50%, -50%)",
//           willChange: "transform",
//         }}
//       >
//         {/* Dot on ring */}
//         <div style={{
//           position: "absolute",
//           bottom: "3%", right: "12%",
//           width: 4, height: 4,
//           borderRadius: "50%",
//           background: "rgba(59,130,246,0.8)",
//           boxShadow: "0 0 10px rgba(59,130,246,0.9)",
//         }} />
//       </div>

//       {/* ── Ring 3 — tiny accent orbit ── */}
//       <div
//         ref={ring3Ref}
//         style={{
//           position: "absolute",
//           top: "50%", left: "50%",
//           width: "clamp(200px, 28vw, 420px)",
//           height: "clamp(200px, 28vw, 420px)",
//           borderRadius: "50%",
//           border: "1px solid rgba(29,78,216,0.12)",
//           transform: "translate(-50%, -50%)",
//           willChange: "transform",
//         }}
//       >
//         <div style={{
//           position: "absolute",
//           top: "8%", left: "8%",
//           width: 3, height: 3,
//           borderRadius: "50%",
//           background: "rgba(99,102,241,0.9)",
//           boxShadow: "0 0 8px rgba(99,102,241,1)",
//         }} />
//       </div>

//       {/* ── Orb 1 — large royal blue, top-right ── */}
//       <div
//         ref={orb1Ref}
//         style={{
//           position: "absolute",
//           top: "-15%", right: "-8%",
//           width: "clamp(500px, 60vw, 900px)",
//           height: "clamp(500px, 60vw, 900px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.12) 40%, rgba(30,58,138,0.05) 70%, transparent 100%)",
//           filter: "blur(70px)",
//           willChange: "transform",
//         }}
//       />

//       {/* ── Orb 2 — deep indigo, bottom-left ── */}
//       <div
//         ref={orb2Ref}
//         style={{
//           position: "absolute",
//           bottom: "0%", left: "-10%",
//           width: "clamp(320px, 42vw, 650px)",
//           height: "clamp(320px, 42vw, 650px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(29,78,216,0.24) 0%, rgba(30,64,175,0.12) 45%, rgba(15,23,72,0.04) 75%, transparent 100%)",
//           filter: "blur(60px)",
//           willChange: "transform",
//         }}
//       />

//       {/* ── Orb 3 — center pulse ── */}
//       <div
//         ref={orb3Ref}
//         style={{
//           position: "absolute",
//           top: "30%", left: "35%",
//           width: "clamp(200px, 28vw, 420px)",
//           height: "clamp(200px, 28vw, 420px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(37,99,235,0.06) 50%, transparent 75%)",
//           filter: "blur(50px)",
//           opacity: 0.6,
//           willChange: "transform, opacity",
//         }}
//       />

//       {/* ── Orb 4 — top-left accent ── */}
//       <div
//         ref={orb4Ref}
//         style={{
//           position: "absolute",
//           top: "5%", left: "-5%",
//           width: "clamp(180px, 22vw, 360px)",
//           height: "clamp(180px, 22vw, 360px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(67,56,202,0.08) 50%, transparent 80%)",
//           filter: "blur(55px)",
//           opacity: 0.7,
//           willChange: "transform",
//         }}
//       />

//       {/* ── Orb 5 — bottom-right ── */}
//       <div
//         ref={orb5Ref}
//         style={{
//           position: "absolute",
//           bottom: "10%", right: "5%",
//           width: "clamp(160px, 20vw, 300px)",
//           height: "clamp(160px, 20vw, 300px)",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(37,99,235,0.20) 0%, rgba(29,78,216,0.08) 55%, transparent 80%)",
//           filter: "blur(45px)",
//           opacity: 0.5,
//           willChange: "transform, opacity",
//         }}
//       />

//       {/* ── Top edge beam ── */}
//       <div style={{
//         position: "absolute",
//         top: 0, left: "20%",
//         width: "60%", height: "1px",
//         background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(99,102,241,0.5), rgba(59,130,246,0.4), transparent)",
//         filter: "blur(1px)",
//       }} />

//       {/* ── Bottom edge beam ── */}
//       <div style={{
//         position: "absolute",
//         bottom: 0, left: "15%",
//         width: "50%", height: "1px",
//         background: "linear-gradient(90deg, transparent, rgba(29,78,216,0.3), transparent)",
//         filter: "blur(1px)",
//       }} />

//       {/* ── Vignette ── */}
//       <div style={{
//         position: "absolute",
//         inset: 0,
//         background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,9,31,0.65) 100%)",
//       }} />

//     </div>
//   );
// }







"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Particle system
function createParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const W = canvas.width = window.innerWidth;
  const H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5
      ? `rgba(59,130,246,`
      : Math.random() > 0.5
        ? `rgba(99,102,241,`
        : `rgba(147,197,253,`,
  }));

  let scrollY = 0;
  let raf: number;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const drift = scrollY * 0.04;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy - drift * 0.01;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    raf = requestAnimationFrame(draw);
  }

  draw();

  const onScroll = () => { scrollY = window.scrollY; };
  window.addEventListener("scroll", onScroll, { passive: true });

  const onResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  };
}

export function OrbitBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const orb1Ref    = useRef<HTMLDivElement>(null);
  const orb2Ref    = useRef<HTMLDivElement>(null);
  const orb3Ref    = useRef<HTMLDivElement>(null);
  const orb4Ref    = useRef<HTMLDivElement>(null);
  const orb5Ref    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const ring1Ref   = useRef<HTMLDivElement>(null);
  const ring2Ref   = useRef<HTMLDivElement>(null);
  const ring3Ref   = useRef<HTMLDivElement>(null);
  const beamRef    = useRef<HTMLDivElement>(null);
  const noiseRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Particle canvas
    let cleanupCanvas: (() => void) | undefined;
    if (canvasRef.current) {
      cleanupCanvas = createParticles(canvasRef.current);
    }

    const ctx = gsap.context(() => {

      // ── GRID FADE IN ──
      gsap.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: "power2.out" }
      );

      // ── RINGS SPIN ──
      gsap.to(ring1Ref.current, {
        rotation: 360, duration: 50,
        ease: "none", repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(ring2Ref.current, {
        rotation: -360, duration: 32,
        ease: "none", repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(ring3Ref.current, {
        rotation: 360, duration: 70,
        ease: "none", repeat: -1,
        transformOrigin: "50% 50%",
      });

      // ── BEAM PULSE ──
      gsap.to(beamRef.current, {
        opacity: 0.8, scaleX: 1.15,
        duration: 3, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });

      // ── IDLE FLOAT ──
      gsap.to(orb1Ref.current, {
        y: "+=30", x: "+=18",
        duration: 10, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.to(orb2Ref.current, {
        y: "-=24", x: "-=16",
        duration: 12, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.to(orb3Ref.current, {
        scale: 1.3, opacity: 0.4,
        duration: 8, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.to(orb4Ref.current, {
        y: "+=22", x: "+=14",
        duration: 14, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.to(orb5Ref.current, {
        scale: 1.4, opacity: 0.25,
        duration: 9, ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: 2,
      });

      // ── SCROLL MAGIC ──
      const scrollBase = {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
      };

      // Orb 1 — sweeps diagonally across page
      gsap.timeline({ scrollTrigger: scrollBase })
        .to(orb1Ref.current, {
          x: "-60vw", y: "50vh",
          scale: 2.2, opacity: 0.05,
          ease: "none",
        });

      // Orb 2 — spirals up and right
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 4 } })
        .to(orb2Ref.current, {
          x: "50vw", y: "-40vh",
          scale: 1.8, opacity: 0.1,
          ease: "none",
        });

      // Orb 3 — expands from center upward
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 2 } })
        .to(orb3Ref.current, {
          y: "-60vh", scale: 3,
          opacity: 0.04, ease: "none",
        });

      // Orb 4 — drifts down and right
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 5 } })
        .to(orb4Ref.current, {
          x: "35vw", y: "55vh",
          rotate: 60, opacity: 0.08,
          ease: "none",
        });

      // Orb 5 — rises fast
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 2.5 } })
        .to(orb5Ref.current, {
          x: "-25vw", y: "-60vh",
          scale: 2, opacity: 0.12,
          ease: "none",
        });

      // Ring 1 — expands and fades
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 2, end: "70% bottom" } })
        .to(ring1Ref.current, {
          scale: 2.8, opacity: 0,
          y: "-20vh", ease: "none",
        });

      // Ring 2 — shrinks and drops
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 3 } })
        .to(ring2Ref.current, {
          scale: 0.3, y: "30vh",
          opacity: 0.5, ease: "none",
        });

      // Ring 3 — drifts sideways
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 4 } })
        .to(ring3Ref.current, {
          x: "20vw", y: "-15vh",
          scale: 1.6, ease: "none",
        });

      // Grid parallax
      gsap.timeline({ scrollTrigger: { ...scrollBase, scrub: 1.5 } })
        .to(gridRef.current, {
          y: "25%", opacity: 0.15, ease: "none",
        });

    });

    return () => {
      ctx.revert();
      cleanupCanvas?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.6,
        }}
      />

      {/* ── Perspective grid ── */}
      <div
        ref={gridRef}
        style={{
          position: "absolute",
          inset: "-20%",
          opacity: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* ── Scanlines ── */}
     <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.012) 2px, rgba(59,130,246,0.012) 4px)",
      }} />

      {/* ── Noise texture ── */}
      <div
        ref={noiseRef}
        style={{
          position: "absolute", inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Ring 1 — outer ── */}
      <div ref={ring1Ref} style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "clamp(700px, 90vw, 1300px)",
        height: "clamp(700px, 90vw, 1300px)",
        borderRadius: "50%",
        border: "1px solid rgba(59,130,246,0.06)",
        transform: "translate(-50%, -50%)",
        willChange: "transform",
      }}>
        <div style={{ position: "absolute", top: "1%", left: "50%", width: 7, height: 7, borderRadius: "50%", background: "rgba(99,102,241,0.9)", boxShadow: "0 0 16px 4px rgba(99,102,241,0.6)", transform: "translateX(-50%)" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "6%", width: 4, height: 4, borderRadius: "50%", background: "rgba(59,130,246,0.7)", boxShadow: "0 0 10px rgba(59,130,246,0.8)" }} />
      </div>

      {/* ── Ring 2 — medium ── */}
      <div ref={ring2Ref} style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "clamp(420px, 55vw, 800px)",
        height: "clamp(420px, 55vw, 800px)",
        borderRadius: "50%",
        border: "1px solid rgba(37,99,235,0.08)",
        transform: "translate(-50%, -50%)",
        willChange: "transform",
      }}>
        <div style={{ position: "absolute", bottom: "4%", right: "10%", width: 5, height: 5, borderRadius: "50%", background: "rgba(147,197,253,0.9)", boxShadow: "0 0 12px rgba(147,197,253,0.7)" }} />
      </div>

      {/* ── Ring 3 — inner ── */}
      <div ref={ring3Ref} style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "clamp(220px, 30vw, 480px)",
        height: "clamp(220px, 30vw, 480px)",
        borderRadius: "50%",
        border: "1px solid rgba(29,78,216,0.1)",
        transform: "translate(-50%, -50%)",
        willChange: "transform",
      }}>
        <div style={{ position: "absolute", top: "6%", left: "10%", width: 3, height: 3, borderRadius: "50%", background: "rgba(99,102,241,1)", boxShadow: "0 0 8px rgba(99,102,241,1)" }} />
      </div>

      {/* ── Light beam ── */}
      <div
        ref={beamRef}
        style={{
          position: "absolute",
          top: 0, left: "15%",
          width: "70%", height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(99,102,241,0.7), rgba(147,197,253,0.5), transparent)",
          filter: "blur(2px)",
          opacity: 0.5,
        }}
      />

      {/* ── Orb 1 ── */}
      <div ref={orb1Ref} style={{
        position: "absolute", top: "-15%", right: "-8%",
        width: "clamp(500px, 60vw, 900px)", height: "clamp(500px, 60vw, 900px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.12) 40%, rgba(30,58,138,0.05) 70%, transparent 100%)",
        filter: "blur(70px)", willChange: "transform",
      }} />

      {/* ── Orb 2 ── */}
      <div ref={orb2Ref} style={{
        position: "absolute", bottom: "0%", left: "-10%",
        width: "clamp(320px, 42vw, 650px)", height: "clamp(320px, 42vw, 650px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(29,78,216,0.24) 0%, rgba(30,64,175,0.12) 45%, rgba(15,23,72,0.04) 75%, transparent 100%)",
        filter: "blur(60px)", willChange: "transform",
      }} />

      {/* ── Orb 3 ── */}
      <div ref={orb3Ref} style={{
        position: "absolute", top: "30%", left: "35%",
        width: "clamp(200px, 28vw, 420px)", height: "clamp(200px, 28vw, 420px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(37,99,235,0.06) 50%, transparent 75%)",
        filter: "blur(50px)", opacity: 0.6, willChange: "transform, opacity",
      }} />

      {/* ── Orb 4 ── */}
      <div ref={orb4Ref} style={{
        position: "absolute", top: "5%", left: "-5%",
        width: "clamp(180px, 22vw, 360px)", height: "clamp(180px, 22vw, 360px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(67,56,202,0.08) 50%, transparent 80%)",
        filter: "blur(55px)", opacity: 0.7, willChange: "transform",
      }} />

      {/* ── Orb 5 ── */}
      <div ref={orb5Ref} style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: "clamp(160px, 20vw, 300px)", height: "clamp(160px, 20vw, 300px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.20) 0%, rgba(29,78,216,0.08) 55%, transparent 80%)",
        filter: "blur(45px)", opacity: 0.5, willChange: "transform, opacity",
      }} />

      {/* ── Bottom beam ── */}
      <div style={{
        position: "absolute", bottom: 0, left: "15%",
        width: "50%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(29,78,216,0.35), transparent)",
        filter: "blur(1px)",
      }} />

      {/* ── Vignette ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(5,9,31,0.7) 100%)",
      }} />
    </div>
  );
}