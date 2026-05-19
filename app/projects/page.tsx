"use client";
import { PageHeader } from "@/src/components/PageHeader";
import { ProjectsList } from "@/src/components/ProjectsList";

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12"
      data-parallax-depth="0.1"
    >
      <div className="container-custom px-4">
        <PageHeader
          title="< Projects >"
          description="Showcasing innovative frontend and backend applications built with modern technologies"
        />
        <ProjectsList />
      </div>
    </main>
  );
}
