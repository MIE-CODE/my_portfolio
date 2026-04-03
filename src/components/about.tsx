"use client";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Avatar3D } from "./Avatar3D";

export const About = () => {
  const { ref, isVisible } = useIntersectionObserver();

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
      desc: "Framer Motion and GSAP for marketing and product; close work with design for pixel-accurate layouts, responsive behavior, and animations that stay performant.",
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
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
        <h2
          id="about-heading"
          className={`text-2xl sm:text-3xl font-bold gradient-text font-mono ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {"< About Me >"}
        </h2>
        <p className="text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
          I build and lead production SaaS: currently CTO at Belsoft Systems, founder of Blivap, and still taking selective freelance work. Stack-wise I live in Next.js and Nuxt, React and Vue, TypeScript and Tailwind—with payments, analytics, and performance baked in from day one.
        </p>
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        id="aboutsec"
        className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-6xl mx-auto px-4 relative"
      >
        <div className="flex-1 flex flex-col gap-4 z-10">
          {infos.map((info, i) => (
            <article
              key={i}
              className={`game-card p-4 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 ${
                isVisible ? `animate-fade-in-up opacity-100` : "opacity-0"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {i === 0 && (
                <h3 className="text-lg sm:text-xl font-bold text-muted-900 dark:text-muted-50 mb-3">
                  I&apos;m Menyaga Israel:
                </h3>
              )}
              <div className="flex gap-3 items-start">
                <div className="text-2xl flex-shrink-0">{info.icon}</div>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-1.5">
                    {info.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-700 dark:text-muted-300 leading-relaxed">
                    {info.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] max-w-xs md:max-w-sm flex-shrink-0 z-10 relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10 dark:shadow-primary-500/20 border border-muted-200 dark:border-muted-700 ${
            isVisible ? `animate-scale-in opacity-100` : "opacity-0"
          }`}
          style={{
            animationDelay: "0.3s",
          }}
        >
          <Avatar3D />
        </div>
      </div>
    </section>
  );
};
