import type { Metadata } from "next";
import { About } from "@/src/components/about";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "About - Menyaga Enyo Israel",
    description:
    "About Menyaga Enyo Israel—CTO at Belsoft Systems, founder of Blivap, former CTO at True Perk and SparkPay. Full-stack engineer focused on Next.js, Nuxt, React, and TypeScript for SaaS, fintech, collaboration, and marketplaces.",
};

export default function AboutPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-4 lg:pt-6 pb-20">
        <div className="container-custom">
          <About />
        </div>
      </main>
    </Layout>
  );
}

