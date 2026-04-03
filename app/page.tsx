"use client";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Stack } from "@/src/components/stack";
import { Layout } from "@/src/components/Layout";
import { XPBar } from "@/src/components/XPBar";
import { Achievements } from "@/src/components/Achievements";
import { Stats } from "@/src/components/Stats";
import { AnimatedKeyboard } from "@/src/components/AnimatedKeyboard";
import { useGSAP } from "@/src/hooks/useGSAP";
import { useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const text = useTypewriter({
    words: ["Engineer", "Architect", "CTO", "Founder", "Creator"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
  });

  const xpBarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // XP Bar animation
    if (xpBarRef.current) {
      gsap.fromTo(
        xpBarRef.current,
        { opacity: 0, y: -30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power3.out",
        }
      );
    }

    // Buttons animation
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }

    // Achievements animation
    if (achievementsRef.current) {
      gsap.fromTo(
        achievementsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <Layout>
      <main id="main-content" className="min-h-screen" role="main">
        <div className="container-custom">
          {/* Hero Section with Game UI */}
          <section 
            id="hero" 
            className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-center gap-6 sm:gap-8 pt-20 sm:pt-24 pb-8 sm:pb-1" 
            aria-label="Hero section"
          >
            {/* XP Bar */}
            <div ref={xpBarRef} className="w-full max-w-md mb-2 sm:mb-4 px-4">
              <XPBar currentXP={7500} maxXP={10000} level={15} />
            </div>

            {/* Main Title */}
            <div ref={titleRef} className="flex flex-col gap-3 sm:gap-4 max-w-3xl ">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-muted-900 dark:text-muted-50">Software </span>
                  <span className="gradient-text inline-block">
                    {text[0]}
                  </span>
                  <Cursor cursorBlinking />
                </h1>
                <p className="text-[10px] xs:text-xs sm:text-sm font-mono text-muted-600 dark:text-muted-400 tracking-wider px-2">
                  Next.js • Nuxt • React • Vue • TypeScript • Tailwind • SaaS • Payments • Leadership
                </p>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-700 dark:text-muted-300 max-w-xl mx-auto leading-relaxed px-2">
                CTO at Belsoft Systems (BelCore, BelPower), founder of Blivap, and former CTO at True Perk and SparkPay. I ship production SaaS—collaboration tools, fintech and bill pay, HR tech, and marketplaces—with strong performance, analytics, and design fidelity. Still curious about Web3 and Ethereum.
              </p>
            </div>
            
            {/* Stats */}
            <div ref={statsRef} className="w-full max-w-2xl mt-2 sm:mt-4 ">
              <Stats />
            </div>
            
            {/* Action Buttons */}
            <nav ref={buttonsRef} className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 " aria-label="Primary actions">
                <a
                  href="mailto:israelvictor126@gmail.com"
                  className="btn-primary text-sm"
                  aria-label="Send email to Menya Israel"
                >
                  📧 Contact Me
                </a>
                <a
                  href="https://docs.google.com/document/d/17Wq0_KFeW19I54rMaAtq2JQZG5jNki0BuaNH_4wRwEI/edit?usp=sharing"
                  className="btn-secondary text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume in new tab"
                >
                  📄 Resume
                </a>
            </nav>
            
            {/* Achievements */}
            <div ref={achievementsRef} className="w-full max-w-2xl mt-6 sm:mt-8 ">
              <p className="text-xs text-muted-500 dark:text-muted-500 mb-3 font-mono">ACHIEVEMENTS</p>
              <Achievements />
            </div>
            
            {/* Animated Keyboard */}
            <AnimatedKeyboard />
          </section>

          <Stack />
        </div>
      </main>
    </Layout>
  );
}
