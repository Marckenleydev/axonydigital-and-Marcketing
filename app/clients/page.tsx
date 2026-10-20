import type { Metadata } from "next";
import Header from "@/components/Header";
import StackedPage from "@/components/StackedPage";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ClientWall from "@/components/sections/ClientWall";
import Results from "@/components/sections/Results";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import { clientsPage } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Clients & Results",
  description: "The brands we work with, the results we're measured on, and what clients say about working with us.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <Header />
      <main>
        <StackedPage>
          <PageHero eyebrow={clientsPage.eyebrow} title={clientsPage.title} accent={clientsPage.accent} sub={clientsPage.sub} z={10} />
          <ClientWall z={20} />
          <Results z={30} />
          <Testimonials z={40} />
          <CtaBand z={50} />
          <Footer />
        </StackedPage>
      </main>
    </>
  );
}
