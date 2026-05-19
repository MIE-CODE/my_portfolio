import type { Metadata } from "next";
import { PageHeader } from "@/src/components/PageHeader";
import { ServicesCTA } from "@/src/components/ServicesCTA";
import { ServicesList } from "@/src/components/ServicesList";

export const metadata: Metadata = {
  title: "Services - CTO-Led Product & Full Stack Development",
  description:
    "Services aligned with real shipped work: Next.js and Nuxt SaaS, React and Vue enterprise UIs, payments and auth (Paystack, sessions, REST APIs), performance and analytics (GA, PostHog, HubSpot), motion (GSAP, ScrollTrigger), and technical leadership. CTO experience at Belsoft Systems, True Perk, SparkPay; founder of Blivap.",
  keywords: [
    "Next.js Development",
    "Nuxt Development",
    "React Development",
    "Vue Development",
    "TypeScript",
    "SaaS Development",
    "Fintech UX",
    "Paystack Integration",
    "Performance Optimization",
    "Analytics Integration",
    "CTO Consulting",
    "Technical Leadership",
    "ScrollTrigger",
    "GSAP",
    "Figma to Code",
  ],
};

export default function ServicesPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20"
      data-parallax-depth="0.1"
    >
      <div className="container-custom px-4">
        <PageHeader
          title="< Services >"
          description="Product-minded engineering—same muscles behind Belsoft (BelCore, BelPower), Blivap, True Perk, SparkPay, and freelance SaaS"
          description2="From architecture and CTO-style delivery to hands-on Next.js, Nuxt, and React: performance, payments, analytics, and design fidelity"
          className="mb-12 sm:mb-16"
        />
        <ServicesList />
        <ServicesCTA />
      </div>
    </main>
  );
}
