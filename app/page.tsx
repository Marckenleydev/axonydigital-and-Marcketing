
"use client";

import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Work } from "./sections/Work";
import { Process } from "./sections/Process";
import { About } from "./sections/AboutUs";
import { Contact } from "./sections/Contact";






// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-[#060606] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <Cursor />
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}