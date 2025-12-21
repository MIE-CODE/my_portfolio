"use client";
import { 
  ReactIcon, 
  NextIcon, 
  TypeScriptIcon, 
  Web3Icon,
  GoogleAnalyticsIcon,
  ContentfulIcon,
  GsapIcon,
} from "../svg";
import { useGSAP } from "../hooks/useGSAP";
import { useRef } from "react";
import gsap from "gsap";

const services = [
  {
    icon: <NextIcon />,
    title: "Next.js Development",
    description: "Build production-ready websites from Figma designs to deployment. High-performance, SEO-friendly applications with SSR/SSG, optimized for Core Web Vitals and Lighthouse scores.",
    features: ["Figma to Code", "SSR/SSG", "Performance Optimization", "Lighthouse 95+"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <ReactIcon />,
    title: "React & TypeScript",
    description: "Expert-level React and TypeScript development. Build dynamic, type-safe user interfaces with modern patterns, hooks, and component architecture.",
    features: ["TypeScript", "Component Architecture", "State Management", "Type Safety"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: <Web3Icon />,
    title: "Blockchain & Web3 Interest",
    description: "Genuinely excited about blockchain technology and Ethereum scaling solutions. Eager to learn and contribute to Web3 development, smart contract integration, and building consumer-facing applications in the blockchain space.",
    features: ["Ethereum", "Web3", "Learning", "Enthusiastic"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <TypeScriptIcon />,
    title: "Performance Optimization",
    description: "Deep expertise in web performance optimization including Core Web Vitals, Lighthouse scoring, and PageSpeed best practices. Achieve fast page load times and exceptional user experience.",
    features: ["Core Web Vitals", "Lighthouse", "PageSpeed", "Performance"],
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: <GoogleAnalyticsIcon />,
    title: "Analytics & CRM Integration",
    description: "Integrate analytics platforms (Google Analytics, PostHog) and CRM systems (HubSpot) into web applications. Track user behavior, manage leads, and optimize conversion rates.",
    features: ["Google Analytics", "PostHog", "HubSpot", "Data Tracking"],
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <ContentfulIcon />,
    title: "Headless CMS & Content",
    description: "Build content-driven websites with headless CMS platforms like Sanity and Contentful. Create scalable content architectures that enable seamless content management workflows.",
    features: ["Sanity CMS", "Contentful", "Content Management", "API Integration"],
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <GsapIcon />,
    title: "Animation & Design Implementation",
    description: "Bring creative visions to life with animations and interactions using Framer Motion and GSAP. Collaborate directly with designers to implement pixel-perfect designs with smooth animations.",
    features: ["Framer Motion", "GSAP", "Animations", "Design Implementation"],
    color: "from-green-400 to-teal-500",
  },
];

export const ServicesList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      {services.map((service, index) => (
        <article
          key={index}
          className="group relative p-6 sm:p-7 md:p-8 bg-gradient-to-br from-white/80 to-white/60 dark:from-muted-800/80 dark:to-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:border-primary-400 dark:hover:border-primary-600 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-400/20 overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />
          
          {/* Icon with gradient background */}
          <div className="relative mb-5 sm:mb-6">
            <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500 mb-3`}>
              <div className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10">
                {service.icon}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-muted-900 dark:text-muted-50 mb-3 sm:mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-5 sm:mb-6 leading-relaxed">
              {service.description}
            </p>
            
            {/* Features */}
            <ul className="flex flex-wrap gap-2 mb-4">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 rounded-full border border-primary-200 dark:border-primary-800 group-hover:border-primary-400 dark:group-hover:border-primary-600 transition-colors duration-300"
                >
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Link */}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 group-hover:gap-3"
            >
              <span>Get Started</span>
              <span className="text-lg">→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};
