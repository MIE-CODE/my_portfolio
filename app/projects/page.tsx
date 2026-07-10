import { PageHeader } from "@/src/components/PageHeader";
import { ProjectsList } from "@/src/components/ProjectsList";
import { VisitTracker } from "@/src/components/VisitTracker";
import { safeGetProjects } from "@/src/lib/fetchPublic";
import { mapApiProjects } from "@/src/lib/mapPublicData";

export default async function ProjectsPage() {
  const projects = await safeGetProjects();
  const mapped =
    projects.length > 0 ? mapApiProjects(projects) : undefined;

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
          preset="smoothRise"
          duration={0.55}
          stagger={0.07}
          ease="power2.out"
        />
        <ProjectsList projects={mapped} />
      </div>
      <VisitTracker path="/projects" />
    </main>
  );
}
