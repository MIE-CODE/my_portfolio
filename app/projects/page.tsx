import type { Metadata } from "next";
import { ProjectsList } from "@/src/components/ProjectsList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Projects - Frontend & Backend Development",
  description: "Explore my portfolio of frontend and backend projects built with modern technologies including React, Next.js, Node.js, and more.",
};

export default function ProjectsPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-24 pb-12">
        <div className="container-custom">
          <section className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text font-mono mb-4">
              {"< Projects >"}
            </h1>
            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Showcasing innovative frontend and backend applications built with modern technologies
            </p>
          </section>
          <ProjectsList />
        </div>
      </main>
    </Layout>
  );
}
