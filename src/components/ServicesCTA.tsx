"use client";

import { VerseMotion } from "./VerseMotion";

export function ServicesCTA() {
  return (
    <VerseMotion
      as="section"
      preset="hudPanel"
      parallax={0.18}
      className="mt-16 sm:mt-20 text-center"
    >
      <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-gradient-to-br from-white via-primary-50/90 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl sm:rounded-3xl border border-primary-200/90 dark:border-primary-800 shadow-[0_4px_28px_-6px_rgba(58,92,128,0.12)] dark:shadow-none verse-scan-border verse-hover-hud">
        <h2 className="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-6 sm:mb-8">
          Whether you need a greenfield product, a critical refactor, or leadership on stack and delivery, we can map it to something I&apos;ve already shipped at scale.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 verse-hover-hud"
          >
            Get in Touch
          </a>
          <a
            href="mailto:israelvictor126@gmail.com"
            className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 verse-hover-hud"
          >
            Send Email
          </a>
        </div>
      </div>
    </VerseMotion>
  );
}
