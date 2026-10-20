import type { Metadata } from "next";
import Header from "@/components/Header";
import StackedPage from "@/components/StackedPage";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free marketing audit. Tell us about your business and we'll send a custom growth blueprint.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <StackedPage>
          <Contact z={10} page />
          <Faq z={20} />
          <Footer />
        </StackedPage>
      </main>
    </>
  );
}
