"use client";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { PageHeader } from "@/src/components/PageHeader";

export default function ExperiencePage() {
  return (
    <main
      id="main-content"
      className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20"
      data-parallax-depth="0.12"
    >
      <div className="container-custom max-w-4xl px-4">
        <PageHeader
          title="< Experience >"
          description="My professional journey and key achievements in software development"
        />
        <ExperienceTimeline />
      </div>
    </main>
  );
}
