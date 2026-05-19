"use client";

import type { ElementType, ReactNode } from "react";
import {
  useGsapMount,
  useGsapReveal,
  type GsapRevealOptions,
} from "@/src/hooks/useGsapReveal";

type VerseMotionProps = GsapRevealOptions & {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  mount?: boolean;
};

export function VerseMotion({
  as: Tag = "div",
  children,
  className = "",
  mount = false,
  ...options
}: VerseMotionProps) {
  if (mount) {
    return (
      <VerseMotionMount Tag={Tag} className={className} options={options}>
        {children}
      </VerseMotionMount>
    );
  }

  return (
    <VerseMotionScroll Tag={Tag} className={className} options={options}>
      {children}
    </VerseMotionScroll>
  );
}

function VerseMotionScroll({
  Tag,
  children,
  className,
  options,
}: {
  Tag: ElementType;
  children: ReactNode;
  className: string;
  options: GsapRevealOptions;
}) {
  const ref = useGsapReveal(options);
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`verse-motion ${className}`.trim()}
      data-motion={options.preset ?? "hudRise"}
    >
      {children}
    </Tag>
  );
}

function VerseMotionMount({
  Tag,
  children,
  className,
  options,
}: {
  Tag: ElementType;
  children: ReactNode;
  className: string;
  options: GsapRevealOptions;
}) {
  const ref = useGsapMount(options);
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`verse-motion ${className}`.trim()}
      data-motion={options.preset ?? "hudRise"}
    >
      {children}
    </Tag>
  );
}
