"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { StaticImageData } from "next/image";
import { useGsapReveal } from "../hooks/useGsapReveal";
import gsap from "gsap";
import trueperkImg from "../images/trueperk.png";
import sparkpayImg from "../images/sparkpay.png";
import flyvergeImg from "../images/flyverge.png";
import ecommerceImg from "../images/ecommerce.png";

// Frontend Projects - Add your projects here
const frontendProjects: Array<{
  id: number;
  img: StaticImageData;
  skills: string[];
  title: string;
  description: string;
  link: string;
  githubLink: string;
  category: "Frontend" | "Backend";
  role?: string;
  detailPath?: string;
}> = [
  {
    id: 1,
    img: trueperkImg,
    skills: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Tailwind CSS",
      "Shadcn",
    ],
    title: "True Perk",
    description:
      "Employee engagement and recognition platform: perks and gifting, recognition feeds, calendars and events, analytics dashboards, billing, automations, and org admin—built with Nuxt 3, Pinia, and a repository-style API layer.",
    link: "https://trueperk.co/",
    githubLink: "#",
    category: "Frontend",
    role: "Senior frontend engineer · Nuxt",
  },
  {
    id: 2,
    img: sparkpayImg,
    skills: ["Next.js", "React", "TypeScript", "SCSS"],
    title: "SparkPay",
    description:
      "Payroll SaaS product and marketing surfaces: payroll workflows, data-heavy UI, CRM-connected funnels, and performance- and SEO-focused delivery on Next.js and React.",
    link: "https://www.sparkpayhq.com/",
    githubLink: "#",
    category: "Frontend",
    role: "Senior frontend engineer · Next.js",
  },
  {
    id: 3,
    img: flyvergeImg,
    skills: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MUI",
      "Redux Toolkit",
    ],
    title: "Blivap",
    description:
      "Donor marketplace for Nigeria: connects blood and sperm donors with people who need donations—public education and marketing (“Give Blood. Save Lives.”) plus authenticated donor flows (profiles, discovery, appointments, wallet, bookings, settings) against a remote REST API with cookie-backed auth.",
    link: "https://blivap.com/",
    githubLink: "#",
    category: "Frontend",
    role: "Founder & engineer · Israel Enyo Menyaga (MIE)",
    detailPath: "/projects/blivap",
  },
  {
    id: 4,
    img: flyvergeImg,
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Headless UI",
    ],
    title: "BelCore",
    description:
      "Slack-style team collaboration app for Belsoft Systems: workspace shell, channels, direct messages, threads, mentions, bookmarks, and settings—the same core pattern as Slack. Next.js App Router, Redux Toolkit, repository-style API layer, Tailwind, Headless UI, Sora typography.",
    link: "https://www.belsoftsystems.com/",
    githubLink: "#",
    category: "Frontend",
    role: "CTO · Belsoft Systems",
  },
  {
    id: 5,
    img: sparkpayImg,
    skills: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Zustand",
      "Paystack",
    ],
    title: "BelPower",
    description:
      "Pay airtime, data, electricity (meter verification, DISCO flows), and cable TV from one app—wallet, history, scheduled bills, onboarding, public marketing pages, customer dashboard, and admin. Next.js 15 App Router, Zustand, RHF + Zod, Radix/Headless UI, Paystack, httpOnly sessions, middleware, EN/FR i18n, route handlers to a separate backend API.",
    link: "https://www.belpower.ng/",
    githubLink: "#",
    category: "Frontend",
    role: "CTO · Belsoft Systems",
  },
  {
    id: 6,
    img: flyvergeImg,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    title: "Flyverge",
    description:
      "Flight booking app with real-time updates, dynamic pricing, and seamless booking experience.",
    link: "https://flyverge.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/flyverge",
    category: "Frontend",
  },
  {
    id: 7,
    img: ecommerceImg,
    skills: ["Three.js", "JavaScript", "CSS"],
    title: "Solar System",
    description:
      "Interactive 3D solar system visualization with realistic planetary orbits and smooth animations.",
    link: "https://solar-system-tan-five.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/solar-system",
    category: "Frontend",
  },
  {
    id: 8,
    img: ecommerceImg,
    skills: ["React", "Tailwind CSS", "GSAP"],
    title: "E-commerce Platform",
    description:
      "Modern e-commerce app with efficient state management, responsive design, and smooth animations.",
    link: "https://e-commerce-site-five-psi.vercel.app/",
    githubLink: "#",
    category: "Frontend",
  },
];

