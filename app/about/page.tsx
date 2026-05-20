import type { Metadata } from "next";
import { PageHeader } from "@/src/components/PageHeader";
import { AboutPageContent } from "@/src/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About - Menyaga Enyo Israel",
  description:
    "About Israel Menyaga—Senior Software Engineer; CTO (Technical Leadership) at Belsoft Systems; senior frontend engineer at True Perk and SparkPay; senior software engineer at Blivap. Résumé (PDF) on this page.",
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20"
      data-parallax-depth="0.1"
    >
      <div className="container-custom px-4">
        <PageHeader align="start" title="About" className="max-w-5xl mx-auto w-full" />
        <AboutPageContent />
      </div>
    </main>
  );
}
