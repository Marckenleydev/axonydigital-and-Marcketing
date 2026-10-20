import type { Metadata } from "next";
import Header from "@/components/Header";
import StackedPage from "@/components/StackedPage";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import AboutStory from "@/components/sections/AboutStory";
import Values from "@/components/sections/Values";
import Team from "@/components/sections/Team";
import Footer from "@/components/sections/Footer";
import { aboutPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About",
  description: "A small performance marketing team that reports on revenue, explains things plainly and earns each month.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <StackedPage>
          <PageHero eyebrow={aboutPage.eyebrow} title={aboutPage.title} accent={aboutPage.accent} sub={aboutPage.sub} z={10} />
          <AboutStory z={20} />
          <Values z={30} />
          <Team z={40} />
          <CtaBand z={50} />
          <Footer />
        </StackedPage>
      </main>
    </>
  );
}
