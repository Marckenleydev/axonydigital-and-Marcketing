
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import ClipPathTitle from "../components/ClipPathTitle";
import { T } from "../data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BenefitSection = () => {
  const sectionRef = useRef<HTMLElement>(null);


useGSAP(
  () => {
    const titles = [
      ".first-title",
      ".second-title",
      ".third-title",
      ".fourth-title",
    ];

    // Mobile: show titles without GSAP animations.
    if (window.matchMedia("(max-width: 767px)").matches) {
  gsap.set(titles, {
    autoAlpha: 1,
    clipPath: "none",
  });
  return;
}

    // Desktop: keep the existing GSAP scroll animation.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    titles.forEach((selector) => {
      timeline.to(
        selector,
        {
          opacity: 1,
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "circ.out",
        },
        ">"
      );
    });
  },
  { scope: sectionRef }
);


  return (
    <section
      ref={sectionRef}
      className="benefit-section"
      style={{
        padding: "120px 24px",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <span
              style={{ width: 32, height: 1, background: T.amber, display: "block" }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                color: T.amber,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Why Choose Us
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 900,
              color: T.cream,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            Key{" "}
            <span style={{ fontStyle: "italic", color: T.cream }}>
              Benefits
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 480,
              lineHeight: 1.75,
              fontSize: 14,
            }}
          >
            Explore the advantages of partnering with Axony Digital for your
            business growth.
          </p>
        </div>

        {/* Title cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <ClipPathTitle
            title="Google Search Ads"
            color="#F5F1E8"
            bg={`${T.sand}`}
            className="first-title"
            borderColor="#071326"
          />

          <ClipPathTitle
            title="YouTube Ads"
            color="#071326"
            bg="#F5F1E8"
            className="second-title"
            borderColor="#071326"
          />

          <ClipPathTitle
            title="Display Ads"
            color="#F5F1E8"
            bg="#243F91"
            className="third-title"
            borderColor="#071326"
          />

          <ClipPathTitle
            title="Shopping Ads"
            color="#071326"
            bg={`${T.amber}`}
            className="fourth-title"
            borderColor="#071326"
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
