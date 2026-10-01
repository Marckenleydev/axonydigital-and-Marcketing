import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Axony3DLogo } from "./Axony3DLogo";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
   { label: "Clients", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },

];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    setActiveLink(window.location.pathname);
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="axony-site-header"
        style={{ paddingTop: scrolled ? 10 : 16, paddingBottom: scrolled ? 10 : 16 }}
      >
        <div className="axony-nav-layout">
          <a href="/" data-h className="axony-brand" aria-label="AXONY.DIGITAL home">
            <span className="axony-brand-mark"><Axony3DLogo /></span>
            <span className="axony-brand-name">AXONY<span>.</span>DIGITAL</span>
          </a>

          <nav className="axony-nav-pill" aria-label="Main navigation">
            {NAV.map(({ label, href }) => {
              const active = activeLink === href;
              return (
                <a
                  key={label}
                  href={href}
                  data-h
                  aria-current={active ? "page" : undefined}
                  className={active ? "axony-nav-link is-active" : "axony-nav-link"}
                  onClick={() => setActiveLink(href)}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <a href="#contact" data-h className="axony-nav-cta">Start Project</a>

          <button
            className="axony-menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            data-h
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="axony-mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-h
                aria-current={activeLink === href ? "page" : undefined}
                onClick={() => {
                  setActiveLink(href);
                  setOpen(false);
                }}
              >
                {label}
              </a>
            ))}
            <a className="mobile-start-project" href="#contact" onClick={() => setOpen(false)}>
              Start Project
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        .axony-site-header {
          position: fixed !important;
          z-index: 50 !important;
          top: 0;
          left: 0;
          right: 0;
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1B2A6B 0%, #0D1535 45%, #050E1F 100%)";
          border-bottom: 1px solid rgba(255, 255, 255, .07);
          backdrop-filter: blur(18px);
          transition: padding .25s ease;
        }
        .axony-nav-layout {
          width: min(100%, 1650px);
          min-height: 52px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 76px);
          display: grid;
          grid-template-columns: minmax(180px, 1fr) auto minmax(180px, 1fr);
          align-items: center;
          gap: 28px;
        }
        .axony-brand {
          justify-self: start;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          white-space: nowrap;
        }
        .axony-brand-mark {
          display: block;
          flex: 0 0 36px;
          width: 36px;
          height: 36px;
          filter: drop-shadow(0 4px 6px rgba(50, 35, 170, .45));
          transition: transform .35s cubic-bezier(.2,.8,.2,1), filter .35s ease;
        }
        .axony-brand-mark canvas {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .axony-brand:hover .axony-brand-mark {
          transform: perspective(100px) rotateY(-12deg) rotateX(7deg) translateY(-1px);
          filter: drop-shadow(0 7px 8px rgba(61, 57, 210, .58));
        }
        .axony-brand-name {
          color: #fff;
          font: 800 13px Inter, sans-serif;
          letter-spacing: .16em;
        }
        .axony-brand-name span { color: #4fa8f0; }
        .axony-nav-pill {
          justify-self: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(18px, 3vw, 48px);
          padding: 14px clamp(20px, 3vw, 40px);
          border: 1px solid rgba(255, 255, 255, .09);
          border-radius: 999px;
          background: rgba(255, 255, 255, .025);
        }
        .axony-nav-link {
          color: rgba(255, 255, 255, .76);
          font: 500 14px Inter, sans-serif;
          text-decoration: none;
          white-space: nowrap;
          transition: color .2s ease;
        }
        .axony-nav-link:hover, .axony-nav-link.is-active { color: #fff; }
        .axony-nav-cta, .mobile-start-project {
          justify-self: end;
          padding: 14px 24px;
          border-radius: 999px;
          background: #E5433F;
          box-shadow: 0 5px 18px rgba(229, 67, 63, .25);
          color: #fff;
          font: 500 14px Inter, sans-serif;
          text-decoration: none;
          white-space: nowrap;
          transition: filter .2s ease, transform .2s ease;
        }
        .axony-nav-cta:hover, .mobile-start-project:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
        }
        .axony-menu-toggle { display: none; }
        .axony-mobile-menu { display: none; }
        @media (max-width: 1050px) {
          .axony-nav-layout {
            grid-template-columns: 1fr auto;
            gap: 12px;
          }
          .axony-nav-pill, .axony-nav-cta { display: none; }
          .axony-menu-toggle {
            justify-self: end;
            width: 44px;
            height: 44px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            border: 1px solid rgba(255,255,255,.14);
            border-radius: 50%;
            background: rgba(255,255,255,.05);
            cursor: pointer;
          }
          .axony-menu-toggle span {
            display: block;
            width: 18px;
            height: 2px;
            border-radius: 2px;
            background: #fff;
          }
          .axony-mobile-menu {
            
            position: fixed !important;
            z-index: 49 !important;
            top: 13%;
            left: 14px;
            right: 14px;
            max-height: calc(100vh - 92px);
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 20px;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 24px;
            background: rgba(13, 21, 80, 0.45);
  box-shadow: 0 24px 60px rgba(0, 0, 0, .38), 0 0 0 1px rgba(79, 130, 240, 0.08) inset;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
          }
          .axony-mobile-menu > a {
            padding: 13px 12px;
            color: rgba(255,255,255,.82);
            font: 500 16px Inter, sans-serif;
            text-decoration: none;
          }
          .axony-mobile-menu > a[aria-current="page"] { color: #fff; }
          .axony-mobile-menu .mobile-start-project {
            justify-self: auto;
            margin-top: 8px;
            text-align: center;
            color: #fff;
          }
        }
        @media (max-width: 380px) {
          .axony-nav-layout { padding-inline: 16px; }
          .axony-brand-name { font-size: 11px; letter-spacing: .12em; }
        }
      `}</style>
    </>
  );
}
