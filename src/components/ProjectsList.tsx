"use client";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { StaticImageData } from "next/image";

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
    description: "AI-driven employee recognition and rewards platform with real-time analytics and seamless reward redemption.",
    link: "https://app.trueperk.co/",
    githubLink: "#",
    category: "Frontend",
  },
  {
    id: 2,
    img: require("../images/sparkpay.png"),
    skills: ["Next.js", "React", "TypeScript", "SCSS"],
    title: "SparkPay",
    description: "Payroll software as a service solution with intuitive UI for processing and managing payrolls efficiently.",
    link: "https://www.sparkpayhq.com/",
    githubLink: "#",
    category: "Frontend",
  },
  {
    id: 3,
    img: require("../images/flyverge.png"),
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    title: "Flyverge",
    description: "Seamless flight booking application with real-time updates, smooth user experience, and responsive design.",
    link: "https://flyverge.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/flyverge",
    category: "Frontend",
  },
  {
    id: 4,
    img: require("../images/ecommerce.png"),
    skills: ["React", "Tailwind CSS", "Framer Motion"],
    title: "E-commerce Platform",
    description: "Modern e-commerce application with efficient state management, responsive design, and smooth animations.",
    link: "https://e-commerce-site-five-psi.vercel.app/",
    githubLink: "#",
    category: "Frontend",
  },
  {
    id: 5,
    img: require("../images/todoapp.png"),
    skills: ["Vue.js", "JavaScript", "Tailwind CSS"],
    title: "Todo App",
    description: "Interactive todo application built with Vue.js, featuring reactive components and optimized performance.",
    link: "https://todo-app-vuejs-chi.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/Todo-App-vuejs",
    category: "Frontend",
  },
  {
    id: 6,
    img: require("../images/currenttime.png"),
    skills: ["JavaScript", "HTML", "CSS"],
    title: "Current Time",
    description: "Real-time clock application with multiple timezone support and modern UI design.",
    link: "https://current-time-five.vercel.app/",
    githubLink: "https://github.com/MIE-CODE/current-time",
    category: "Frontend",
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
    id: 7,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "REST API"],
    title: "E-commerce API",
    description: "RESTful API for e-commerce platform with authentication, payment processing, and order management.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 8,
    img: require("../images/ecommerce.png"),
    skills: ["NestJS", "PostgreSQL", "TypeScript", "GraphQL"],
    title: "Task Management API",
    description: "Scalable task management system with GraphQL API, real-time updates, and advanced filtering.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
  {
    id: 9,
    img: require("../images/ecommerce.png"),
    skills: ["Node.js", "Express.js", "MongoDB", "JWT"],
    title: "Authentication Service",
    description: "Secure authentication microservice with JWT tokens, OAuth integration, and role-based access control.",
    link: "#",
    githubLink: "#",
    category: "Backend",
  },
];

export const ProjectsList = () => {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");

  return (
    <div>
      {/* Tab Selector */}
      <div className="flex items-center justify-center gap-3 bg-muted-100 dark:bg-muted-800/60 p-1.5 rounded-lg border border-muted-200 dark:border-muted-700 w-fit mx-auto mb-10">
        <button
          className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ${
            activeTab === "frontend"
              ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/20"
              : "bg-transparent text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-50"
          }`}
          onClick={() => setActiveTab("frontend")}
        >
          🎨 Frontend
        </button>
        <button
          className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ${
            activeTab === "backend"
              ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/20"
              : "bg-transparent text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-50"
          }`}
          onClick={() => setActiveTab("backend")}
        >
          ⚙️ Backend
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
        {activeTab === "frontend"
          ? frontendProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          : backendProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
      </div>

      {/* Info Text */}
      <p className="text-center text-xs text-muted-500 dark:text-muted-500 mt-12 font-mono animate-fade-in">
        More projects coming soon...
      </p>
    </div>
  );
};
