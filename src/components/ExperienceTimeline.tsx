"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const experiences = [
  {
    year: "2024 - Present",
    title: "Full Stack Developer",
    company: "Freelance",
    description: "Building production-ready web applications from Figma designs to deployment using React, Next.js, TypeScript, and Tailwind CSS. Specializing in performance optimization, analytics integration, and exploring blockchain/web3 technologies.",
    achievements: [
      "Developed 20+ production applications with pixel-perfect Figma implementations",
      "Optimized applications achieving 95+ Lighthouse scores and improved Core Web Vitals",
      "Integrated Google Analytics, PostHog, and HubSpot CRM into multiple web applications",
      "Implemented headless CMS solutions using Sanity and Contentful for content-driven websites",
      "Created performant animations and interactions using Framer Motion and GSAP",
      "Actively learning blockchain technology, Web3 development, and Ethereum ecosystem",
    ],
  },
  {
    year: "2022 - 2024",
    title: "Full Stack Developer",
    company: "Trueperk",
    description: "Developed and maintained an AI-driven employee recognition and rewards platform using Nuxt.js, Vue.js, and TypeScript. Collaborated directly with designers to implement pixel-perfect designs, integrated analytics platforms, and optimized for performance.",
    achievements: [
      "Built scalable component libraries with Vue.js and Nuxt.js following design system guidelines",
      "Implemented real-time analytics with PostHog and Google Analytics for user behavior tracking",
      "Optimized application performance achieving 90+ Lighthouse scores and fast page load times",
      "Collaborated with designers to bring creative visions to life with animations and interactions",
      "Ensured cross-browser compatibility and responsive design across all devices",
      "Maintained security-conscious development practices with rigorous QA and testing",
    ],
  },
  {
    year: "2020 - 2022",
    title: "Full Stack Developer",
    company: "SparkPayHQ",
    description: "Developed payroll SaaS solution using Next.js, React, and TypeScript. Built marketing websites and landing pages from Figma designs, integrated CRM systems, and optimized for performance and SEO.",
    achievements: [
      "Built responsive, pixel-perfect interfaces from Figma designs with Tailwind CSS",
      "Implemented complex payroll calculation features with TypeScript for type safety",
      "Optimized application performance for handling large datasets with efficient data structures",
      "Integrated HubSpot CRM for lead management and customer relationship tracking",
      "Achieved high Lighthouse scores through performance optimization and Core Web Vitals improvements",
      "Maintained security best practices and conducted thorough QA testing",
    ],
  },
  {
    year: "2021 - 2022",
    title: "Software Developer Intern",
    company: "HNGX Internship",
    description: "Participated in an intensive internship program focused on web development. Worked on real-world projects, learned modern technologies, and collaborated with a team of developers.",
    achievements: [
      "Completed multiple challenging projects during the internship",
      "Learned and applied React, Next.js, and modern web technologies",
      "Collaborated with team members on group projects",
      "Gained hands-on experience with version control and agile methodologies",
    ],
  },
];

const education = [
  {
    year: "2021 - 2025",
    title: "BSc(Ed) Mathematics",
    description: "Prince Abubakar Audu University - Bachelor of Science in Education (Mathematics). Studied advanced mathematics, educational theory, and teaching methodologies.",
  },
];

export const ExperienceTimeline = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-8 sm:space-y-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-6 sm:mb-8">Work Experience</h2>
        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-primary-300 dark:bg-primary-700" />
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative pl-12 sm:pl-20 ${
                  isVisible
                    ? `animate-fade-in-up opacity-100`
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="absolute left-3 sm:left-6 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-500 dark:bg-primary-400 border-2 sm:border-4 border-muted-50 dark:border-muted-800 shadow-lg shadow-primary-500/30 dark:shadow-primary-400/20" />
                <div className="p-4 sm:p-6 bg-white/50 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl hover:bg-white/70 dark:hover:bg-muted-800/80 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 backdrop-blur-sm shadow-sm dark:shadow-none">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-muted-900 dark:text-muted-50 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-sm sm:text-base text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 mt-2 sm:mt-0">{exp.year}</span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-3 sm:mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-600 dark:text-muted-400">
                        <span className="text-primary-600 dark:text-primary-400 mt-0.5 sm:mt-1 flex-shrink-0">▸</span>
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
        <h2 className="text-xl sm:text-2xl font-semibold text-muted-900 dark:text-muted-50 mb-6 sm:mb-8">Education</h2>
        <div className="space-y-4 sm:space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`p-4 sm:p-6 bg-white/60 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl hover:bg-white/80 dark:hover:bg-muted-800/80 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
                isVisible
                  ? `animate-fade-in-up opacity-100`
                  : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-muted-900 dark:text-muted-50">{edu.title}</h3>
                <span className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 mt-2 sm:mt-0">{edu.year}</span>
              </div>
              <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
