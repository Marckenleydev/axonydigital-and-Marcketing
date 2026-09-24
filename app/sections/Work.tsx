import { useState, useRef, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import { T, WORKS } from "../data";

function useRev(margin = "-70px") {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin });
  return [r, v];
}

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const stag = (d = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: d,
    },
  },
});

export function Work() {
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

  const [r, v] = useRev();

  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Idle float animation on orbs ──
      gsap.to(orb1Ref.current, {
        y: "+=18", x: "+=10",
        duration: 6, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.to(orb2Ref.current, {
        y: "-=14", x: "-=8",
        duration: 7.5, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
      gsap.to(orb3Ref.current, {
        y: "+=10",
        duration: 5, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      style={{
        padding: "clamp(40px, 8vh, 120px) 16px",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)",
        position: "relative",
      }}
    >
     

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

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <motion.div
          ref={r}
          variants={stag()}
          initial="hidden"
          animate={v ? "visible" : "hidden"}
          style={{
            marginBottom: 48,
          }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: T.amber,
                display: "block",
              }}
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
              Selected Work
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2rem, 8vw, 5.5rem)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Selected Work & <br />
            <span
              style={{
                fontStyle: "italic",
                color: T.amber,
              }}
            >
              Case Studies.
            </span>
          </motion.h2>
        </motion.div>

        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <div
            ref={emblaRef}
            className="work-carousel"
          >
            <div className="work-carousel-container">
              {WORKS.map((w, i) => (
                <div
                  key={w.id}
                  className="work-slide"
                >
                  <WorkCard w={w} i={i} />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {WORKS.map((_, i) => (
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
                    background:
                      i === selectedIndex
                        ? T.amber
                        : `${T.ink}30`,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
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
  );
}

function WorkCard({ w, i }) {
  const [hov, setHov] = useState(false);
  const [r, v] = useRev("-60px");

  return (
    <motion.div
      ref={r}
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={
        v
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.75,
        delay: (i % 2) * 0.12,
        ease,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-h
      style={{
        background: "rgba(255,255,255,0.05)",
        minHeight: 360,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <motion.div
        animate={{
          opacity: hov ? 0.14 : 0.05,
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 30% 50%, ${w.acc}, transparent 70%)`,
          filter: "blur(50px)",
          transition: "opacity 0.4s",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: `${T.cream}70`,
              letterSpacing: "0.18em",
            }}
          >
            {w.id}
          </span>

          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
          </div>
        </div>

        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 4,
          }}
        >
          {w.title}
        </h3>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 12,
            letterSpacing: "0.08em",
          }}
        >
          {w.sub}
        </p>

        <motion.p
          animate={{
            opacity: hov ? 1 : 0,
            y: hov ? 0 : 8,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: `${T.cream}55`,
            lineHeight: 1.65,
            maxWidth: 280,
          }}
        >
          {w.desc}
        </motion.p>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 20,
          marginTop: 16,
          borderTop: `1px solid ${w.acc}20`,
        }}
      >
        {/*
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: `${w.acc}60`,
          }}
        >
          {w.year}
        </span>
        */}

        <motion.span
          animate={{
            x: hov ? 0 : -8,
            opacity: hov ? 1 : 0,
          }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: T.cream,
          }}
        >
          <a
            href={w.link}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Case Study →
          </a>
        </motion.span>
      </div>

      <motion.div
        animate={{
          scaleX: hov ? 1 : 0,
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: w.acc,
          transformOrigin: "left",
        }}
        transition={{
          duration: 0.4,
        }}
      />
    </motion.div>
  );
}