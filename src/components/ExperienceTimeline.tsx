"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const experiences = [
  {
    year: "2024 - Present",
    title: "Full Stack Developer",
    company: "Freelance",
    description: "Building modern web and mobile applications for clients worldwide. Specializing in React, Next.js, and Flutter development.",
    achievements: [
      "Developed 20+ production applications",
      "Improved client application performance by 40%",
      "Mentored junior developers",
    ],
  },
  {
    year: "2022 - 2024",
    title: "Full Stack Developer",
    company: "Various Projects",
    description: "Worked on multiple frontend and backend projects using React, Next.js, Node.js, and TypeScript. Focused on creating scalable and performant applications.",
    achievements: [
      "Built scalable component libraries",
      "Implemented RESTful and GraphQL APIs",
      "Optimized applications for performance",
    ],
  },
  {
    year: "2020 - 2022",
    title: "Junior Developer",
    company: "Learning & Growth",
    description: "Started my journey in web development, learning modern technologies and best practices. Built personal projects and contributed to open source.",
    achievements: [
      "Mastered React and Next.js",
      "Learned mobile development with Flutter",
      "Contributed to open source projects",
    ],
  },
];

const education = [
  {
    year: "2021 - 2022",
    title: "Self-Taught Developer",
    description: "Intensive self-learning in web development, focusing on JavaScript, React, and modern web technologies.",
  },
];

export const ExperienceTimeline = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-8">Work Experience</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-300 dark:bg-primary-700" />
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative pl-20 ${
                  isVisible
                    ? `animate-fade-in-up opacity-100`
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-muted-50 dark:border-muted-800 shadow-lg shadow-primary-500/30 dark:shadow-primary-400/20" />
                <div className="p-6 bg-white/60 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl hover:bg-white/80 dark:hover:bg-muted-800/80 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-muted-900 dark:text-muted-50 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-600 dark:text-muted-400 mt-2 sm:mt-0">{exp.year}</span>
                  </div>
                  <p className="text-muted-700 dark:text-muted-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-600 dark:text-muted-400">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`p-6 bg-white/60 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl hover:bg-white/80 dark:hover:bg-muted-800/80 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
                isVisible
                  ? `animate-fade-in-up opacity-100`
                  : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-xl font-semibold text-muted-900 dark:text-muted-50">{edu.title}</h3>
                <span className="text-sm text-muted-600 dark:text-muted-400 mt-2 sm:mt-0">{edu.year}</span>
              </div>
              <p className="text-muted-700 dark:text-muted-300 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
