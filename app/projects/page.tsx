"use client";
import { ProjectsList } from "@/src/components/ProjectsList";
import { Layout } from "@/src/components/Layout";
import { useGSAP } from "@/src/hooks/useGSAP";
import { useRef } from "react";
import gsap from "gsap";

export default function ProjectsPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }

    // Description animation
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="container-custom px-4">
          <section className="text-center mb-8 sm:mb-12">
            <h1 ref={titleRef} className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-4">
              {"< Projects >"}
            </h1>
            <p ref={descriptionRef} className="text-sm text-white/70 max-w-2xl mx-auto">
              Showcasing innovative frontend and backend applications built with modern technologies
            </p>
          </section>
          <ProjectsList />
        </div>
      </main>
    </Layout>
  );
}
