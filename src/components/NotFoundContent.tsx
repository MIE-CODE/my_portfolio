"use client";
import Link from "next/link";
import { useGsapReveal } from "@/src/hooks/useGsapReveal";

export function NotFoundContent() {
  const ref = useGsapReveal({
    preset: "warpIn",
    stagger: 0.15,
    duration: 0.8,
    ease: "expo.out",
  });

  return (
    <main id="main-content" className="page-shell flex items-center justify-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container-custom text-center max-w-2xl mx-auto w-full py-8 sm:py-12"
      >
        <div data-reveal-item className="mb-6 sm:mb-8 opacity-0">
          <h1 className="text-6xl xs:text-7xl sm:text-9xl md:text-[10rem] font-bold gradient-text font-mono leading-none">
            404
          </h1>
        </div>

        <div data-reveal-item className="mb-6 sm:mb-8 opacity-0">
          <h2 className="text-xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-3 sm:mb-4">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-muted-600 dark:text-muted-400 leading-relaxed max-w-md mx-auto px-2">
            Looks like you&apos;ve ventured into uncharted territory. The page
            you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div data-reveal-item className="mb-6 sm:mb-8 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 rounded-lg mb-4 sm:mb-6">
            <span className="text-2xl">🎮</span>
            <span className="text-sm font-mono text-accent-700 dark:text-accent-300">
              Level Not Found
            </span>
          </div>
        </div>

        <div
          data-reveal-item
          className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-4 max-w-sm xs:max-w-none mx-auto opacity-0"
        >
          <Link href="/" className="btn-primary text-sm w-full xs:w-auto">
            🏠 Return Home
          </Link>
          <Link href="/projects" className="btn-secondary text-sm w-full xs:w-auto">
            📁 View Projects
          </Link>
        </div>

        <div data-reveal-item className="mt-10 sm:mt-12 opacity-0">
          <p className="text-xs text-muted-500 dark:text-muted-500 mb-4 font-mono">
            QUICK LINKS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2">
            <Link
              href="/about"
              className="touch-target text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
            >
              About
            </Link>
            <span className="text-muted-400 dark:text-muted-600 hidden xs:inline">
              •
            </span>
            <Link
              href="/services"
              className="touch-target text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
            >
              Services
            </Link>
            <span className="text-muted-400 dark:text-muted-600 hidden xs:inline">
              •
            </span>
            <Link
              href="/experience"
              className="touch-target text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
            >
              Experience
            </Link>
            <span className="text-muted-400 dark:text-muted-600 hidden xs:inline">
              •
            </span>
            <Link
              href="/contact"
              className="touch-target text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
