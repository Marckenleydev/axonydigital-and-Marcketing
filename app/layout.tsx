import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource/instrument-serif";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { site } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://axonydigital.com"),

  title: {
    default: "axony digital",
    template: "%s | axony digital ",
  },

  description:
    "axony digital  is a premium software and digital solutions agency founded by Marckenley Dorsainvil, specializing in modern websites, AI integrations, scalable platforms, and digital experiences for businesses worldwide.",

  keywords: [
    "Marckenley Dorsainvil",
    "Marketing Digital",
    "Marketing Digital agency",
    "software development company",
    "AI development services",
    "Next.js development",
    "React development",
    "custom software development",
    "Dubai Marketing Digital agency",
    "startup website development",
    "modern web applications",
  ],

  authors: [{ name: "axonydigital " }],
  creator: "axonydigital ",
  publisher: "axonydigital ",

  robots: {
    index: true,
    follow: true,
  },
  

  openGraph: {
    title: "axony digital | Marketing Digital & AI Solutions",
    description:
      "We design and build high-performance websites, AI-powered systems, and scalable digital products for startups and enterprises.",
      
    url: "https://axonydigital.com",
    siteName: "axonydigital ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "axonydigital  Marketing Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "axonydigital | Web & AI Development",
    description:
      "Premium Marketing Digital, AI solutions, and scalable software built for modern businesses.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },

  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
         <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
          <a
            href="https://wa.me/971552635229"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform sm:animate-bounce"
          >
            <Image 
              src="/whatsapp.svg" 
              alt="WhatsApp" 
              width={42} 
              height={42} 
            />
          </a>
        </div>

        <div className="fixed bottom-26 right-6 z-[9999] md:bottom-30">
          <a
            href="tel:+971552635229"
            className="relative call-ring w-16 h-16 rounded-full bg-white border border-[#E5433F] flex items-center justify-center shadow-2xl"
          >
            <svg
              className="w-7 h-7 text-[#E5433F]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.466 15.466 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1C10.85 21 3 13.15 3 3a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1l-2.21 2.23z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
