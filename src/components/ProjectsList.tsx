"use client";
import { useState, useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import { StaticImageData } from "next/image";
import { useGSAP } from "../hooks/useGSAP";
import gsap from "gsap";

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
}> = [
  {
    id: 1,
    img: require("../images/trueperk.png"),
    skills: ["Nuxt.js", "Vue.js", "TypeScript", "Tailwind CSS"],
    title: "Trueperk",
    description: "AI-driven employee recognition platform with real-time analytics and reward redemption.",
    link: "https://app.trueperk.co/",
    githubLink: "#",
    category: "Frontend",
  },
  {
    id: 2,
    img: require("../images/sparkpay.png"),
    skills: ["Next.js", "React", "TypeScript", "SCSS"],
    title: "SparkPay",
    description: "Payroll SaaS solution with intuitive UI for processing and managing payrolls efficiently.",
    link: "https://www.sparkpayhq.com/",
    githubLink: "#",
    category: "Frontend",
  },
  {
    id: 3,
    img: require("../images/flyverge.png"),
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    title: "Flyverge",
    description: "Flight booking app with real-time updates, dynamic pricing, and seamless booking experience.",
    link: "https://flyverge.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/flyverge",
    category: "Frontend",
  },
  {
    id: 4,
    img: require("../images/ecommerce.png"),
    skills: ["Three.js", "JavaScript","CSS"],
    title: "Solar System",
    description: "Interactive 3D solar system visualization with realistic planetary orbits and smooth animations.",
    link: "https://solar-system-tan-five.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/solar-system",
    category: "Frontend",
  },
  {
    id: 5,
    img: require("../images/ecommerce.png"),
    skills: ["React", "Tailwind CSS", "Framer Motion"],
    title: "E-commerce Platform",
    description: "Modern e-commerce app with efficient state management, responsive design, and smooth animations.",
    link: "https://e-commerce-site-five-psi.vercel.app/",
    githubLink: "#",
    category: "Frontend",
  },
  
  {
    id: 6,
    img: require("../images/todoapp.png"),
    skills: ["Vue.js", "JavaScript", "Tailwind CSS"],
    title: "Todo App",
    description: "Interactive todo app built with Vue.js, featuring reactive components and optimized performance.",
    link: "https://todo-app-vuejs-chi.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/Todo-App-vuejs",
    category: "Frontend",
  },
];

// Upcoming Projects - Projects I look forward to building
const upcomingProjects = [
  {
    id: 50,
    title: "Decentralized Social Network",
    description: "Building a Web3 social network on Ethereum with smart contracts for content ownership and monetization.",
    skills: ["Web3", "Ethereum", "Solidity", "IPFS"],
    status: "Planning",
  },
  {
    id: 51,
    title: "AI-Powered Design Tool",
    description: "Creating an AI-assisted design tool that generates UI components and layouts based on natural language descriptions.",
    skills: ["AI/ML", "Canvas API", "Design Systems"],
    status: "Research",
  },
  {
    id: 52,
    title: "Real-time Collaboration Suite",
    description: "Building a comprehensive collaboration platform with video, whiteboard, document editing, and project management.",
    skills: ["WebRTC", "WebSocket", "CRDT"],
    status: "Planning",
  },
  {
    id: 53,
    title: "Blockchain Analytics Dashboard",
    description: "Developing an analytics dashboard for tracking DeFi protocols, NFT markets, and blockchain metrics.",
    skills: ["Web3", "D3.js", "Real-time Data"],
    status: "Research",
  },
  {
    id: 54,
    title: "AR Shopping Experience",
    description: "Creating an augmented reality shopping app where users can visualize products in their space before purchasing.",
    skills: ["WebXR", "Three.js", "AR"],
    status: "Planning",
  },
  {
    id: 55,
    title: "Code Review AI Assistant",
    description: "Building an AI tool that automatically reviews code, suggests improvements, and detects security vulnerabilities.",
    skills: ["AI/ML", "AST Parsing", "Code Analysis"],
    status: "Research",
  },
  {
    id: 56,
    title: "Decentralized File Storage",
    description: "Developing a decentralized file storage solution using IPFS and blockchain for permanent, distributed storage.",
    skills: ["IPFS", "Web3", "Blockchain"],
    status: "Planning",
  },
  {
    id: 57,
    title: "Interactive Learning Platform",
    description: "Creating an immersive learning platform with gamification, progress tracking, and personalized learning paths.",
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
}> = [
  {
    id: 8,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "REST API"],
    title: "E-commerce API",
    description: "RESTful API for e-commerce platform with authentication, payment processing, and order management.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 9,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "GraphQL"],
    title: "Task Management API",
    description: "Scalable task management system with GraphQL API, real-time updates, and advanced filtering.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 10,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "JWT"],
    title: "Authentication Service",
    description: "Secure authentication microservice with JWT tokens, OAuth integration, and role-based access control.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 11,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "Redis", "WebSocket"],
    title: "Real-time Chat API",
    description: "WebSocket-based real-time messaging API with Redis pub/sub, message persistence, and typing indicators.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 12,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Stripe"],
    title: "Payment Processing API",
    description: "Secure payment processing API with Stripe integration, subscription management, and webhook handling.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 13,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "AWS S3"],
    title: "File Upload Service",
    description: "Scalable file upload API with AWS S3 integration, image processing, and CDN distribution.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 14,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Bull Queue"],
    title: "Email Service API",
    description: "Robust email service API with queue management, template engine, and multi-provider support.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 15,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "Socket.io"],
    title: "Notification Service",
    description: "Real-time notification API with push notifications, in-app alerts, and multi-channel delivery.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 16,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Elasticsearch"],
    title: "Search API",
    description: "Advanced search API with Elasticsearch integration, full-text search, and faceted filtering.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 17,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "RabbitMQ"],
    title: "Event-Driven API",
    description: "Event-driven microservice architecture with message queues, event sourcing, and CQRS pattern.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 18,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Docker"],
    title: "Analytics API",
    description: "Analytics and reporting API with data aggregation, real-time metrics, and custom dashboard support.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 19,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "Jest"],
    title: "Social Media API",
    description: "Social media backend API with user feeds, follow/unfollow, content moderation, and engagement tracking.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 20,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "Kafka"],
    title: "Data Streaming API",
    description: "High-performance data streaming API with Apache Kafka, real-time processing, and event streaming.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 21,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "Swagger"],
    title: "API Gateway",
    description: "Centralized API gateway with rate limiting, request routing, API versioning, and comprehensive documentation.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 22,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "gRPC"],
    title: "Microservices API",
    description: "Microservices architecture with gRPC communication, service discovery, and distributed tracing.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
];

