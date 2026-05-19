import type { Metadata } from "next";
import { PageHeader } from "@/src/components/PageHeader";
import { About } from "@/src/components/about";

export const metadata: Metadata = {
  title: "About - Menyaga Enyo Israel",
  description:
    "About Menyaga Enyo Israel—CTO at Belsoft Systems, founder of Blivap, former CTO at True Perk and SparkPay. Full-stack engineer focused on Next.js, Nuxt, React, and TypeScript for SaaS, fintech, collaboration, and marketplaces.",
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20"
      data-parallax-depth="0.1"
    >
      <div className="container-custom px-4">
        <PageHeader
          title="< About Me >"
          description="I build and lead production SaaS: currently CTO at Belsoft Systems, founder of Blivap, and still taking selective freelance work. Stack-wise I live in Next.js and Nuxt, React and Vue, TypeScript and Tailwind—with payments, analytics, and performance baked in from day one."
        />
        <About />
      </div>
    </main>
  );
}
