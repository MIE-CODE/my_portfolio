"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Avatar3D } from "./Avatar3D";

export const About = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const infos = [
    {
      title: "Full Stack Developer",
      desc: "5+ years building production-ready web applications from Figma designs to deployment. Expert in React, Next.js, TypeScript, and Tailwind CSS. Specialized in creating pixel-perfect, responsive implementations with exceptional performance and accessibility.",
      icon: "💻",
    },
    {
      title: "Performance & Analytics Expert",
      desc: "Deep expertise in web performance optimization including Core Web Vitals, Lighthouse scoring, and PageSpeed best practices. Experienced integrating Google Analytics, PostHog, and CRM systems like HubSpot into web applications.",
      icon: "📊",
    },
    {
      title: "Animation & Design Specialist",
      desc: "Expert in bringing creative visions to life with animations and interactions using Framer Motion and GSAP. Collaborate directly with designers to implement pixel-perfect designs with smooth, performant animations.",
      icon: "🎨",
    },
    {
      title: "Blockchain & Web3 Enthusiast",
      desc: "Genuinely excited about blockchain technology and Ethereum scaling solutions. Eager to learn Web3 development, smart contracts, and building consumer-facing applications in the blockchain space. Actively exploring Arbitrum, Ethereum ecosystem, and decentralized systems.",
      icon: "⛓️",
    },
    {
      title: "CMS & Content Management",
      desc: "Hands-on experience with headless CMS platforms like Sanity and Contentful for content-driven websites. Build scalable, maintainable content architectures that enable seamless content management workflows.",
      icon: "📝",
    },
    {
      title: "Security & Quality Focused",
      desc: "Security-conscious approach to code development with rigorous QA and testing practices. Ensure production applications meet the highest standards for security, performance, and user experience.",
      icon: "🔒",
    },
  ];

  return (
    <section
      id="about"
      className="section-padding scroll-mt-24"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
        <h2
          id="about-heading"
          className={`text-2xl sm:text-3xl font-bold gradient-text font-mono ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {"< About Me >"}
        </h2>
        <p className="text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
          Full-stack developer with 5+ years of experience building production websites from Figma designs to deployment. Expert in React, Next.js, TypeScript, and Tailwind CSS with deep expertise in performance optimization and analytics integration. Genuinely excited about blockchain technology and eager to learn more about Web3 development, Ethereum scaling solutions, and decentralized systems. Passionate about crafting high-quality user experiences with attention to design details and security best practices.
        </p>
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        id="aboutsec"
        className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-6xl mx-auto px-4 relative"
      >
        <div className="flex-1 flex flex-col gap-4 z-10">
          {infos.map((info, i) => (
            <article
              key={i}
              className={`game-card p-4 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
                isVisible ? `animate-fade-in-up opacity-100` : "opacity-0"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {i === 0 && (
                <h3 className="text-lg sm:text-xl font-bold text-muted-900 dark:text-muted-50 mb-3">
                  I&apos;m Menyaga Israel:
                </h3>
              )}
              <div className="flex gap-3 items-start">
                <div className="text-2xl flex-shrink-0">{info.icon}</div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-1.5">
                    {info.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-700 dark:text-muted-300 leading-relaxed">
                    {info.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] max-w-xs md:max-w-sm flex-shrink-0 z-10 relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10 dark:shadow-primary-500/20 border border-muted-200 dark:border-muted-700 ${
            isVisible ? `animate-scale-in opacity-100` : "opacity-0"
          }`}
          style={{
            animationDelay: "0.3s",
          }}
        >
          <Avatar3D />
        </div>
      </div>
    </section>
  );
};
