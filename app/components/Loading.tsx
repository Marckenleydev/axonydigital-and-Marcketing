import { motion } from "framer-motion";
import { T } from "../data";

export function Loading() {
  return (
    <div style={{ width: "100%", background: T.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, gap: 24 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{
          width: 40,
          height: 40,
          border: `3px solid ${T.sand}40`,
          borderTopColor: T.amber,
          borderRadius: "50%",
        }}
      />
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          color: `${T.ink}50`,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
