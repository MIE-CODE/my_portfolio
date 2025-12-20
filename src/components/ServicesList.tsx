"use client";
import { ReactIcon, NextIcon, ReactNativeIcon, TypeScriptIcon, Web3Icon } from "../svg";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const services = [
  {
    icon: <NextIcon />,
    title: "Next.js Development",
    description: "Build production-ready websites from Figma designs to deployment. High-performance, SEO-friendly applications with SSR/SSG, optimized for Core Web Vitals and Lighthouse scores.",
    features: ["Figma to Code", "SSR/SSG", "Performance Optimization", "Lighthouse 95+"],
  },
  {
    icon: <ReactIcon />,
    title: "React & TypeScript",
    description: "Expert-level React and TypeScript development. Build dynamic, type-safe user interfaces with modern patterns, hooks, and component architecture.",
    features: ["TypeScript", "Component Architecture", "State Management", "Type Safety"],
  },
  {
    icon: <Web3Icon />,
    title: "Blockchain & Web3 Interest",
    description: "Genuinely excited about blockchain technology and Ethereum scaling solutions. Eager to learn and contribute to Web3 development, smart contract integration, and building consumer-facing applications in the blockchain space.",
    features: ["Ethereum", "Web3", "Learning", "Enthusiastic"],
  },
  {
    icon: <TypeScriptIcon />,
    title: "Performance Optimization",
    description: "Deep expertise in web performance optimization including Core Web Vitals, Lighthouse scoring, and PageSpeed best practices. Achieve fast page load times and exceptional user experience.",
    features: ["Core Web Vitals", "Lighthouse", "PageSpeed", "Performance"],
  },
  {
    title: "Analytics & CRM Integration",
    description: "Integrate analytics platforms (Google Analytics, PostHog) and CRM systems (HubSpot) into web applications. Track user behavior, manage leads, and optimize conversion rates.",
    features: ["Google Analytics", "PostHog", "HubSpot", "Data Tracking"],
  },
  {
    title: "Headless CMS & Content",
    description: "Build content-driven websites with headless CMS platforms like Sanity and Contentful. Create scalable content architectures that enable seamless content management workflows.",
    features: ["Sanity CMS", "Contentful", "Content Management", "API Integration"],
  },
  {
    title: "Animation & Design Implementation",
    description: "Bring creative visions to life with animations and interactions using Framer Motion and GSAP. Collaborate directly with designers to implement pixel-perfect designs with smooth animations.",
    features: ["Framer Motion", "GSAP", "Animations", "Design Implementation"],
  },
];

export const ServicesList = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          className={`p-5 sm:p-6 md:p-8 bg-white/60 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-muted-800/80 hover:border-primary-400 dark:hover:border-primary-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-400/10 ${
            isVisible
              ? `animate-fade-in-up opacity-100`
              : "opacity-0"
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {service.icon && (
            <div className="text-primary-600 dark:text-primary-400 mb-4 sm:mb-6 [&>svg]:w-10 [&>svg]:h-10 sm:[&>svg]:w-12 sm:[&>svg]:h-12">
              {service.icon}
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-3 sm:mb-4">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-4 sm:mb-6 leading-relaxed">
            {service.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {service.features.map((feature, i) => (
              <li
                key={i}
                className="px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