// Upcoming Projects - Projects I look forward to building
const upcomingProjects = [
  {
    id: 50,
    title: "Decentralized Social Network",
    description:
      "Building a Web3 social network on Ethereum with smart contracts for content ownership and monetization.",
    skills: ["Web3", "Ethereum", "Solidity", "IPFS"],
    status: "Planning",
  },
  {
    id: 51,
    title: "AI-Powered Design Tool",
    description:
      "Creating an AI-assisted design tool that generates UI components and layouts based on natural language descriptions.",
    skills: ["AI/ML", "Canvas API", "Design Systems"],
    status: "Research",
  },
  {
    id: 52,
    title: "Real-time Collaboration Suite",
    description:
      "Building a comprehensive collaboration platform with video, whiteboard, document editing, and project management.",
    skills: ["WebRTC", "WebSocket", "CRDT"],
    status: "Planning",
  },
  {
    id: 53,
    title: "Blockchain Analytics Dashboard",
    description:
      "Developing an analytics dashboard for tracking DeFi protocols, NFT markets, and blockchain metrics.",
    skills: ["Web3", "D3.js", "Real-time Data"],
    status: "Research",
  },
  {
    id: 54,
    title: "AR Shopping Experience",
    description:
      "Creating an augmented reality shopping app where users can visualize products in their space before purchasing.",
    skills: ["WebXR", "Three.js", "AR"],
    status: "Planning",
  },
  {
    id: 55,
    title: "Code Review AI Assistant",
    description:
      "Building an AI tool that automatically reviews code, suggests improvements, and detects security vulnerabilities.",
    skills: ["AI/ML", "AST Parsing", "Code Analysis"],
    status: "Research",
  },
  {
    id: 56,
    title: "Decentralized File Storage",
    description:
      "Developing a decentralized file storage solution using IPFS and blockchain for permanent, distributed storage.",
    skills: ["IPFS", "Web3", "Blockchain"],
    status: "Planning",
  },
  {
    id: 57,
    title: "Interactive Learning Platform",
    description:
      "Creating an immersive learning platform with gamification, progress tracking, and personalized learning paths.",
    skills: ["Gamification", "Analytics", "Personalization"],
    status: "Planning",
  },
];

// Backend Projects - Add your backend projects here
const backendProjects: Array<{
  id: number;
  img: StaticImageData;
  skills: string[];
  title: string;
  description: string;
  link: string;
  githubLink: string;
  category: "Frontend" | "Backend";
  role?: string;
  detailPath?: string;
}> = [
  {
    id: 8,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "REST API"],
    title: "E-commerce API",
    description:
      "RESTful API for e-commerce platform with authentication, payment processing, and order management.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 9,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "GraphQL"],
    title: "Task Management API",
    description:
      "Scalable task management system with GraphQL API, real-time updates, and advanced filtering.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 10,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "JWT"],
    title: "Authentication Service",
    description:
      "Secure authentication microservice with JWT tokens, OAuth integration, and role-based access control.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 11,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "Redis", "WebSocket"],
    title: "Real-time Chat API",
    description:
      "WebSocket-based real-time messaging API with Redis pub/sub, message persistence, and typing indicators.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 12,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Stripe"],
    title: "Payment Processing API",
    description:
      "Secure payment processing API with Stripe integration, subscription management, and webhook handling.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 13,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "AWS S3"],
    title: "File Upload Service",
    description:
      "Scalable file upload API with AWS S3 integration, image processing, and CDN distribution.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 14,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Bull Queue"],
    title: "Email Service API",
    description:
      "Robust email service API with queue management, template engine, and multi-provider support.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 15,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "Socket.io"],
    title: "Notification Service",
    description:
      "Real-time notification API with push notifications, in-app alerts, and multi-channel delivery.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 16,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Elasticsearch"],
    title: "Search API",
    description:
      "Advanced search API with Elasticsearch integration, full-text search, and faceted filtering.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 17,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "RabbitMQ"],
    title: "Event-Driven API",
    description:
      "Event-driven microservice architecture with message queues, event sourcing, and CQRS pattern.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 18,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Docker"],
    title: "Analytics API",
    description:
      "Analytics and reporting API with data aggregation, real-time metrics, and custom dashboard support.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 19,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "Jest"],
    title: "Social Media API",
    description:
      "Social media backend API with user feeds, follow/unfollow, content moderation, and engagement tracking.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 20,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Kafka"],
    title: "Data Streaming API",
    description:
      "High-performance data streaming API with Apache Kafka, real-time processing, and event streaming.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 21,
    img: ecommerceImg,
    skills: ["Node.js", "Express.js", "MongoDB", "Swagger"],
    title: "API Gateway",
    description:
      "Centralized API gateway with rate limiting, request routing, API versioning, and comprehensive documentation.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 22,
    img: ecommerceImg,
    skills: ["NestJS", "PostgreSQL", "TypeScript", "gRPC"],
    title: "Microservices API",
    description:
      "Microservices architecture with gRPC communication, service discovery, and distributed tracing.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
];

