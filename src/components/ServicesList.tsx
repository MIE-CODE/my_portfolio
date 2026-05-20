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
import { useServicesCardMotion } from "../hooks/useServicesCardMotion";

const services = [
  {
    icon: <NextIcon />,
    title: "Next.js & product delivery",
    description:
      "End-to-end SaaS and marketing sites on the App Router—dashboards, auth, middleware, and route handlers. Shipped bill payments, marketplaces, and freelance apps from Figma to deploy.",
    features: ["App Router", "Server components", "SEO & OG", "API integration"],
  },
  {
    icon: <ReactIcon />,
    title: "React, TypeScript & UI systems",
    description:
      "Type-safe React with Redux, Zustand, RHF + Zod, MUI, Radix, and Tailwind—tokens, accessibility, and maintainable boundaries for fintech, HR, and consumer products.",
    features: ["TypeScript", "Zustand / Redux", "RHF + Zod", "Radix & MUI"],
  },
  {
    icon: <VueIcon />,
    title: "Vue, Nuxt & enterprise UIs",
    description:
      "Nuxt 3 + Vue 3 with Pinia and layered API patterns—dashboards and settings at scale, proven on employee engagement and recognition platforms.",
    features: ["Nuxt 3", "Pinia", "Shadcn Vue", "Repository pattern"],
  },
  {
    icon: <TypeScriptIcon />,
    title: "Performance & quality",
    description:
      "Core Web Vitals, Lighthouse, and pragmatic profiling so payment and data-heavy flows stay fast across production client work.",
    features: ["Core Web Vitals", "Lighthouse", "Bundle awareness", "UX polish"],
  },
  {
    icon: <GoogleAnalyticsIcon />,
    title: "Analytics & CRM",
    description:
      "Google Analytics, PostHog, and HubSpot where growth needs visibility—funnels, events, and CRM handoffs with sensible consent habits.",
    features: ["Google Analytics", "PostHog", "HubSpot", "Event modeling"],
  },
  {
    icon: <ApiIcon />,
    title: "Payments, auth & APIs",
    description:
      "httpOnly sessions, JWT refresh, Paystack and wallet flows, Axios layers, and admin tooling from fintech and multi-tenant products.",
    features: ["Paystack", "Sessions", "REST integration", "Admin surfaces"],
  },
  {
    icon: <GsapIcon />,
    title: "Motion & Figma fidelity",
    description:
      "GSAP and ScrollTrigger for product and marketing motion—hero sections and micro-interactions without sacrificing performance.",
    features: ["GSAP", "ScrollTrigger", "Figma to code", "Micro-interactions"],
  },
  {
    icon: <Web3Icon />,
    title: "Web3 & Ethereum",
    description:
      "Exploring wallets, contracts, and dApps alongside traditional SaaS—selective projects while core delivery stays Next, Nuxt, and React.",
    features: ["Ethereum", "Exploration", "SaaS + Web3", "Selective builds"],
  },
];

export const ServicesList = () => {
  const containerRef = useServicesCardMotion();

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
    >
      {services.map((service, index) => (
        <article
          key={service.title}
          data-service-card
          className="service-card group relative flex flex-col will-change-transform"
        >
          <div className="service-card__surface panel-surface relative flex h-full flex-col overflow-hidden p-6 sm:p-7 transition-[border-color,box-shadow] duration-300 group-hover:border-primary-400/45 dark:group-hover:border-primary-500/40">
            <div
              className="service-card__accent pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary-500/80 via-primary-400/50 to-transparent"
              aria-hidden
            />

            <header
              data-service-part
              className="mb-4 flex items-start justify-between gap-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-400 dark:text-muted-500 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                data-service-icon
                data-service-part
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary-200/70 bg-primary-50/90 text-primary-600 dark:border-primary-700/50 dark:bg-primary-950/50 dark:text-primary-300 [&_svg]:h-5 [&_svg]:w-5"
                aria-hidden
              >
                {service.icon}
              </div>
            </header>

            <h3
              data-service-part
              className="mb-2.5 text-lg font-semibold tracking-tight text-muted-900 dark:text-muted-50 sm:text-xl"
            >
              {service.title}
            </h3>

            <p
              data-service-part
              className="mb-5 flex-1 text-sm leading-relaxed text-muted-600 dark:text-muted-300"
            >
              {service.description}
            </p>

            <ul
              className="flex flex-wrap gap-1.5"
              aria-label={`${service.title} capabilities`}
            >
              {service.features.map((feature) => (
                <li
                  key={feature}
                  data-service-tag
                  className="rounded-md border border-muted-300/70 bg-muted-50/90 px-2 py-1 font-mono text-[10px] text-muted-600 dark:border-muted-600/55 dark:bg-muted-800/35 dark:text-muted-400 sm:text-[11px]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
};
