/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export const dynamic = 'force-dynamic';
import TeamSection from './sections/TeamSection';
import WorksSection from './sections/WorksSection';
import ProjectsSection from './sections/ProjectsSection';
import ServicesSection from './sections/ServicesSection';
import ContentProductionSection from './sections/ContentProductionSection';
import {  ease } from './sections/shared';
import { T } from "../data";

/* ── TYPES ── */
interface TeamMember { _id?: string; name: string; role: string; exp: string; ini: string; color: string; }
interface Work { _id?: string; title: string; sub: string; year: string; tags: string[]; desc: string; bg: string; acc: string; link?: string; }
interface Project { _id?: string; title: string; sub: string; cat: string; year: string; tags: string[]; desc: string; bg: string; acc: string; challenge: string; solution: string; results: string[]; services: string[]; }
interface Service { _id?: string; n: string; icon: string; title: string; tagline: string; desc: string; features: string[]; tech: string[]; tiers: { n: string; p: string; d: string }[]; }
interface ContentProduction { _id?: string; title: string; type: "photo" | "video" | "other"; url: string; thumbnail?: string; description?: string; tags: string[]; createdAt?: Date; }
type TabType = "team" | "works" | "projects" | "services" | "contentproduction";

/* ══════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════ */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("team");
  const [loading, setLoading] = useState(false);

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamForm, setTeamForm] = useState<Partial<TeamMember>>({});
  const [editingTeam, setEditingTeam] = useState<string | null>(null);

  const [works, setWorks] = useState<Work[]>([]);
  const [workForm, setWorkForm] = useState<Partial<Work>>({ tags: [] });
  const [editingWork, setEditingWork] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({ tags: [], results: [], services: [] });
  const [editingProject, setEditingProject] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({ features: [], tech: [], tiers: [] });
  const [editingService, setEditingService] = useState<string | null>(null);


  const [contentProduction, setContentProduction] = useState<ContentProduction[]>([]);
  const [contentProductionForm, setContentProductionForm] = useState<Partial<ContentProduction>>({ tags: [] });
  const [editingContentProduction, setEditingContentProduction] = useState<string | null>(null);

  const fetchData = async (tab: TabType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}`);
      const data = await res.json();
      switch (tab) {
        case "team": setTeam(data.team || []); break;
        case "works": setWorks(data.works || []); break;
        case "projects": setProjects(data.projects || []); break;
        case "services": setServices(data.services || []); break;
        case "contentproduction": setContentProduction(data.contentProduction || []); break;
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchData(activeTab); }, [activeTab]);

  const handleCreate = async (tab: TabType, data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { fetchData(tab); clearForm(tab); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleUpdate = async (tab: TabType, id: string, data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...data }) });
      if (res.ok) { fetchData(tab); clearForm(tab); setEditingItem(tab, null); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (tab: TabType, id: string) => {
    if (!confirm("Delete this entry permanently?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData(tab);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const setEditingItem = (tab: TabType, id: string | null) => {
    switch (tab) {
      case "team": setEditingTeam(id); break;
      case "works": setEditingWork(id); break;
      case "projects": setEditingProject(id); break;
      case "services": setEditingService(id); break;
      case "contentproduction": setEditingContentProduction(id); break;
    }
  };

  const clearForm = (tab: TabType) => {
    switch (tab) {
      case "team": setTeamForm({}); break;
      case "works": setWorkForm({ tags: [] }); break;
      case "projects": setProjectForm({ tags: [], results: [], services: [] }); break;
      case "services": setServiceForm({ features: [], tech: [], tiers: [] }); break;
      case "contentproduction": setContentProductionForm({ tags: [] }); break;
    }
  };

  const editItem = (tab: TabType, item: any) => {
    switch (tab) {
      case "team": setTeamForm(item); setEditingTeam(item._id || null); break;
      case "works": setWorkForm(item); setEditingWork(item._id || null); break;
      case "projects": setProjectForm(item); setEditingProject(item._id || null); break;
      case "services": setServiceForm(item); setEditingService(item._id || null); break;
      case "contentproduction": setContentProductionForm(item); setEditingContentProduction(item._id || null); break;
    }
  };

  const handleSubmit = (e: React.FormEvent, tab: TabType) => {
    e.preventDefault();
    const data = tab === "team" ? teamForm : tab === "works" ? workForm : tab === "projects" ? projectForm : tab === "services" ? serviceForm : contentProductionForm;
    const id = tab === "team" ? editingTeam : tab === "works" ? editingWork : tab === "projects" ? editingProject : tab === "services" ? editingService : editingContentProduction;
    if (id) handleUpdate(tab, id, data);
    else handleCreate(tab, data);
  };

  const TABS: { id: TabType; label: string; count: number }[] = [
    { id: "team", label: "Team", count: team.length },
    { id: "works", label: "Works", count: works.length },
    { id: "projects", label: "Projects", count: projects.length },
    { id: "services", label: "Services", count: services.length },
    { id: "contentproduction", label: "Content", count: contentProduction.length },
  ];

  return (
    <div style={{ background: T.cream, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        input,textarea{font-family:'Inter',sans-serif}
        input::placeholder,textarea::placeholder{color:${T.sand};opacity:0.7}
        ::-webkit-scrollbar{width:4px;background:${T.cream}}
        ::-webkit-scrollbar-thumb{background:${T.amber}}
        ::selection{background:${T.amber};color:${T.ink}}
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.sand}30`, padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, background: T.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: T.cream, fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 12 }}>C</span>
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.22em", color: T.ink, textTransform: "uppercase" }}>
              VERAA<span style={{ color: T.amber }}>.</span>DIGITAL
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}35`, letterSpacing: "0.2em", textTransform: "uppercase", marginLeft: 8, borderLeft: `1px solid ${T.sand}50`, paddingLeft: 12 }}>
              Dashboard
            </span>
          </a>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0 }}>
            {TABS.map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditingItem(tab.id, null); clearForm(tab.id); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px", height: 68, background: "transparent", border: "none", borderBottom: activeTab === tab.id ? `2px solid ${T.amber}` : "2px solid transparent", color: activeTab === tab.id ? T.ink : `${T.ink}45`, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s" }}>
                {tab.label}
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, background: activeTab === tab.id ? `${T.amber}20` : `${T.ink}08`, color: activeTab === tab.id ? T.amber : `${T.ink}35`, padding: "2px 6px", borderRadius: 2 }}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* View site link */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Inter, sans-serif", fontSize: 10, color: `${T.ink}45`, textDecoration: "none", letterSpacing: "0.18em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = T.amber}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = `${T.ink}45`}>
            View Site <span style={{ fontSize: 14 }}>↗</span>
          </a>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
        <AnimatePresence mode="wait">
          {activeTab === "team" && (
            <motion.div key="team" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
              <TeamSection team={team} form={teamForm} setForm={setTeamForm} editing={editingTeam} setEditing={setEditingTeam}
                onSubmit={(e: React.FormEvent) => handleSubmit(e, "team")} onDelete={(id: string) => handleDelete("team", id)} onEdit={(item: any) => editItem("team", item)} loading={loading} />
            </motion.div>
          )}
          {activeTab === "works" && (
            <motion.div key="works" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
              <WorksSection works={works} form={workForm} setForm={setWorkForm} editing={editingWork} setEditing={setEditingWork}
                onSubmit={(e: React.FormEvent) => handleSubmit(e, "works")} onDelete={(id: string) => handleDelete("works", id)} onEdit={(item: any) => editItem("works", item)} loading={loading} />
            </motion.div>
          )}
          {activeTab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
              <ProjectsSection projects={projects} form={projectForm} setForm={setProjectForm} editing={editingProject} setEditing={setEditingProject}
                onSubmit={(e: React.FormEvent) => handleSubmit(e, "projects")} onDelete={(id: string) => handleDelete("projects", id)} onEdit={(item: any) => editItem("projects", item)} loading={loading} />
            </motion.div>
          )}
          {activeTab === "services" && (
            <motion.div key="services" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
              <ServicesSection services={services} form={serviceForm} setForm={setServiceForm} editing={editingService} setEditing={setEditingService}
                onSubmit={(e: React.FormEvent) => handleSubmit(e, "services")} onDelete={(id: string) => handleDelete("services", id)} onEdit={(item: any) => editItem("services", item)} loading={loading} />
            </motion.div>
          )}
          {activeTab === "contentproduction" && (
            <motion.div key="contentproduction" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
              <ContentProductionSection contentProduction={contentProduction} form={contentProductionForm} setForm={setContentProductionForm} editing={editingContentProduction} setEditing={setEditingContentProduction}
                onSubmit={(e: React.FormEvent) => handleSubmit(e, "contentproduction")} onDelete={(id: string) => handleDelete("contentproduction", id)} onEdit={(item: any) => editItem("contentproduction", item)} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}