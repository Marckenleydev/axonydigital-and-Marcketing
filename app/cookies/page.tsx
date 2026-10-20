import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { cookies } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How this website uses cookies and similar technologies, and how to manage your choices.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <LegalPage doc={cookies} />;
}
