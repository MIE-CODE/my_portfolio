"use client";
import Image, { StaticImageData } from "next/image";
import { GithubIcon, ApiIcon } from "../svg";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Project = {
  id: number;
  img: StaticImageData;
  skills: string[];
  title: string;
  description: string;
  link: string;
  githubLink: string;
  category: "Frontend" | "Backend";
  /** e.g. your role on the project */
  role?: string;
};

export const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () =>
      gsap.to(el, { y: -6, scale: 1.02, duration: 0.35, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(el, { y: 0, scale: 1, duration: 0.35, ease: "power2.out" });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      data-reveal-item
      className="game-card verse-hover-hud verse-scan-border p-4 flex flex-col gap-4 h-full opacity-0 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
      role="listitem"
    >
      <div className="flex flex-col gap-3 flex-1">
        {/* Project Image */}
        <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden bg-muted-100/80 dark:bg-muted-800 border border-muted-200/95 dark:border-muted-700 flex items-center justify-center">
          {project.category === "Backend" ? (
            <div className="w-full h-full flex items-center justify-center p-4">
              <ApiIcon />
            </div>
          ) : (
            <Image
              src={project.img}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-1 text-xs font-mono rounded ${
                project.category === "Frontend"
                  ? "bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300"
                  : "bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 text-accent-700 dark:text-accent-300"
              }`}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs font-mono bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 rounded text-accent-700 dark:text-accent-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Project Info */}
        <div className="flex flex-col gap-1.5 flex-1">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-muted-900 dark:text-muted-50">
              {project.title}
            </h3>
            {project.role ? (
              <p className="text-[10px] xs:text-[11px] font-medium text-primary-600 dark:text-primary-400 mt-0.5">
                {project.role}
              </p>
            ) : null}
          </div>
          <p className="text-[11px] xs:text-xs text-muted-600 dark:text-muted-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-muted-200 dark:border-muted-700">
        <a
          className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-1.5"
          href={project.link || "#"}
          target={project.link !== "#" ? "_blank" : undefined}
          rel={project.link !== "#" ? "noopener noreferrer" : undefined}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />
          {project.category === "Backend" ? "API Docs" : "Live"}
        </a>
        <a
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300"
          href={project.githubLink || "#"}
          target={project.githubLink !== "#" ? "_blank" : undefined}
          rel={project.githubLink !== "#" ? "noopener noreferrer" : undefined}
          aria-label="View on GitHub"
        >
          <div className="text-primary-600 dark:text-primary-400 [&>svg]:w-4 [&>svg]:h-4">
            <GithubIcon />
          </div>
        </a>
      </div>
    </article>
  );
};
