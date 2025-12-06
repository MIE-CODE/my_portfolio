import type { Metadata } from "next";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Experience - Professional Journey",
  description: "Explore my professional experience, projects, and career journey in web and mobile development.",
};

export default function ExperiencePage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text font-mono mb-6">
              {"< Experience >"}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              My professional journey and key achievements in software development
            </p>
          </section>
          <ExperienceTimeline />
        </div>
      </main>
    </Layout>
  );
}

