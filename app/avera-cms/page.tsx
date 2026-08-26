"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Tab } from "./types";
import { T, MOCK_LEADS, MOCK_CLIENTS, MOCK_PROJECTS, MOCK_CONTENT, MOCK_RESULTS } from "./constants";
import { Header } from "./components/Header";
import { PipelineBar } from "./components/PipelineBar";
import { LeadsSection } from "./components/LeadsSection";
import { ClientsSection } from "./components/ClientsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContentSection } from "./components/ContentSection";
import { ResultsSection } from "./components/ResultsSection";

export default function CMS() {
  const [activeTab, setActiveTab] = useState<Tab>("leads");

  const mockData = {
    leads: MOCK_LEADS,
    clients: MOCK_CLIENTS,
    projects: MOCK_PROJECTS,
    content: MOCK_CONTENT,
    results: MOCK_RESULTS,
  };

  return (
    <div style={{ background: T.cream, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,textarea,select{font-family:'Inter',sans-serif}
        input::placeholder,textarea::placeholder{color:${T.sand};opacity:0.75}
        select option{background:${T.cream};color:${T.ink}}
        ::-webkit-scrollbar{width:4px;background:${T.cream}}
        ::-webkit-scrollbar-thumb{background:${T.amber}}
        ::selection{background:${T.amber};color:${T.ink}}
      `}</style>

      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <PipelineBar {...mockData} />

      <main style={{ maxWidth: "none", padding: "0 40px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === "leads" && <LeadsSection />}
            {activeTab === "clients" && <ClientsSection />}
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "content" && <ContentSection />}
            {activeTab === "results" && <ResultsSection />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}