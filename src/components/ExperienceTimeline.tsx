"use client";

import { ExperienceCard } from "./ExperienceCard";
import { useExperienceTimelineMotion } from "../hooks/useExperienceTimelineMotion";
import { useGsapReveal } from "../hooks/useGsapReveal";

/** Dates and titles aligned with Israel_menyaga_cv.pdf */
const experiences = [
  {
    year: "Jan 2026 - Present",
    title: "Chief Technology Officer",
    company: "Belsoft Systems Ltd",
    description:
      "Technical leadership across Belsoft engineering: strategy, architecture, and product delivery for BelCore (Slack-style workspace), BelPower (bill payments at belpower.ng), and BelAI. Remote.",
    achievements: [
      "Lead engineering strategy, architecture, and releases across multiple web platforms",
      "Directed cross-functional delivery for bill payment systems and the BelAI platform",
      "Defined engineering processes focused on scalability, maintainability, and delivery speed",
      "Mentor developers and drive best practices on shared REST APIs and frontend stacks",
    ],
  },
  {
    year: "Feb 2025 - Present",
    title: "Senior Frontend Engineer",
    company: "True Perk",
    description:
      "Architecting scalable Nuxt.js applications with AI-assisted workflows for recognition cards, milestone tracking, and employee engagement experiences. Remote.",
    achievements: [
      "Build responsive, high-performance interfaces for recognition and engagement products",
      "Ship maintainable Nuxt 3 / Vue 3 / TypeScript frontends with Pinia and Tailwind",
      "Collaborate cross-functionally on AI-driven content generation and product UX",
      "Improve scalability and frontend architecture for enterprise-style dashboards",
    ],
  },
  {
    year: "Oct 2023 - Jan 2025",
    title: "Senior Frontend Engineer",
    company: "SparkPay",
    description:
      "Developed payroll and financial monitoring platforms using Next.js, TypeScript, and Sass—production-ready UX with reusable component architecture. Remote.",
    achievements: [
      "Delivered scalable payroll and monitoring surfaces on Next.js and React",
      "Collaborated with engineers and designers on seamless, production-ready experiences",
      "Improved performance and maintainability through frontend optimization",
      "Built reusable component patterns for data-heavy financial workflows",
    ],
  },
  {
    year: "Mar 2021 - Aug 2023",
    title: "Senior Software Engineer",
    company: "Blivap",
    description:
      "Full-stack healthcare platform (Next.js, NestJS) for donor–recipient matching: secure APIs, onboarding, verification, and production infrastructure. Remote.",
    achievements: [
      "Engineered real-time donor–recipient matching and trusted interaction flows",
      "Built REST APIs for auth, onboarding, blood requests, donation tracking, and verification",
      "Integrated AI-driven questionnaires for donor screening and onboarding",
      "Managed deployments, environments, custom domains, and DNS for production",
    ],
  },
];

const education = [
  {
    year: "2021 - 2025",
    title: "BSc(Ed) Mathematics",
    description:
      "Prince Abubakar Audu University - Bachelor of Science in Education (Mathematics). Studied advanced mathematics, educational theory, and teaching methodologies.",
  },
];

export function ExperienceTimeline() {
  const workRef = useExperienceTimelineMotion();
  const eduRef = useGsapReveal({
    preset: "smoothRise",
    stagger: 0.1,
    duration: 0.65,
    parallax: 0.06,
  });

  return (
    <div className="space-y-14 sm:space-y-16">
      <section aria-labelledby="work-experience-heading">
        <h2
          id="work-experience-heading"
          className="text-xl sm:text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-8 sm:mb-10"
        >
          Work Experience
        </h2>

        <div
          ref={workRef}
          className="experience-timeline relative pl-8 sm:pl-16"
        >
          <div
            className="experience-timeline__rail"
            aria-hidden
          />

          <ol className="space-y-8 sm:space-y-10">
            {experiences.map((exp) => (
              <li
                key={`${exp.company}-${exp.year}`}
                data-exp-item
                className="experience-timeline__item relative"
              >
                <span
                  className="experience-timeline__dot"
                  aria-hidden
                />
                <time className="experience-timeline__date font-mono text-xs sm:text-sm text-primary-600 dark:text-primary-400 tabular-nums block mb-3">
                  {exp.year}
                </time>
                <ExperienceCard {...exp} hideYear />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="education-heading" className="relative z-10">
        <h2
          id="education-heading"
          className="text-xl sm:text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-6 sm:mb-8"
        >
          Education
        </h2>
        <div
          ref={eduRef as React.RefObject<HTMLDivElement>}
          className="space-y-4 sm:space-y-6"
        >
          {education.map((edu, index) => (
            <div
              key={index}
              data-reveal-item
              className="panel-surface p-4 sm:p-6 opacity-0 transition-colors duration-300 hover:border-primary-400/45 dark:hover:border-primary-500/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-muted-900 dark:text-muted-50">
                  {edu.title}
                </h3>
                <span className="font-mono text-xs sm:text-sm text-primary-600 dark:text-primary-400 tabular-nums">
                  {edu.year}
                </span>
              </div>
              <p className="text-sm sm:text-base text-muted-600 dark:text-muted-300 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
