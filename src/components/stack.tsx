"use client";
import {
  ExpressIcon,
  ReactNativeIcon,
  JavaScriptIcon,
  MongoDBIcon,
  NestIcon,
  NextIcon,
  ReactIcon,
  SassIcon,
  TailwindcssIcon,
  TypeScriptIcon,
  ShadcnIcon,
  GsapIcon,
  EthereumIcon,
  Web3Icon,
  GoogleAnalyticsIcon,
  PostHogIcon,
  HubSpotIcon,
  SanityIcon,
  ContentfulIcon,
  VueIcon,
} from "../svg";
import { useRef } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { useStackHomeReveal } from "../hooks/useStackHomeReveal";

type StackProps = {
  /** Home: dedicated silk timeline (no scroll trigger). */
  variant?: "scroll" | "home";
};

export const Stack = ({ variant = "scroll" }: StackProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isHome = variant === "home";

  useStackHomeReveal(sectionRef, isHome);

  const scrollRef = useGsapReveal({
    preset: "depthFade",
    stagger: 0.05,
    duration: 0.65,
    ease: "power3.out",
    childSelector: "[data-reveal-item]",
  });
  
  const stacks = [
    {
      icon: <NextIcon />,
      name: "Next.js",
      level: "Expert",
      xp: 9500,
    },
    {
      icon: <ReactIcon />,
      name: "React",
      level: "Expert",
      xp: 9200,
    },
    {
      icon: <VueIcon />,
      name: "Vue / Nuxt",
      level: "Expert",
      xp: 9000,
    },
    {
      icon: <TypeScriptIcon />,
      name: "TypeScript",
      level: "Expert",
      xp: 8800,
    },
    {
      icon: <JavaScriptIcon />,
      name: "JavaScript",
      level: "Expert",
      xp: 9000,
    },
    {
      icon: <TailwindcssIcon />,
      name: "Tailwind CSS",
      level: "Expert",
      xp: 8500,
    },
    {
      icon: <SassIcon />,
      name: "SASS",
      level: "Expert",
      xp: 8000,
    },
    {
      icon: <GsapIcon />,
      name: "GSAP",
      level: "Expert",
      xp: 8500,
    },
    {
      icon: <EthereumIcon />,
      name: "Ethereum",
      level: "Learning",
      xp: 500,
    },
    {
      icon: <Web3Icon />,
      name: "Web3",
      level: "Learning",
      xp: 500,
    },
    {
      icon: <GoogleAnalyticsIcon />,
      name: "Google Analytics",
      level: "Expert",
      xp: 7200,
    },
    {
      icon: <PostHogIcon />,
      name: "PostHog",
      level: "Advanced",
      xp: 6800,
    },
    {
      icon: <HubSpotIcon />,
      name: "HubSpot",
      level: "Advanced",
      xp: 6500,
    },
    {
      icon: <SanityIcon />,
      name: "Sanity CMS",
      level: "Advanced",
      xp: 7000,
    },
    {
      icon: <ContentfulIcon />,
      name: "Contentful",
      level: "Advanced",
      xp: 6800,
    },
    {
      icon: <ShadcnIcon />,
      name: "shadcn/ui",
      level: "Expert",
      xp: 8000,
    },
    {
      icon: <ReactNativeIcon />,
      name: "React Native",
      level: "Advanced",
      xp: 6500,
    },
    {
      icon: <MongoDBIcon />,
      name: "MongoDB",
      level: "Advanced",
      xp: 7000,
    },
    {
      icon: <ExpressIcon />,
      name: "Express",
      level: "Advanced",
      xp: 6800,
    },
    {
      icon: <NestIcon />,
      name: "NestJS",
      level: "Advanced",
      xp: 6000,
    },
  ];
  
  return (
    <section
      ref={(isHome ? sectionRef : scrollRef) as React.RefObject<HTMLElement>}
      id="skills"
      className={`section-padding scroll-mt-24 text-center${isHome ? " stack-home-reveal" : ""}`}
      aria-labelledby="skills-heading"
    >
      <h2
        {...(isHome ? { "data-stack-item": "" } : { "data-reveal-item": "" })}
        id="skills-heading"
        className={`text-2xl sm:text-3xl font-bold gradient-text font-mono mb-8${isHome ? "" : " opacity-0"}`}
      >
        {"< Tech Stack >"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5 sm:gap-4">
        {stacks.map((stack, i) => (
          <article
            key={i}
            {...(isHome ? { "data-stack-item": "" } : { "data-reveal-item": "" })}
            className={`game-card verse-hover-hud verse-scan-border p-2.5 sm:p-4 text-center hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300${isHome ? "" : " opacity-0"}`}
            role="listitem"
          >
            <div className="text-primary-600 dark:text-primary-400 mb-2 sm:mb-3 [&>svg]:w-8 [&>svg]:h-10 sm:[&>svg]:w-10 sm:[&>svg]:h-12 mx-auto">{stack.icon}</div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-muted-900 dark:text-muted-50">
                {stack.name}
              </h3>
              <div className="flex items-center justify-center">
                <span className="text-[10px] xs:text-xs text-muted-500 dark:text-muted-500 font-mono">
                  {stack.xp.toLocaleString()} XP
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
