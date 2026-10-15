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




"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function OrbitBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        y: "+=18",
        x: "+=10",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(orb2Ref.current, {
        y: "-=14",
        x: "-=8",
        duration: 7.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(orb3Ref.current, {
        y: "+=10",
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-orbit-layer" aria-hidden="true">
      {/* Top-right: Royal blue glow */}
      <div
        ref={orb1Ref}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "clamp(400px, 55vw, 700px)",
          height: "clamp(400px, 55vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.30) 0%, rgba(29, 78, 216, 0.18) 35%, rgba(30, 58, 138, 0.08) 65%, transparent 100%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Bottom-left: Electric blue glow */}
      <div
        ref={orb2Ref}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: "clamp(280px, 38vw, 500px)",
          height: "clamp(280px, 38vw, 500px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29, 78, 216, 0.28) 0%, rgba(30, 64, 175, 0.16) 40%, rgba(15, 23, 72, 0.06) 70%, transparent 100%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Center: Subtle blue atmospheric highlight */}
      <div
        ref={orb3Ref}
        style={{
          position: "absolute",
          top: "35%",
          left: "40%",
          width: "clamp(180px, 22vw, 320px)",
          height: "clamp(180px, 22vw, 320px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(37, 99, 235, 0.07) 45%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          opacity: 0.7,
          willChange: "transform",
        }}
      />
    </div>
  );
}
