"use client";

import { VerseMotion } from "./VerseMotion";

export function ServicesCTA() {
  return (
    <VerseMotion
      as="section"
      preset="hudPanel"
      parallax={0}
      className="mt-12 sm:mt-20 text-center"
    >
      <div className="panel-surface max-w-2xl mx-auto p-6 sm:p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400 mb-3">
          Next step
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-3">
          Ready to start?
        </h2>
        <p className="text-sm sm:text-base text-muted-600 dark:text-muted-300 mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
          Greenfield product, critical refactor, or stack leadership—we can map it to work already shipped at scale.
        </p>
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-4">
          <a
            href="/contact"
            className="btn-primary w-full xs:w-auto verse-hover-hud"
          >
            Get in Touch
          </a>
          <a
            href="mailto:israelmenyaga@gmail.com"
            className="btn-secondary w-full xs:w-auto verse-hover-hud"
          >
            Send Email
          </a>
        </div>
      </div>
    </VerseMotion>
  );
}
