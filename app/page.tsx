import Header from "@/components/Header";
import StackedPage from "@/components/StackedPage";
import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Services from "@/components/sections/Services";
import AdsShowcase from "@/components/sections/AdsShowcase";
import Results from "@/components/sections/Results";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <StackedPage>
          <Hero />
          <Pain />
          <Services />
          <AdsShowcase />
          <Results />
          <Testimonials />
          <Contact />
          <Faq />
          <Footer />
        </StackedPage>
      </main>
    </>
  );
}
