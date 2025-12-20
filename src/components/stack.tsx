"use client";
import {
  ExpressIcon,
  ReactNativeIcon,
  FramerMotionIcon,
  JavaScriptIcon,
  MongoDBIcon,
  NestIcon,
  NextIcon,
  ReactIcon,
  SassIcon,
  TailwindcssIcon,
  TypeScriptIcon,
  VueIcon,
  AstroIcon,
  ShadcnIcon,
  GsapIcon,
  EthereumIcon,
  Web3Icon,
  GoogleAnalyticsIcon,
  PostHogIcon,
  HubSpotIcon,
  SanityIcon,
  ContentfulIcon,
} from "../svg";
import { useGSAP } from "../hooks/useGSAP";
import { useRef } from "react";
import gsap from "gsap";

export const Stack = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
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
      icon: <FramerMotionIcon />,
      name: "Framer Motion",
      level: "Expert",
      xp: 7800,
    },
    {
      icon: <GsapIcon />,
      name: "GSAP",
      level: "Expert",
      xp: 7500,
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
  
  useGSAP(() => {
    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    // Cards stagger animation
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotation: -5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.05,
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);
  
  return (
    <section 
      id="skills" 
      className="section-padding scroll-mt-24 text-center" 
      aria-labelledby="skills-heading"
    >
      <h2
        ref={titleRef}
        id="skills-heading"
        className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-8"
      >
        {"< Tech Stack >"}
      </h2>

      <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {stacks.map((stack, i) => (
          <article
            key={i}
            className="game-card p-3 sm:p-4 text-center hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300"
            role="listitem"
          >
            <div className="text-primary-600 dark:text-primary-400 mb-2 sm:mb-3 [&>svg]:w-8 [&>svg]:h-10 sm:[&>svg]:w-10 sm:[&>svg]:h-12 mx-auto">{stack.icon}</div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-muted-900 dark:text-muted-50">
                {stack.name}
              </h3>
              <div className="flex items-center justify-center">
                <span className="text-[9px] xs:text-[10px] text-muted-500 dark:text-muted-500 font-mono">
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
