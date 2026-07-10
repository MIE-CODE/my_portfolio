import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { PageHeader } from "@/src/components/PageHeader";
import { VisitTracker } from "@/src/components/VisitTracker";
import { safeGetExperience } from "@/src/lib/fetchPublic";
import { mapApiExperiences } from "@/src/lib/mapPublicData";

export default async function ExperiencePage() {
  const experience = await safeGetExperience();
  const items =
    experience.length > 0 ? mapApiExperiences(experience) : undefined;

  return (
    <main id="main-content" className="page-shell">
      <div className="container-custom max-w-4xl">
        <PageHeader
          title="< Experience >"
          description="My professional journey and key achievements in software development"
          descriptionMobile="Professional journey and key engineering milestones."
        />
        <ExperienceTimeline items={items} />
      </div>
      <VisitTracker path="/experience" />
    </main>
  );
}
