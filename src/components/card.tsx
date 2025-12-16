"use client";
import Image from "next/image";
import card from "../images/card.png";
import { GithubIcon } from "../svg";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

import { StaticImageData } from "next/image";

export const Card = ({
  appsData,
  index,
  app,
}: {
  appsData: {
    img: StaticImageData;
    skills: string[];
    title: string;
    description: string;
    link: string;
    githubLink: string;
  };
  index: number;
  app?: boolean;
}) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`game-card p-4 flex flex-col gap-4 h-full hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
        isVisible ? `animate-fade-in-up opacity-100` : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
      role="listitem"
    >
      <div className="flex flex-col gap-3 flex-1">
        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted-100 dark:bg-muted-800 border border-muted-200 dark:border-muted-700">
          <iframe
            src={appsData.link}
            className="w-full h-full "
            sandbox="allow-same-origin"
            style={{
              pointerEvents: "none", // 🚫 disable interaction
            }}
          />
          <Image
            className="w-full h-full object-cover hidden"
            src={appsData.img || card}
            height={160}
            width={300}
            alt={`${appsData.title} project screenshot`}
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {appsData.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs font-mono bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 rounded text-accent-700 dark:text-accent-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-base font-semibold text-muted-900 dark:text-muted-50">
            {appsData.title}
          </h3>
          <p className="text-xs text-muted-600 dark:text-muted-400 leading-relaxed line-clamp-3">
            {appsData.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-muted-200 dark:border-muted-700">
        <a
          className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-1.5"
          href={appsData.link || "#"}
          target={
            appsData.link !== "#" && appsData.link !== "" ? "_blank" : undefined
          }
          rel={
            appsData.link !== "#" && appsData.link !== ""
              ? "noopener noreferrer"
              : undefined
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />
          {app ? "Download" : "Live"}
        </a>
        <a
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300"
          href={appsData.githubLink || "#"}
          target={
            appsData.githubLink !== "#" && appsData.githubLink !== ""
              ? "_blank"
              : undefined
          }
          rel={
            appsData.githubLink !== "#" && appsData.githubLink !== ""
              ? "noopener noreferrer"
              : undefined
          }
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
