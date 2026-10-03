"use client";

import {useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";

import { Cursor } from "./components/Cursor";
import { OrbitBackground } from "./components/OrbitBackground";
import { T } from "./data";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1];

export default function NotFoundPage() {
  const glitchRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <Cursor />
      <OrbitBackground />
      <Navbar />

      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "160px 24px 120px",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Glow blobs */}
        <div style={{
          position: "absolute",
          top: "20%", left: "10%",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          borderRadius: "50%",
          background: "rgba(79, 90, 240, 0.08)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%", right: "5%",
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 30vw, 400px)",
          borderRadius: "50%",
          background: "rgba(200, 135, 42, 0.06)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}>

          {/* 404 big number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            style={{ position: "relative", marginBottom: 8 }}
          >
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(120px, 22vw, 240px)",
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              userSelect: "none",
              pointerEvents: "none",
            }}>
              404
            </div>

            {/* Overlay amber 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(120px, 22vw, 240px)",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                background: `linear-gradient(135deg, ${T.amber} 0%, rgba(200,135,42,0.3) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                userSelect: "none",
              }}
            >
              404
            </motion.div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
            <span style={{
              fontSize: 10,
              color: T.amber,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}>
              Page Not Found
            </span>
            <span style={{ width: 32, height: 1, background: T.amber, display: "block" }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.9)",
              marginBottom: 16,
            }}
          >
            Looks like you took a<br />
            <span style={{ fontStyle: "italic", color: T.amber }}>wrong turn.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "clamp(14px, 2vw, 17px)",
              maxWidth: 480,
              margin: "0 auto 48px",
              lineHeight: 1.75,
            }}
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: T.sand,
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "16px 36px",
                borderRadius: 999,
                textDecoration: "none",
                transition: "filter 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.12)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Back to Home →
            </Link>

            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "15px 36px",
                borderRadius: 999,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
              }}
            >
              Contact Us
            </a>
          </motion.div>

          

        </div>
      </main>

   
    </div>
  );
}