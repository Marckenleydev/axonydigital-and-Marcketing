/* ════════════════════════════════════════════
   PIPELINE OVERVIEW BAR
   Shows stats across all entities
════════════════════════════════════════════ */

import type { Lead, Client, Project, Content, Result } from "../types";
import { T } from "../constants";

interface PipelineBarProps {
  leads: Lead[];
  clients: Client[];
  projects: Project[];
  content: Content[];
  results: Result[];
}

export function PipelineBar({ leads, clients, projects, content, results }: PipelineBarProps) {
  const won = leads.filter((l) => l.status === "Won").length;
  const totalVal = clients.reduce((a, c) => a + (parseFloat(c.contractValue.replace(/[^0-9.]/g, "")) || 0), 0);
  const active = projects.filter((p) => p.status === "In Progress").length;
  const published = content.filter((c) => c.status === "Published").length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: `${T.sand}25`, borderBottom: `1px solid ${T.sand}25` }}>
      {[
        { icon: "◎", label: "Total Leads", value: leads.length.toString(), sub: `${won} won` },
        { icon: "◈", label: "Active Clients", value: clients.length.toString(), sub: totalVal ? `$${(totalVal / 1000).toFixed(0)}k value` : "—" },
        { icon: "⬡", label: "Projects", value: projects.length.toString(), sub: `${active} in progress` },
        { icon: "◉", label: "Content Pieces", value: content.length.toString(), sub: `${published} published` },
        { icon: "✦", label: "Results Logged", value: results.length.toString(), sub: "across all clients" },
      ].map((stat) => (
        <div key={stat.label} style={{ background: T.cream, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: T.amber, fontSize: 11 }}>{stat.icon}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: `${T.ink}35`, letterSpacing: "0.2em", textTransform: "uppercase" }}>{stat.label}</span>
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 22, color: T.ink }}>{stat.value}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, color: T.amber, letterSpacing: "0.14em", marginTop: 2 }}>{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
