"use client";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { PageHeader } from "@/src/components/PageHeader";

export default function ExperiencePage() {
  return (
    <main id="main-content" className="page-shell">
      <div className="container-custom max-w-4xl">
        <PageHeader
          title="< Experience >"
          description="My professional journey and key achievements in software development"
        />

        <ExperienceTimeline />
      </div>
    </main>
  );
}
