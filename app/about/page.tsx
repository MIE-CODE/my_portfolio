import type { Metadata } from "next";
import { About } from "@/src/components/about";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "About - Menya Israel",
    description: "Learn about Menya Israel, a professional full-stack developer with 3+ years of comprehensive experience in web and mobile development. Discover expertise in React, Next.js, TypeScript, React Native, and modern software architecture.",
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

