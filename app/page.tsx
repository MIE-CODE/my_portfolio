"use client";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Stack } from "@/src/components/stack";
import { XPBar } from "@/src/components/XPBar";
import { Achievements } from "@/src/components/Achievements";
import { Stats } from "@/src/components/Stats";
import { AnimatedKeyboard } from "@/src/components/AnimatedKeyboard";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { runVerseHeroEnter } from "@/src/lib/verseHeroMotion";

export default function Home() {
  const text = useTypewriter({
    words: ["Engineer", "Architect", "CTO", "Founder", "Creator"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
  });

  const scopeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root.querySelectorAll("[data-hero-xp], [data-hero-title], [data-hero-stats], [data-hero-achievements], [data-hero-keyboard], [data-hero-actions] > *, [data-hero-stat], [data-hero-badge], #skills [data-stack-item]"), {
        opacity: 1,
        clearProps: "transform,filter",
      });
      return;
    }

    const ctx = gsap.context(() => runVerseHeroEnter(root), root);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={scopeRef}
      id="main-content"
      className="relative min-h-screen overflow-x-hidden"
      role="main"
      data-motion-home
    >
      <div className="container-custom">
        <section
          id="hero"
          className="relative min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-center gap-6 sm:gap-8 pt-20 sm:pt-24 pb-8 sm:pb-1"
          aria-label="Hero section"
        >
          <div data-hero-xp className="w-full max-w-md mb-2 sm:mb-4 px-4 opacity-0">
            <XPBar currentXP={7500} maxXP={10000} level={15} />
          </div>

          <div
            data-hero-title
            className="flex flex-col gap-3 sm:gap-4 max-w-3xl rounded-2xl border border-primary-200/40 bg-muted-100/95 px-3 py-2 backdrop-blur-md dark:border-white/12 dark:bg-muted-900/90 verse-scan-border shadow-[0_8px_32px_-8px_rgba(28,25,23,0.12)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-muted-900 dark:text-muted-50">
                  Software{" "}
                </span>
                <span className="gradient-text inline-block">
                  {text[0]}
                </span>
                <Cursor cursorBlinking />
              </h1>
              <p className="text-[10px] xs:text-xs sm:text-sm font-mono text-muted-600 dark:text-muted-400 tracking-wider px-2">
                Next.js • Nuxt • React • Vue • TypeScript • Tailwind • SaaS •
                Payments • Leadership
              </p>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-muted-700 dark:text-muted-300 max-w-6xl mx-auto leading-relaxed px-2">
              Senior Software Engineer with 5+ years of experience building
              scalable web applications, leading engineering teams, and
              delivering production-grade systems across fintech,
              healthcare, and AI-powered platforms.
            </p>
          </div>

          <div data-hero-stats className="w-full max-w-2xl mt-2 sm:mt-4">
            <Stats variant="hero" />
          </div>

          <nav
            data-hero-actions
            className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6"
            aria-label="Primary actions"
          >
            <a
              href="mailto:israelvictor126@gmail.com"
              className="btn-primary text-sm verse-hover-hud opacity-0"
              aria-label="Send email to Menya Israel"
            >
              📧 Contact Me
            </a>
            <a
              href="https://docs.google.com/document/d/17Wq0_KFeW19I54rMaAtq2JQZG5jNki0BuaNH_4wRwEI/edit?usp=sharing"
              className="btn-secondary text-sm verse-hover-hud opacity-0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume in new tab"
            >
              📄 Resume
            </a>
          </nav>

          <div data-hero-achievements className="w-full max-w-2xl mt-6 sm:mt-8">
            <p className="text-xs text-muted-500 dark:text-muted-500 mb-3 font-mono">
              ACHIEVEMENTS
            </p>
            <Achievements variant="hero" />
          </div>

          <div data-hero-keyboard className="w-full">
            <AnimatedKeyboard suppressEntrance />
          </div>
        </section>

        <Stack variant="home" />
      </div>
    </main>
  );
}
