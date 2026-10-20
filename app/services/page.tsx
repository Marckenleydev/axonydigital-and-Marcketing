import type { Metadata } from "next";
import Header from "@/components/Header";
import StackedPage from "@/components/StackedPage";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ServicesDetail from "@/components/sections/ServicesDetail";
import Process from "@/components/sections/Process";
import AdsShowcase from "@/components/sections/AdsShowcase";
import Footer from "@/components/sections/Footer";
import { servicesPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SEO, performance marketing, content and conversion optimisation, plus a visual guide to every Google Ads format and when to use it.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <StackedPage>
          <PageHero eyebrow={servicesPage.eyebrow} title={servicesPage.title} accent={servicesPage.accent} sub={servicesPage.sub} z={10} />
          <ServicesDetail z={20} />
          <Process z={30} />
          <AdsShowcase z={40} />
          <CtaBand z={50} />
          <Footer />
        </StackedPage>
      </main>
    </>
  );
}
