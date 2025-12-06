import type { Metadata } from "next";
import { About } from "@/src/components/about";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "About - Menya Israel",
    description: "Learn about Menya Israel, a full-stack developer with 5+ years of experience in web and mobile development.",
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

