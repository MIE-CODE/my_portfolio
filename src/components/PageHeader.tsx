"use client";

import { usePathname } from "next/navigation";
import { getPageHeaderPreset } from "@/src/config/verseMotion";
import { useGsapMount } from "@/src/hooks/useGsapReveal";
import type { GsapRevealPreset } from "@/src/hooks/useGsapReveal";

type PageHeaderProps = {
  title: string;
  description?: string;
  description2?: string;
  className?: string;
  preset?: GsapRevealPreset;
  /** Default center; use start for editorial pages like About. */
  align?: "center" | "start";
};

export function PageHeader({
  title,
  description,
  description2,
  className = "",
  preset,
  align = "center",
}: PageHeaderProps) {
  const pathname = usePathname();
  const ref = useGsapMount({
    preset: preset ?? getPageHeaderPreset(pathname),
    duration: 0.9,
    stagger: 0.14,
    childSelector: "[data-page-header-part]",
    ease: "expo.out",
  });

  const isStart = align === "start";
  const blockAlign = isStart ? "text-start" : "text-center";
  const descMax = isStart ? "max-w-3xl" : "max-w-3xl mx-auto";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${blockAlign} mb-8 sm:mb-12 ${className}`.trim()}
      data-parallax-depth="0.12"
    >
      <h1
        data-page-header-part
        className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-4 sm:mb-6 opacity-0"
      >
        {title}
      </h1>
      {description && (
        <p
          data-page-header-part
          className={`text-base sm:text-lg text-muted-600 dark:text-muted-400 ${descMax} leading-relaxed opacity-0`}
        >
          {description}
        </p>
      )}
      {description2 && (
        <p
          data-page-header-part
          className={`mt-2 text-sm sm:text-base text-muted-500 dark:text-muted-500 max-w-2xl ${isStart ? "" : "mx-auto"} opacity-0`}
        >
          {description2}
        </p>
      )}
    </section>
  );
}