export const ProjectsList = () => {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">(
    "frontend",
  );
  const [showAllFrontend, setShowAllFrontend] = useState(false);
  const [showAllBackend, setShowAllBackend] = useState(false);
  const tabsRef = useGsapReveal({
    preset: "orbitIn",
    duration: 0.75,
  });
  const gridRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useGsapReveal({ preset: "hudRise", duration: 0.65 });

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-reveal-item]");
    if (!cards.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      gsap.set(cards, { opacity: 1, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.97, rotateZ: 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 0.48,
          stagger: 0.035,
          ease: "power2.out",
        },
      );
    }, grid);

    return () => ctx.revert();
  }, [activeTab, showAllFrontend, showAllBackend]);
  const upcomingRef = useGsapReveal({
    preset: "dataPulse",
    stagger: 0.1,
    duration: 0.65,
    parallax: 0.1,
  });

  return (
    <div>
      {/* Tab Selector */}
      <div
        ref={tabsRef as React.RefObject<HTMLDivElement>}
        className="flex w-full max-w-md sm:max-w-none sm:w-fit items-stretch sm:items-center justify-center gap-1.5 sm:gap-3 bg-muted-100/95 dark:bg-muted-900/90 p-1 sm:p-1.5 rounded-lg border border-muted-200/95 dark:border-muted-700 mx-auto mb-6 sm:mb-10 backdrop-blur-md shadow-[0_2px_10px_rgba(28,25,23,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] opacity-0"
      >
        <button
          className={`touch-target flex-1 sm:flex-none px-3 sm:px-6 py-2.5 rounded-md font-medium text-xs sm:text-sm transition-all duration-300 ${
            activeTab === "frontend"
              ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/20"
              : "bg-transparent text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-50"
          }`}
          onClick={() => {
            setActiveTab("frontend");
            setShowAllFrontend(false);
          }}
        >
          🎨 Frontend
        </button>
        <button
          className={`touch-target flex-1 sm:flex-none px-3 sm:px-6 py-2.5 rounded-md font-medium text-xs sm:text-sm transition-all duration-300 ${
            activeTab === "backend"
              ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/20"
              : "bg-transparent text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-50"
          }`}
          onClick={() => {
            setActiveTab("backend");
            setShowAllBackend(false);
          }}
        >
          ⚙️ Backend
        </button>
      </div>

      {/* Projects Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        role="list"
      >
        {activeTab === "frontend"
          ? (showAllFrontend
              ? frontendProjects
              : frontendProjects.slice(0, 6)
            ).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          : (showAllBackend
              ? backendProjects
              : backendProjects.slice(0, 6)
            ).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
      </div>

      {/* See More Button */}
      {((activeTab === "frontend" && frontendProjects.length > 6) ||
        (activeTab === "backend" && backendProjects.length > 6)) && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => {
              if (activeTab === "frontend") {
                setShowAllFrontend(!showAllFrontend);
              } else {
                setShowAllBackend(!showAllBackend);
              }
            }}
            className="touch-target px-6 sm:px-8 py-3 bg-gradient-primary text-white rounded-lg font-medium text-sm sm:text-base hover:shadow-lg shadow-primary-500/20 transition-all duration-300 sm:hover:scale-105"
          >
            {activeTab === "frontend"
              ? showAllFrontend
                ? "Show Less"
                : (
                  <>
                    <span className="sm:hidden">See more ({frontendProjects.length - 6})</span>
                    <span className="hidden sm:inline">
                      {`See More (${frontendProjects.length - 6} more projects)`}
                    </span>
                  </>
                )
              : showAllBackend
                ? "Show Less"
                : (
                  <>
                    <span className="sm:hidden">See more ({backendProjects.length - 6})</span>
                    <span className="hidden sm:inline">
                      {`See More (${backendProjects.length - 6} more projects)`}
                    </span>
                  </>
                )}
          </button>
        </div>
      )}

      {/* Info Text */}
      {((activeTab === "frontend" && frontendProjects.length <= 6) ||
        (activeTab === "backend" && backendProjects.length <= 6)) && (
        <p
          ref={infoTextRef as React.RefObject<HTMLParagraphElement>}
          className="text-center text-[10px] xs:text-xs text-muted-500 dark:text-muted-500 mt-8 sm:mt-12 font-mono opacity-0"
        >
          More projects coming soon...
        </p>
      )}

      {/* Upcoming Projects Section */}
      <div
        className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-muted-200 dark:border-muted-700"
        data-parallax-depth="0.14"
      >
        <h3 className="text-xl sm:text-2xl font-bold gradient-text font-mono text-center mb-6 sm:mb-8">
          {"< Upcoming Projects >"}
        </h3>
        <p className="text-center text-sm text-muted-600 dark:text-muted-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Exciting projects I&apos;m planning to build. These represent my
          passion for innovation and continuous learning.
        </p>
        <div
          ref={upcomingRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {upcomingProjects.map((project) => (
            <div
              key={project.id}
              data-reveal-item
              className="game-card verse-hover-hud verse-scan-border p-4 sm:p-5 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 relative overflow-hidden opacity-0"
            >
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-[9px] xs:text-[10px] font-mono rounded bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 text-accent-700 dark:text-accent-300">
                  {project.status}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-muted-900 dark:text-muted-50 mb-2 sm:mb-3 pr-14 sm:pr-16">
                {project.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed mb-3 sm:mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[9px] xs:text-[10px] font-mono bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded text-primary-700 dark:text-primary-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
