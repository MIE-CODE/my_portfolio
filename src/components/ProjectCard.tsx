"use client";
import Link from "next/link";
import { SitePreview, type PreviewImage } from "./SitePreview";
import { GithubIcon, ApiIcon } from "../svg";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Project = {
  id: number;
  img: PreviewImage;
  skills: string[];
  title: string;
  description: string;
  link: string;
  githubLink: string;
  category: "Frontend" | "Backend";
  /** e.g. your role on the project */
  role?: string;
  /** On-site case study (SEO landing), e.g. /projects/blivap */
  detailPath?: string;
};

export const ProjectCard = ({ project }: { project: Project }) => {
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
      className="game-card verse-hover-hud verse-scan-border p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 h-full opacity-0 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
      role="listitem"
    >
      <div className="flex flex-col gap-3 flex-1">
        {/* Live site preview (Vercel-style) or backend placeholder */}
        <div className="relative w-full overflow-hidden rounded-lg border border-muted-200/95 dark:border-muted-700 bg-muted-100/80 dark:bg-muted-900/80">
          {project.category === "Backend" ? (
            <div className="flex h-40 sm:h-48 w-full items-center justify-center p-4">
              <ApiIcon />
            </div>
          ) : (
            <SitePreview
              url={project.link}
              title={project.title}
              fallback={project.img}
              className="h-40 sm:h-48"
            />
          )}
          {/* Category Badge */}
          <div className="absolute top-10 right-2 z-[2] sm:top-11">
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
              <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-0.5">
                {project.role}
              </p>
            ) : null}
          </div>
          <p className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-muted-200 dark:border-muted-700 gap-3 sm:gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            className="touch-target text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-1.5 min-h-11 -ml-2 pl-2"
            href={project.link || "#"}
            target={project.link !== "#" ? "_blank" : undefined}
            rel={project.link !== "#" ? "noopener noreferrer" : undefined}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />
            {project.category === "Backend" ? "API Docs" : "Live site"}
          </a>
          {project.detailPath ? (
            <Link
              href={project.detailPath}
              className="text-xs font-medium text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200"
            >
              Case study →
            </Link>
          ) : null}
        </div>
        <a
          className="touch-target rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300"
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
