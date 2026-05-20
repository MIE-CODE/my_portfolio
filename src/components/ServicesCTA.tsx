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
      <div className="panel-surface max-w-2xl mx-auto p-8 sm:p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400 mb-3">
          Next step
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-3">
          Ready to start?
        </h2>
        <p className="text-sm sm:text-base text-muted-600 dark:text-muted-300 mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
          Greenfield product, critical refactor, or stack leadership—we can map it to work already shipped at scale.
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
