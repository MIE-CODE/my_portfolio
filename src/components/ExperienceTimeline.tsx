"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const experiences = [
  {
    year: "2026 - Present",
    title: "Chief Technology Officer",
    company: "Belsoft Systems Ltd",
    description:
      "CTO for Belsoft Systems’ engineering across products: BelCore—a Slack-like workspace client (channels, DMs, threads, mentions, bookmarks, settings) on Next.js, TypeScript, Tailwind, Redux Toolkit—and BelPower at https://www.belpower.ng/ for utility and telecom billing: airtime, data, electricity with meter verification, cable TV, wallet and history, customer dashboard and admin operations. Sets technical direction, API integration patterns, and delivery with the broader team.",
    achievements: [
      "Owns architecture and delivery for multiple web apps against a shared REST API and repository-style client layer",
      "Ships BelCore’s Slack-style shell (sidebar, workspace navigation, auth routes) and evolves HTTP client, Redux app state, and design system (Sora, Tailwind tokens)",
      "Leads BelPower: Next.js App Router, Zustand, react-hook-form + Zod, Paystack, httpOnly session cookies, middleware, EN/FR i18n, and Next route handlers to the belpower backend API",
      "Partners across product and operations with company presence at belsoftsystems.com",
    ],
  },
  {
    year: "2025 - Present",
    title: "Founder & Owner",
    company: "Blivap",
    description:
      "Building and shipping Blivap, a Nigeria-focused platform connecting blood and sperm donors with people who need donations—marketing and education (“Give Blood. Save Lives.”) plus authenticated donor experiences (profiles, discovery, appointments, wallet, bookings). Next.js (App Router), React, TypeScript, Tailwind, MUI, Redux Toolkit, and a remote REST API with cookie-based sessions.",
    achievements: [
      "Designed the product end-to-end: public content (healthcare, news, FAQ, legal) and logged-in donor flows backed by environment-driven API configuration",
      "Implemented auth (register, login, verification, password reset), session validation via backend (/me), and post-login flows such as avatar selection",
      "Shipped donor features: listings, bookings, ID verification, wallet and history—Axios fetcher with Bearer tokens from cookies",
      "Added SEO and sharing with dynamic Open Graph images (@vercel/og) and structured metadata",
      "Used Formik + Yup for forms, Framer Motion and GSAP for motion, and tooling (ESLint, Prettier, Husky, lint-staged) for maintainability",
    ],
  },
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
    title: "Chief Technology Officer",
    company: "True Perk",
    description:
      "Led engineering for an employee engagement and recognition platform: perks and gifting, recognition and activity feeds, calendars, analytics, billing, automations, and org administration. Stack: Nuxt 3, Vue 3, TypeScript, Pinia, Tailwind, and a repository pattern for APIs.",
    achievements: [
      "Owned frontend architecture, component system, and integration with analytics and payment flows",
      "Shipped features across engagement, employees, perks, calendar, notifications, and admin settings",
      "Drove performance and quality: Lighthouse-focused optimization, responsive UI, and secure client patterns (RBAC, XSS-safe content)",
      "Collaborated with design on Shadcn/Radix-based UI and scalable layouts for enterprise use",
      "Established patterns for Pinia stores, middleware, and composables aligned with product growth",
    ],
  },
  {
    year: "2020 - 2022",
    title: "Chief Technology Officer",
    company: "SparkPay",
    description:
      "Led engineering for a payroll SaaS product on Next.js, React, and TypeScript: core payroll experiences, marketing sites and landing pages from design, HubSpot CRM integration, and strong performance, SEO, and QA practices.",
    achievements: [
      "Owned technical direction for the web app and marketing properties, aligning delivery with product and growth goals",
      "Shipped payroll and data-heavy flows with TypeScript-first patterns and maintainable React architecture",
      "Partnered with design on responsive, pixel-perfect UI (including Tailwind) and conversion-focused pages",
      "Integrated HubSpot CRM for lead and customer workflows",
      "Drove performance and Core Web Vitals (Lighthouse) and security-conscious release practices",
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
                <div className="p-4 sm:p-6 bg-white/90 dark:bg-muted-800/60 border border-muted-200/95 dark:border-muted-700 rounded-2xl hover:bg-white dark:hover:bg-muted-800/80 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 backdrop-blur-sm shadow-[0_2px_10px_rgba(28,25,23,0.06)] dark:shadow-none">
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
              className={`p-4 sm:p-6 bg-white/90 dark:bg-muted-800/60 border border-muted-200/95 dark:border-muted-700 rounded-2xl hover:bg-white dark:hover:bg-muted-800/80 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 shadow-[0_2px_10px_rgba(28,25,23,0.06)] dark:shadow-none ${
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
