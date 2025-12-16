"use client";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { Layout } from "@/src/components/Layout";
import { useGSAP } from "@/src/hooks/useGSAP";
import { useRef } from "react";
import gsap from "gsap";

export default function ExperiencePage() {
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
      <main id="main-content" className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container-custom max-w-4xl px-4">
          <section className="text-center mb-10 sm:mb-16">
            <h1 ref={titleRef} className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-6">
              {"< Experience >"}
            </h1>
            <p ref={descriptionRef} className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              My professional journey and key achievements in software development
            </p>
          </section>
          <ExperienceTimeline />
        </div>
      </main>
    </Layout>
  );
}

