"use client";

import { usePathname } from "next/navigation";
import { getPageHeaderPreset } from "@/src/config/verseMotion";
import { useGsapMount } from "@/src/hooks/useGsapReveal";
import type { GsapRevealPreset } from "@/src/hooks/useGsapReveal";

type PageHeaderProps = {
  title: string;
  description?: string;
  description2?: string;
  /** Shorter copy shown below `sm` when the full description is too long on phones */
  descriptionMobile?: string;
  description2Mobile?: string;
  className?: string;
  preset?: GsapRevealPreset;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** Default center; use start for editorial pages like About. */
  align?: "center" | "start";
  /** Use h2 when the page already has a dedicated h1 (e.g. About dossier). */
  headingLevel?: "h1" | "h2";
};

export function PageHeader({
  title,
  description,
  description2,
  descriptionMobile,
  description2Mobile,
  className = "",
  preset,
  duration = 0.9,
  stagger = 0.14,
  ease = "expo.out",
  align = "center",
  headingLevel = "h1",
}: PageHeaderProps) {
  const HeadingTag = headingLevel;
  const pathname = usePathname();
  const ref = useGsapMount({
    preset: preset ?? getPageHeaderPreset(pathname),
    duration,
    stagger,
    childSelector: "[data-page-header-part]",
    ease,
  });

  const isStart = align === "start";
  const blockAlign = isStart ? "text-start" : "text-center";
  const descMax = isStart ? "max-w-3xl" : "max-w-3xl mx-auto";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${blockAlign} mb-6 sm:mb-12 ${className}`.trim()}
      data-parallax-depth="0.12"
    >
      <HeadingTag
        data-page-header-part
        className="text-xl xs:text-2xl sm:text-3xl font-bold gradient-text font-mono mb-3 sm:mb-6 opacity-0"
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          data-page-header-part
          className={`text-sm sm:text-lg text-muted-600 dark:text-muted-400 ${descMax} leading-relaxed opacity-0`}
        >
          {descriptionMobile ? (
            <>
              <span className="sm:hidden">{descriptionMobile}</span>
              <span className="hidden sm:inline">{description}</span>
            </>
          ) : (
            description
          )}
        </p>
      )}
      {description2 && (
        <p
          data-page-header-part
          className={`mt-2 text-xs sm:text-base text-muted-500 dark:text-muted-500 max-w-2xl ${isStart ? "" : "mx-auto"} leading-relaxed opacity-0`}
        >
          {description2Mobile ? (
            <>
              <span className="sm:hidden">{description2Mobile}</span>
              <span className="hidden sm:inline">{description2}</span>
            </>
          ) : (
            description2
          )}
        </p>
      )}
    </section>
  );
}
