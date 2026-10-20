import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to using our website and engaging our marketing services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
