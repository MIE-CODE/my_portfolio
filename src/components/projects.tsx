"use client";
import { useState } from "react";
import { Card } from "./card";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Projects = () => {
  const [apps, setApps] = useState(false);
  const { ref, isVisible } = useIntersectionObserver();

  const appsData = [
    {
      img: require("../images/ecommerce.png"),
      skills: ["flutter", "Dart"],
      title: "E-commerce App",
      description: "Mobile e-commerce application with Flutter",
      link: "download",
      githubLink: "github",
    },
    {
      img: require("../images/ecommerce.png"),
      skills: ["flutter", "Dart"],
      title: "Coffee Maker",
      description: "Smart coffee maker control app",
      link: "",
      githubLink: "",
    },
    {
      img: require("../images/ecommerce.png"),
      skills: ["flutter", "Dart"],
      title: "Geo Time App",
      description: "Time zone tracking application",
      link: "",
      githubLink: "",
    },
  ];
  
  const websitesData = [
    {
      img: require("../images/trueperk.png"),
      skills: ["Nuxtjs", "Vuejs", "TypeScript", "Tailwindcss"],
      title: "Trueperk",
      description: "AI-driven employee recognition and rewards platform",
      link: "https://app.trueperk.co/",
      githubLink: "#",
    },
    {
      img: require("../images/sparkpay.png"),
      skills: ["Nextjs", "React", "TypeScript"],
      title: "SparkPay",
      description: "Payroll software as a service solution",
      link: "https://www.sparkpayhq.com/",
      githubLink: "#",
    },
    {
      img: require("../images/flyverge.png"),
      skills: ["Nextjs", "React", "TypeScript"],
      title: "Flyverge",
      description: "Seamless flight booking app with real-time updates",
      link: "https://flyverge.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/flyverge",
    },
    {
      img: require("../images/ecommerce.png"),
      skills: ["Reactjs", "Tailwindcss"],
      title: "E-commerce",
      description: "Modern e-commerce application with React and Tailwind CSS",
      link: "https://e-commerce-site-five-psi.vercel.app/",
      githubLink: "github",
    },
    {
      img: require("../images/todoapp.png"),
      skills: ["Vuejs", "Javascript"],
      title: "Todo App",
      description: "Interactive todo application built with Vue.js",
      link: "https://todo-app-vuejs-chi.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/Todo-App-vuejs",
    },
    {
      img: require("../images/currenttime.png"),
      skills: ["Javascript", "HTML", "CSS"],
      title: "Current Time",
      description: "Real-time clock application",
      link: "https://current-time-five.vercel.app/",
      githubLink: "https://github.com/MIE-CODE/current-time",
    },
  ];

  return (
    <section id="project" className="section-padding scroll-mt-24" aria-labelledby="projects-heading">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col gap-6 max-w-3xl mx-auto mb-10">
        <h2
          id="projects-heading"
          className={`text-2xl sm:text-3xl font-bold gradient-text font-mono text-center ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
        >
          {"< Projects >"}
        </h2>
        <p className="text-sm text-muted-600 dark:text-muted-400 text-center">
          Showcasing innovative web and mobile applications
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-3 bg-muted-100 dark:bg-muted-800/60 p-1.5 rounded-lg border border-muted-200 dark:border-muted-700 w-fit mx-auto mb-8">
        <button
          className={`px-5 py-2 rounded-md font-medium text-xs transition-all duration-300 ${
            apps
              ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/20"
              : "bg-transparent text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-50"
          }`}
          onClick={() => setApps(true)}
        >
          📱 Apps
        </button>
        <button
          className={`px-5 py-2 rounded-md font-medium text-xs transition-all duration-300 ${
            !apps
              ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/20"
              : "bg-transparent text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-50"
          }`}
          onClick={() => setApps(false)}
        >
          🌐 Websites
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
        {apps
          ? appsData.map((item, i) => (
              <Card app appsData={item} index={i} key={i} />
            ))
          : websitesData.map((web, i) => (
              <Card appsData={web} index={i} key={i} />
            ))}
      </div>
    </section>
  );
};
