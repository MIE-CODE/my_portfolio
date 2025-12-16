"use client";
import { ReactIcon, NextIcon, ReactNativeIcon, TypeScriptIcon } from "../svg";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const services = [
  {
    icon: <NextIcon />,
    title: "Next.js Development",
    description: "Build high-performance, SEO-friendly web applications with Next.js. Server-side rendering, static site generation, and API routes.",
    features: ["SSR/SSG", "API Routes", "Image Optimization", "SEO"],
  },
  {
    icon: <ReactIcon />,
    title: "React Development",
    description: "Create dynamic, interactive user interfaces with React. Component-based architecture with modern hooks and context API.",
    features: ["Component Architecture", "State Management", "Hooks", "Context API"],
  },
  {
    icon: <ReactNativeIcon />,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications with React Native. Single codebase for iOS and Android with native performance.",
    features: ["Cross-Platform", "Native Performance", "React Components", "Custom UI"],
  },
  {
    icon: <TypeScriptIcon />,
    title: "TypeScript Development",
    description: "Type-safe development with TypeScript. Better code quality, fewer bugs, and improved developer experience.",
    features: ["Type Safety", "Better DX", "Scalability", "Maintainability"],
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end web application development from frontend to backend. MERN stack expertise with MongoDB, Express, React, and Node.js.",
    features: ["MERN Stack", "RESTful APIs", "Database Design", "Authentication"],
  },
  {
    title: "UI/UX Design & Development",
    description: "Beautiful, responsive user interfaces with modern design principles. Tailwind CSS, Framer Motion, and custom animations.",
    features: ["Responsive Design", "Modern UI", "Animations", "Accessibility"],
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
