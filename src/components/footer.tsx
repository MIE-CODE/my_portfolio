"use client";
import { CallIcon, LinkdenIcon, MailIcon } from "@/src/svg";
import { useEffect, useState } from "react";
import { FlipIcons } from "../animation/flipText";
import { useGsapReveal } from "../hooks/useGsapReveal";

export const Footer = () => {
  const [year, setYear] = useState<string>("");
  const ref = useGsapReveal({
    preset: "hudRise",
    stagger: 0.12,
    duration: 0.7,
    parallax: 0.1,
    childSelector: "[data-reveal-item]",
  });

  useEffect(() => {
    const date = new Date();
    const currentYear = date?.getFullYear();
    setYear(currentYear.toString());
  }, []);
  
  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className="mt-20 py-12 bg-muted-100/95 dark:bg-muted-900/90 border-t border-muted-200/95 dark:border-muted-700 backdrop-blur-md shadow-[0_-1px_0_rgba(41,37,36,0.06)] dark:shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.35)]"
      role="contentinfo"
      data-parallax-depth="0.08"
    >
      <div className="container-custom">
        <div data-reveal-item className="flex flex-col items-center text-center gap-4 max-w-xl mx-auto opacity-0">
          <h2 className="text-xl sm:text-2xl font-bold gradient-text font-mono">
            {"< Let's Work Together >"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
            Committed to continuously staying up-to-date with industry trends
          </p>
        </div>
        
        <div data-reveal-item className="mt-6 text-center opacity-0">
          <a 
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
            href="mailto:israelvictor126@gmail.com"
            aria-label="Send email to israelvictor126@gmail.com"
          >
            israelvictor126@gmail.com
          </a>
        </div>
        
        <nav data-reveal-item className="mt-8 flex flex-col gap-4 items-center opacity-0" aria-label="Social links">
          <div className="flex items-center justify-center gap-4">
            <FlipIcons>
              <a 
                href="mailto:israelvictor126@gmail.com"
                className="touch-target rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Send email"
              >
                <div className="text-primary-600 dark:text-primary-400 [&>svg]:w-5 [&>svg]:h-5">
                  <MailIcon />
                </div>
              </a>
            </FlipIcons>
            <FlipIcons>
              <a 
                href="tel:+2349137437424"
                className="touch-target rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Call phone number"
              >
                <div className="text-primary-600 dark:text-primary-400 [&>svg]:w-5 [&>svg]:h-5">
                  <CallIcon />
                </div>
              </a>
            </FlipIcons>
            <FlipIcons>
              <a 
                href="http://www.linkedin.com/in/israelmenyaga"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Visit LinkedIn profile"
              >
                <div className="text-primary-600 dark:text-primary-400 [&>svg]:w-5 [&>svg]:h-5">
                  <LinkdenIcon />
                </div>
              </a>
            </FlipIcons>
          </div>
          <div className="pt-4 border-t border-muted-200 dark:border-muted-700 w-full">
            <p className="text-xs text-muted-500 dark:text-muted-500">© {year} MIE. All rights reserved.</p>
          </div>
        </nav>
      </div>
    </footer>
  );
};
