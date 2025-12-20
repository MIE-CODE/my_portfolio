import type { Metadata } from "next";
import { About } from "@/src/components/about";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "About - Menya Israel",
    description: "Learn about Menya Israel, a professional full-stack developer with 5+ years of experience building production websites from Figma designs to deployment. Expert in React, Next.js, TypeScript, Tailwind CSS, performance optimization, analytics integration, and headless CMS. Genuinely excited about blockchain technology and eager to learn Web3 development.",
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

