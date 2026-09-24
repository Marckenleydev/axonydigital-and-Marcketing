
"use client";

import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Process } from "./sections/Process";
import { AboutUs } from "./sections/AboutUs";
import { Contact } from "./sections/Contact";
import { OrbitBackground } from "./components/OrbitBackground";






// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen orbit-page" style={{ fontFamily: "Inter, sans-serif" }}>
      <Cursor />
       <OrbitBackground />
      <Navbar />
      <Hero />
      <Services />
     
      <Process />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}