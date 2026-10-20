import type { Metadata } from "next";
import StackedPage from "@/components/StackedPage";
import { BioHero, BioStory, BioFocus, BioStack, BioWork, BioFooter } from "@/components/bio/Bio";
import { bio } from "@/lib/bio";

// Unlisted: not in the navigation, footer or sitemap, and asks search engines not to index it.
export const metadata: Metadata = {
  title: `${bio.name} — ${bio.role}`,
  description: bio.intro,
  robots: { index: false, follow: false },
  alternates: { canonical: "/marckenley" },
};

export default function BioPage() {
  return (
    <main>
      <StackedPage>
        <BioHero z={10} />
        <BioStory z={20} />
        <BioFocus z={30} />
        <BioStack z={40} />
        <BioWork z={50} />
        <BioFooter />
      </StackedPage>
    </main>
  );
}
