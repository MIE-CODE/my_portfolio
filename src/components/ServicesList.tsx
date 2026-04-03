"use client";
import {
  ReactIcon,
  NextIcon,
  TypeScriptIcon,
  Web3Icon,
  GoogleAnalyticsIcon,
  GsapIcon,
  VueIcon,
  ApiIcon,
} from "../svg";
import { useGSAP } from "../hooks/useGSAP";
import { useRef } from "react";
import gsap from "gsap";

const services = [
  {
    icon: <NextIcon />,
    title: "Next.js & product delivery",
    description:
      "End-to-end SaaS and marketing sites on the App Router—dashboards, auth, middleware, and route handlers talking to REST APIs. Grounded in shipped work: bill payments and wallets (BelPower), donor marketplace (Blivap), and many freelance production apps from Figma to deploy.",
    features: ["App Router", "Server & client components", "SEO & OG", "API integration"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <ReactIcon />,
    title: "React, TypeScript & UI systems",
    description:
      "Type-safe React with Redux Toolkit, Zustand, RHF + Zod, MUI, Radix, and Tailwind. Design-system thinking—tokens, accessibility, and maintainable component boundaries—for fintech, HR, and consumer products.",
    features: ["TypeScript", "Zustand / Redux", "RHF + Zod", "Radix & MUI"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: <VueIcon />,
    title: "Vue, Nuxt & enterprise UIs",
    description:
      "Large Nuxt 3 + Vue 3 apps with Pinia, Shadcn-nuxt, and repository-style API layers—patterns proven in employee engagement and recognition platforms (e.g. True Perk) with complex dashboards and settings.",
    features: ["Nuxt 3", "Pinia", "Shadcn / Radix Vue", "Repository pattern"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: <TypeScriptIcon />,
    title: "Performance & quality",
    description:
      "Core Web Vitals, Lighthouse, and pragmatic profiling so data-heavy and payment flows stay fast. Same bar applied across SparkPay, Blivap, BelPower, and freelance client work.",
    features: ["Core Web Vitals", "Lighthouse", "Bundle awareness", "UX polish"],
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: <GoogleAnalyticsIcon />,
    title: "Analytics & CRM",
    description:
      "Instrument products with Google Analytics, PostHog, and HubSpot where growth and ops need visibility—funnels, events, and CRM handoffs alongside solid privacy and consent habits.",
    features: ["Google Analytics", "PostHog", "HubSpot", "Event modeling"],
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <ApiIcon />,
    title: "Payments, auth & APIs",
    description:
      "Secure client patterns: httpOnly cookies, JWT refresh flows, Paystack and wallet funding, Axios/fetch layers, and admin tooling—experience from BelPower, payroll-adjacent UIs, and multi-tenant settings.",
    features: ["Paystack", "Sessions & middleware", "REST integration", "Admin surfaces"],
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: <GsapIcon />,
    title: "Motion & Figma fidelity",
    description:
      "Framer Motion and GSAP for marketing and product moments; close collaboration with design for pixel fidelity, carousels, and hero sections without sacrificing performance.",
    features: ["Framer Motion", "GSAP", "Figma to code", "Micro-interactions"],
    color: "from-green-400 to-teal-500",
  },
  {
    icon: <Web3Icon />,
    title: "Web3 & Ethereum (learning)",
    description:
      "Ongoing interest in Ethereum and Web3—exploring how wallets, contracts, and decentralized apps fit next to traditional SaaS. Open to selective projects while core delivery stays Next, Nuxt, and React.",
    features: ["Ethereum", "Exploration", "SaaS + Web3", "Selective builds"],
    color: "from-purple-500 to-pink-500",
  },
];

export const ServicesList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
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
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      {services.map((service, index) => (
        <article
          key={index}
          className="group relative p-6 sm:p-7 md:p-8 bg-gradient-to-br from-white to-muted-50/90 dark:from-muted-800/80 dark:to-muted-800/60 border-2 border-muted-200/95 dark:border-muted-700 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:border-primary-300/80 dark:hover:border-primary-600/50 hover:-translate-y-3 overflow-hidden backdrop-blur-sm shadow-[0_4px_24px_-4px_rgba(28,25,23,0.08)] dark:shadow-none"
          style={{
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Gradient border glow on hover */}
          <div 
            className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500 rounded-2xl sm:rounded-3xl -z-10`}
          />
          
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />
          
          {/* Icon with vibrant gradient background */}
          <div className="relative mb-5 sm:mb-6">
            <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} opacity-40 group-hover:opacity-60 transition-all duration-500 mb-3 shadow-xl group-hover:shadow-2xl group-hover:scale-110`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-500 rounded-xl sm:rounded-2xl`} />
              <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10 [&>svg]:drop-shadow-lg [&>svg]:brightness-110 [&>svg]:contrast-110" style={{ filter: 'brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                {service.icon}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:scale-105 inline-block`}>
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-5 sm:mb-6 leading-relaxed">
              {service.description}
            </p>
            
            {/* Features */}
            <ul className="flex flex-wrap gap-2 mb-4">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 text-white border border-white/20 group-hover:border-white/40 backdrop-blur-sm group-hover:scale-105`}
                >
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Link */}
            <a
              href="/contact"
              className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 bg-gradient-to-r ${service.color} bg-clip-text text-transparent hover:scale-105`}
            >
              <span>Get Started</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};
