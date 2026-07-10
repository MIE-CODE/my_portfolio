"use client";

import Link from "next/link";
import { ProjectCard } from "@/src/components/ProjectCard";
import { VisitTracker } from "@/src/components/VisitTracker";
import type { ProjectCardData } from "@/src/lib/mapPublicData";

export function ProjectDetailView({
  project,
  id,
}: {
  project: ProjectCardData;
  id: string;
}) {
  return (
    <main id="main-content" className="page-shell">
      <div className="container-custom max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <Link href="/projects" className="text-primary-600 hover:underline">
            ← Projects
          </Link>
        </nav>
        <div className="max-w-md">
          <ProjectCard project={project} />
        </div>
        {project.description ? (
          <p className="mt-8 text-muted-600 dark:text-muted-300 leading-relaxed">
            {project.description}
          </p>
        ) : null}
      </div>
      <VisitTracker path={`/projects/${id}`} />
    </main>
  );
}
