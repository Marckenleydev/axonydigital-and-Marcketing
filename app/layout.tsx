import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axonydigital.com"),

  title: {
    default: "axony digital  | Marketing Digital Agency",
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
    {
      url: "/favicon.ico",
      sizes: "any",
    },
    {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='3' fill='%230F1A4D'/%3E%3Ctext x='50%25' y='50%25' font-family='Georgia,serif' font-size='18' font-weight='900' fill='%23FFFFFF' text-anchor='middle' dominant-baseline='middle'%3EA%3C/text%3E%3C/svg%3E",
      type: "image/svg+xml",
      sizes: "32x32",
    },
  ],
  apple: "/apple-icon.png",
},

  category: "technology",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Marckenley Dorsainvil",
    "jobTitle": "Founder, Engineer & Digital Marketing Strategist",
    "url": "https://axonydigital.com",
    "worksFor": {
      "@type": "Organization",
      "name": "axony digital ",
      "url": "https://axonydigital.com"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "axony digital ",
    "url": "https://axonydigital.com",
    "founder": {
      "@type": "Person",
      "name": "Marckenley Dorsainvil"
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
 <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div  className="orb orb-3" />
        
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