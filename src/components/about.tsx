"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Avatar3D } from "./Avatar3D";

export const About = () => {
  const { ref, isVisible } = useIntersectionObserver();
  
  const infos = [
    {
      title: "Full Stack Developer",
      desc: "I develop full-stack web applications using the MERN stack that are responsive, fast, and scalable. Proficient in handling both frontend and backend, ensuring seamless integration of services.",
      icon: "💻",
    },
    {
      title: "React & Next.js Specialist",
      desc: "Mastery in building dynamic, component-based web applications using React & Next.js. I leverage tools like React hooks, Context API, and modern state management to create highly interactive user interfaces.",
      icon: "⚛️",
    },
    {
      title: "Mobile Developer",
      desc: "I specialize in Flutter, an open-source framework developed by Google, which allows for the creation of high-performance, cross-platform mobile applications using a single codebase.",
      icon: "📱",
    },
    {
      title: "Version Control Expert",
      desc: "As a developer with over 5 years of experience, Git and GitHub are core tools I rely on for version control and team collaboration. These platforms allow me to efficiently manage and track changes in codebases.",
      icon: "🔧",
    },
  ];
  
  return (
    <section id="about" className="section-padding scroll-mt-24" aria-labelledby="about-heading">
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
          Software developer with 5+ years of practical experience in web and mobile development
        </p>
      </div>
      
      <div ref={ref as React.RefObject<HTMLDivElement>} id="aboutsec" className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-6xl mx-auto px-4 relative">
        <div className="flex-1 flex flex-col gap-4 z-10">
          {infos.map((info, i) => (
            <article
              key={i}
              className={`game-card p-4 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
                isVisible
                  ? `animate-fade-in-up opacity-100`
                  : "opacity-0"
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
          className={`w-full max-w-xs md:max-w-sm flex-shrink-0 z-10 relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10 dark:shadow-primary-500/20 border border-muted-200 dark:border-muted-700 ${
            isVisible
              ? `animate-scale-in opacity-100`
              : "opacity-0"
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
