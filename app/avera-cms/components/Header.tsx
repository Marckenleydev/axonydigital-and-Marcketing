/* ════════════════════════════════════════════
   CMS HEADER
   Top navigation bar
════════════════════════════════════════════ */

import type { Tab } from "../types";
import { TABS, T } from "../constants";

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(247,249,252,0.97)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.sand}25` }}>
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", maxWidth: "none", padding: "0 40px", height: 72 }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", paddingRight: 32, borderRight: `1px solid ${T.sand}25` }}>
          <div style={{ width: 28, height: 28, background: T.sand, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: T.cream, fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 12 }}>A</span>
          </div>
          <div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.22em", color: T.ink, textTransform: "uppercase", lineHeight: 1 }}>
              AXONY<span style={{ color: T.amber }}>.</span>DIGITAL
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: `${T.ink}35`, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>CMS</div>
          </div>
        </a>

        {/* Pipeline tabs */}
        <div style={{ display: "flex", flex: 1, paddingLeft: 8 }}>
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 20px",
                height: "100%",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${T.amber}` : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              <span style={{ color: activeTab === tab.id ? T.amber : `${T.ink}30`, fontSize: 12, transition: "color 0.2s" }}>{tab.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: activeTab === tab.id ? T.ink : `${T.ink}55`, letterSpacing: "0.04em", transition: "color 0.2s" }}>{tab.label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: `${T.ink}30`, letterSpacing: "0.14em", textTransform: "uppercase" }}>{tab.desc}</div>
              </div>
              {/* Arrow connector */}
              {index < TABS.length - 1 && <span style={{ position: "absolute", right: -8, color: `${T.ink}15`, fontSize: 14, zIndex: 1 }}>›</span>}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, paddingLeft: 24, borderLeft: `1px solid ${T.sand}25` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: `${T.ink}35`, letterSpacing: "0.18em", textTransform: "uppercase" }}>Live</span>
          </div>
          <a
            href="/"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}45`, textDecoration: "none", letterSpacing: "0.16em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = T.amber}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = `${T.ink}45`}
          >
            View Site ↗
          </a>
        </div>
      </div>
    </header>
  );
}
