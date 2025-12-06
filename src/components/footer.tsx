"use client";
import { CallIcon, LinkdenIcon, MailIcon } from "@/src/svg";
import { useEffect, useState } from "react";
import { FlipIcons } from "../animation/flipText";

export const Footer = () => {
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    const date = new Date();
    const currentYear = date?.getFullYear();
    setYear(currentYear.toString());
  }, []);
  
  return (
    <footer className="mt-20 py-12 bg-muted-100 dark:bg-muted-800/60 border-t border-muted-200 dark:border-muted-700" role="contentinfo">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold gradient-text font-mono">
            {"< Let's Work Together >"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
            Committed to continuously staying up-to-date with industry trends
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <a 
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
            href="mailto:israelvictor126@gmail.com"
            aria-label="Send email to israelvictor126@gmail.com"
          >
            israelvictor126@gmail.com
          </a>
        </div>
        
        <nav className="mt-8 flex flex-col gap-4 items-center" aria-label="Social links">
          <div className="flex items-center justify-center gap-4">
            <FlipIcons>
              <a 
                href="mailto:israelvictor126@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:-translate-y-0.5 transition-all duration-300"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:-translate-y-0.5 transition-all duration-300"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:-translate-y-0.5 transition-all duration-300"
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