export const ProjectsList = () => {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");
  const [showAllFrontend, setShowAllFrontend] = useState(false);
  const [showAllBackend, setShowAllBackend] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Tabs animation
    if (tabsRef.current) {
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Grid animation
    if (gridRef.current) {
      const cards = gridRef.current.children;
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
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      );
    }

    // Info text animation
    if (infoTextRef.current) {
      gsap.fromTo(
        infoTextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab, showAllFrontend, showAllBackend]);

  return (
    <div>
      {/* Tab Selector */}
      <div ref={tabsRef} className="flex items-center justify-center gap-2 sm:gap-3 bg-white/50 dark:bg-muted-800/60 p-1 sm:p-1.5 rounded-lg border border-muted-200 dark:border-muted-700 w-fit mx-auto mb-6 sm:mb-10 backdrop-blur-sm">
        <button
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium text-xs sm:text-sm transition-all duration-300 ${
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
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium text-xs sm:text-sm transition-all duration-300 ${
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
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" role="list">
        {activeTab === "frontend"
          ? (showAllFrontend ? frontendProjects : frontendProjects.slice(0, 6)).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          : (showAllBackend ? backendProjects : backendProjects.slice(0, 6)).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
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
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-primary text-white rounded-lg font-medium text-sm sm:text-base hover:shadow-lg shadow-primary-500/20 transition-all duration-300 hover:scale-105"
          >
            {activeTab === "frontend"
              ? showAllFrontend
                ? "Show Less"
                : `See More (${frontendProjects.length - 6} more projects)`
              : showAllBackend
              ? "Show Less"
              : `See More (${backendProjects.length - 6} more projects)`}
          </button>
        </div>
      )}

      {/* Info Text */}
      {((activeTab === "frontend" && frontendProjects.length <= 6) || 
        (activeTab === "backend" && backendProjects.length <= 6)) && (
        <p ref={infoTextRef} className="text-center text-[10px] xs:text-xs text-muted-500 dark:text-muted-500 mt-8 sm:mt-12 font-mono">
          More projects coming soon...
        </p>
      )}

      {/* Upcoming Projects Section */}
      <div className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-muted-200 dark:border-muted-700">
        <h3 className="text-xl sm:text-2xl font-bold gradient-text font-mono text-center mb-6 sm:mb-8">
          {"< Upcoming Projects >"}
        </h3>
        <p className="text-center text-sm text-muted-600 dark:text-muted-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Exciting projects I&apos;m planning to build. These represent my passion for innovation and continuous learning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {upcomingProjects.map((project) => (
            <div
              key={project.id}
              className="game-card p-4 sm:p-5 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-[9px] xs:text-[10px] font-mono rounded bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 text-accent-700 dark:text-accent-300">
                  {project.status}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-muted-900 dark:text-muted-50 mb-2 sm:mb-3 pr-16">
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
