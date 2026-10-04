import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { T } from "../data";

let lastPointerPosition = { x: -100, y: -100 };

export function Cursor() {
  const [p, setP] = useState(() => lastPointerPosition);
  const [hl, setHl] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMove = (event: PointerEvent) => {
      lastPointerPosition = { x: event.clientX, y: event.clientY };
      setP(lastPointerPosition);
    };
    const handleHover = (event: MouseEvent) => {
      const target = event.target;
      setHl(target instanceof Element && Boolean(target.closest("a,button,[data-h]")));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("mouseover", handleHover);
    setMounted(true);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  if (!mounted || isMobile) return null;

  return createPortal(
    <>
      <motion.div
        className="codex-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2147483647,
          width: 10,
          height: 10,
          borderRadius: "50%",
          pointerEvents: "none",
          backgroundColor: T.amber,
          boxShadow: "0 0 12px rgba(79,168,240,.9), 0 0 2px rgba(255,255,255,.9)",
        }}
        animate={{ x: p.x - 5, y: p.y - 5 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
      <motion.div
        className="codex-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2147483646,
          borderRadius: "50%",
          border: "1.5px solid rgba(130,198,255,.82)",
          boxShadow: "0 0 10px rgba(79,168,240,.2)",
          pointerEvents: "none",
        }}
        animate={{
          x: p.x - (hl ? 38 : 21),
          y: p.y - (hl ? 38 : 21),
          width: hl ? 76 : 42,
          height: hl ? 76 : 42,
          borderColor: hl ? "rgba(255,255,255,.95)" : "rgba(130,198,255,.82)",
          backgroundColor: hl ? "rgba(79,168,240,.12)" : "rgba(79,168,240,.025)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
      />
    </>,
    document.body,
  );
}
