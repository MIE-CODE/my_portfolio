"use client";
import {
  ExpressIcon,
  FlutterIcon,
  FramerMotionIcon,
  JavaScriptIcon,
  MongoDBIcon,
  NestIcon,
  NextIcon,
  ReactIcon,
  SassIcon,
  TailwindcssIcon,
  TypeScriptIcon,
} from "../svg";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Stack = () => {
  const { ref, isVisible } = useIntersectionObserver();
  
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
      name: "Tailwind",
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
      icon: <FlutterIcon />,
      name: "Flutter",
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
    <section id="skills" className="section-padding scroll-mt-24 text-center" aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-8"
      >
        {"< Tech Stack >"}
      </h2>

      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {stacks.map((stack, i) => (
          <article
            key={i}
            className={`game-card p-4 text-center hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
              isVisible
                ? `animate-fade-in-up opacity-100`
                : "opacity-0"
            }`}
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
            role="listitem"
          >
            <div className="text-primary-600 dark:text-primary-400 mb-3 [&>svg]:w-10 [&>svg]:h-12 mx-auto">{stack.icon}</div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-muted-900 dark:text-muted-50">
                {stack.name}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-primary-600 dark:text-primary-400 font-mono">{stack.level}</span>
                <span className="text-xs text-muted-500 dark:text-muted-500">•</span>
                <span className="text-xs text-muted-600 dark:text-muted-400">{stack.xp} XP</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
