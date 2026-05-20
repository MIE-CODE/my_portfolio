"use client";
import { PageHeader } from "@/src/components/PageHeader";
import { ProjectsList } from "@/src/components/ProjectsList";

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      className="page-shell"
      data-parallax-depth="0.1"
    >
      <div className="container-custom">
        <PageHeader
          title="< Projects >"
          description="Showcasing innovative frontend and backend applications built with modern technologies"
          descriptionMobile="Frontend and backend work built with modern web stacks."
        />
        <ProjectsList />
      </div>
    </main>
  );
}
