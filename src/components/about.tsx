"use client";

import { usePathname } from "next/navigation";
import { Avatar3D } from "./Avatar3D";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { getSectionPreset } from "@/src/config/verseMotion";

export const About = () => {
  const pathname = usePathname();
  const sectionPreset = getSectionPreset(pathname);

  const cardsRef = useGsapReveal({
    preset: sectionPreset,
    stagger: 0.1,
    duration: 0.75,
    ease: "expo.out",
  });

  const avatarRef = useGsapReveal({
    preset: "orbitIn",
    duration: 0.85,
    ease: "power3.out",
  });

  const infos = [
    {
      title: "CTO & product engineer",
      desc: "CTO at Belsoft Systems (BelCore, BelPower); founder of Blivap; former CTO at True Perk and SparkPay. I lead and ship full-stack products—collaboration (Slack-style), fintech and bill pay, HR and engagement, and marketplaces—using Next.js, Nuxt, Vue, React, and TypeScript.",
      icon: "💻",
    },
    {
      title: "Performance & analytics",
      desc: "Core Web Vitals, Lighthouse, and pragmatic tuning on data-heavy dashboards and payment flows. Comfortable wiring Google Analytics, PostHog, and HubSpot where product and growth need visibility.",
      icon: "📊",
    },
    {
      title: "Motion & design fidelity",
      desc: "GSAP and ScrollTrigger for marketing and product motion; close work with design for pixel-accurate layouts, responsive behavior, and animations that stay performant.",
      icon: "🎨",
    },
    {
      title: "Web3 & Ethereum (learning)",
      desc: "Interested in how wallets, contracts, and decentralized apps complement traditional SaaS—exploring Ethereum and the wider ecosystem alongside core delivery on Next, Nuxt, and React.",
      icon: "⛓️",
    },
    {
      title: "Freelance & content stacks",
      desc: "Production sites from Figma to deploy for clients; headless CMS experience (Sanity, Contentful) where content teams need flexible, API-driven workflows.",
      icon: "📝",
    },
    {
      title: "Security & quality",
      desc: "Security-minded development—auth patterns, sessions, payment flows—and disciplined QA so releases stay reliable for users and stakeholders.",
      icon: "🔒",
    },
  ];

  return (
    <section
      id="about"
      className="section-padding scroll-mt-24"
      aria-label="About details"
    >
      <div
        id="aboutsec"
        className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-6xl mx-auto relative"
      >
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="flex-1 flex flex-col gap-4 z-10"
        >
          {infos.map((info, i) => (
            <article
              key={info.title}
              data-reveal-item
              className="game-card verse-hover-hud verse-scan-border p-4 hover:border-primary-400 dark:hover:border-primary-600 transition-colors duration-300 opacity-0"
            >
              {i === 0 && (
                <h2 className="text-lg sm:text-xl font-bold text-muted-900 dark:text-muted-50 mb-3">
                  I&apos;m Menyaga Israel:
                </h2>
              )}
              <div className="flex gap-3 items-start">
                <div className="text-2xl flex-shrink-0">{info.icon}</div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-1.5">
                    {info.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-700 dark:text-muted-300 leading-relaxed">
                    {info.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          ref={avatarRef as React.RefObject<HTMLDivElement>}
          data-reveal-item
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] max-w-xs md:max-w-sm flex-shrink-0 z-10 relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10 dark:shadow-primary-500/20 border border-muted-200 dark:border-muted-700 opacity-0"
        >
          <Avatar3D />
        </div>
      </div>
    </section>
  );
};
