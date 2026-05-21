"use client";

import type { ReactNode } from "react";
import {
  GsapIcon,
  NextIcon,
  PostHogIcon,
  ReactIcon,
  TypeScriptIcon,
  VueIcon,
  Web3Icon,
} from "../svg";
import { NodeIcon, PaystackIcon } from "../svg/techIcons";
import { ServiceStackIcon } from "./ServiceStackIcon";
import { useServicesCardMotion } from "../hooks/useServicesCardMotion";

type ServiceEntry = {
  icon: () => ReactNode;
  title: string;
  description: string;
  features: string[];
};

const services: ServiceEntry[] = [
  {
    icon: NextIcon,
    title: "Next.js & product delivery",
    description:
      "End-to-end SaaS and marketing sites on the App Router—dashboards, auth, middleware, and route handlers. Shipped bill payments, marketplaces, and freelance apps from Figma to deploy.",
    features: ["App Router", "Server components", "SEO & OG", "API integration"],
  },
  {
    icon: ReactIcon,
    title: "React, TypeScript & UI systems",
    description:
      "Type-safe React with Redux, Zustand, RHF + Zod, MUI, Radix, and Tailwind—tokens, accessibility, and maintainable boundaries for fintech, HR, and consumer products.",
    features: ["TypeScript", "Zustand / Redux", "RHF + Zod", "Radix & MUI"],
  },
  {
    icon: VueIcon,
    title: "Vue, Nuxt & enterprise UIs",
    description:
      "Nuxt 3 + Vue 3 with Pinia and layered API patterns—dashboards and settings at scale, proven on employee engagement and recognition platforms.",
    features: ["Nuxt 3", "Pinia", "Shadcn Vue", "Repository pattern"],
  },
  {
    icon: TypeScriptIcon,
    title: "Performance & quality",
    description:
      "Core Web Vitals, Lighthouse, and pragmatic profiling so payment and data-heavy flows stay fast across production client work.",
    features: ["Core Web Vitals", "Lighthouse", "Bundle awareness", "UX polish"],
  },
  {
    icon: PostHogIcon,
    title: "Analytics & CRM",
    description:
      "Google Analytics, PostHog, and HubSpot where growth needs visibility—funnels, events, and CRM handoffs with sensible consent habits.",
    features: ["Google Analytics", "PostHog", "HubSpot", "Event modeling"],
  },
  {
    icon: NodeIcon,
    title: "Node.js backends & APIs",
    description:
      "NestJS and Express services—httpOnly sessions, JWT refresh, REST and GraphQL, queues, and admin tooling from fintech and multi-tenant products.",
    features: ["Node.js", "NestJS", "Express", "Prisma / SQL"],
  },
  {
    icon: PaystackIcon,
    title: "Payments & wallets",
    description:
      "Paystack, Stripe-style flows, and wallet UX—checkout, webhooks, reconciliation, and secure session patterns from live bill-payment products.",
    features: ["Paystack", "Webhooks", "Sessions", "Wallet UX"],
  },
  {
    icon: GsapIcon,
    title: "Motion & Figma fidelity",
    description:
      "GSAP and ScrollTrigger for product and marketing motion—hero sections and micro-interactions without sacrificing performance.",
    features: ["GSAP", "ScrollTrigger", "Figma to code", "Micro-interactions"],
  },
  {
    icon: Web3Icon,
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
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
    >
      {services.map((service, index) => (
        <article
          key={service.title}
          data-service-card
          className="service-card group relative flex flex-col"
        >
          <div className="service-card__surface panel-surface relative flex h-full flex-col overflow-hidden p-5 sm:p-7 transition-[border-color,box-shadow] duration-300 group-hover:border-primary-400/45 dark:group-hover:border-primary-500/40">
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
              <ServiceStackIcon icon={service.icon} label={service.title} />
            </header>

            <h3
              data-service-part
              className="mb-2.5 text-base sm:text-lg font-semibold tracking-tight text-muted-900 dark:text-muted-50 md:text-xl"
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
