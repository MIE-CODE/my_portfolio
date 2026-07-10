import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/src/components/ProjectDetailView";
import { safeGetProject } from "@/src/lib/fetchPublic";
import { mapApiProjectToCard } from "@/src/lib/mapPublicData";

type Props = { params: { id: string } };

export default async function ProjectDetailPage({ params }: Props) {
  const project = await safeGetProject(params.id);
  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailView
      project={mapApiProjectToCard(project)}
      id={params.id}
    />
  );
}
