"use client";

import Link from "next/link";
import { AboutTechStackCollapsible } from "@/src/components/AboutTechStackCollapsible";
import { useAboutPageMotion } from "@/src/hooks/useAboutPageMotion";

const CV_HREF = "/cv/Israel_menyaga_cv.pdf";
const CV_FILENAME = "Israel_menyaga_cv.pdf";

/** Work history dates and titles aligned with Israel_menyaga_cv.pdf */
const PRIMARY_ROLE = "Senior Software Engineer";
const CURRENT_ROLE = "CTO (Technical Leadership) · Belsoft Systems";

const roles = [
  {
    period: "Jan 2026 — Present",
    title: "CTO (Technical Leadership)",
    org: "Belsoft Systems",
    detail:
      "Engineering strategy and delivery across BelCore, BelPower bill payments, and BelAI—architecture, team mentorship, and production releases.",
  },
  {
    period: "Feb 2025 — Present",
    title: "Senior Frontend Engineer (Nuxt.js)",
    org: "True Perk",
    detail:
      "Nuxt.js apps with AI-assisted recognition cards, milestone tracking, and engagement experiences—scalable, maintainable frontend systems.",
  },
  {
    period: "Oct 2023 — Jan 2025",
    title: "Senior Frontend Engineer (Next.js)",
    org: "SparkPay",
    detail:
      "Payroll and financial monitoring platforms on Next.js, TypeScript, and Sass—performance, reusable components, and production-ready UX.",
  },
  {
    period: "Mar 2021 — Aug 2023",
    title: "Senior Software Engineer",
    org: "Blivap",
    detail:
      "Full-stack healthcare platform (Next.js, NestJS): donor–recipient matching, secure APIs, verification workflows, and production infrastructure.",
  },
];

const focusAreas = [
  {
    label: "Leadership & delivery",
    body: "Technical leadership when needed: architecture, team alignment, releases, and clear stakeholder communication across products.",
  },
  {
    label: "Performance & quality",
    body: "Lighthouse and Core Web Vitals, pragmatic tuning on dashboards and payment flows, disciplined QA.",
  },
  {
    label: "Motion & UX craft",
    body: "GSAP and ScrollTrigger for product and marketing surfaces where motion must stay smooth on real devices.",
  },
];

const education = [
  {
    period: "2021 — 2025",
    title: "BSc(Ed) Mathematics",
    org: "Prince Abubakar Audu University",
    detail:
      "Mathematics and education—analytical foundation alongside engineering practice.",
  },
];

export function AboutPageContent() {
  const motionRef = useAboutPageMotion();

  return (
    <div
      ref={motionRef}
      className="about-dossier max-w-5xl mx-auto pb-6 sm:pb-8"
    >
      <div
        data-about-hero-section
        className="about-dossier__hero mb-8 sm:mb-16 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10 items-end border-b border-muted-200/80 dark:border-muted-700/80 pb-6 sm:pb-10"
      >
        <div data-about-hero="identity" className="lg:col-span-5 opacity-0">
          <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.28em] text-primary-600 dark:text-primary-400 mb-4">
            Résumé on file · Also known as MIE
          </p>
          <h1 className="text-2xl xs:text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-muted-900 dark:text-muted-50 leading-[1.05] sm:leading-[0.95]">
            Israel Enyo Menyaga
            <span className="block text-primary-600 dark:text-primary-400 text-2xl sm:text-3xl font-mono mt-2">
              (MIE)
            </span>
          </h1>
          <p className="mt-3 text-sm text-muted-600 dark:text-muted-400">
            <a
              href="https://github.com/MIE-CODE"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              MIE-CODE on GitHub
            </a>
            {" · "}
            Founder of{" "}
            <a
              href="https://blivap.com"
              rel="me noopener noreferrer"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              Blivap
            </a>
          </p>
          <p className="mt-4 text-base sm:text-lg font-medium text-primary-700 dark:text-primary-300">
            {PRIMARY_ROLE}
          </p>
          <p className="mt-1 text-sm text-muted-500 dark:text-muted-400">
            {CURRENT_ROLE}
          </p>
          <p className="mt-6">
            <a
              href={CV_HREF}
              download={CV_FILENAME}
              className="touch-target inline-flex items-center justify-center gap-2 rounded-lg border border-primary-500/50 bg-primary-50/80 px-4 py-2.5 text-sm font-medium text-primary-800 hover:bg-primary-100/90 dark:border-primary-400/40 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-900/50 transition-colors"
            >
              Download CV (PDF)
            </a>
          </p>
        </div>
        <div data-about-hero="bio" className="lg:col-span-7 opacity-0">
          <p className="text-base sm:text-lg text-muted-600 dark:text-muted-300 leading-relaxed max-w-xl lg:max-w-none">
            I help teams and founders turn ideas into products people actually
            use—from first UI and API design through launch, payments,
            analytics, and the performance work that keeps things fast in the
            real world. If you need a hands-on engineer who can own a feature, a
            product slice, or a full stack build, I work in{" "}
            <span className="text-muted-900 dark:text-muted-100 font-medium">
              Next.js, Nuxt, React, Vue, and TypeScript
            </span>
            , and I care about clear communication, reliable delivery, and code
            that your team can live with after I hand it over.
          </p>
          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-[11px] sm:text-xs">
            <div>
              <dt className="text-muted-500 dark:text-muted-500 uppercase tracking-wider mb-1">
                Title
              </dt>
              <dd className="text-muted-800 dark:text-muted-200">
                {PRIMARY_ROLE}
              </dd>
            </div>
            <div>
              <dt className="text-muted-500 dark:text-muted-500 uppercase tracking-wider mb-1">
                Focus
              </dt>
              <dd className="text-muted-800 dark:text-muted-200">
                SaaS · fintech
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-muted-500 dark:text-muted-500 uppercase tracking-wider mb-1">
                Open to
              </dt>
              <dd className="text-muted-800 dark:text-muted-200">
                Select freelance
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 mb-16 sm:mb-20">
        <section
          data-about-timeline
          className="lg:col-span-7"
          aria-labelledby="about-timeline-heading"
        >
          <h3
            id="about-timeline-heading"
            data-about-timeline-head
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 mb-8 opacity-0"
          >
            Experience
          </h3>
          <ol className="space-y-10">
            {roles.map((r) => (
              <li
                key={`${r.org}-${r.period}`}
                data-about-role
                className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-10 opacity-0"
              >
                <time className="font-mono text-xs text-primary-600 dark:text-primary-400 tabular-nums shrink-0 sm:w-28 sm:text-right pt-1">
                  {r.period}
                </time>
                <div className="sm:flex-1 sm:border-l sm:border-primary-500/20 dark:sm:border-primary-400/20 sm:pl-8 min-w-0">
                  <p className="text-lg font-semibold text-muted-900 dark:text-muted-50">
                    {r.title}
                  </p>
                  <p className="text-sm font-medium text-muted-500 dark:text-muted-400">
                    {r.org}
                  </p>
                  <p className="mt-2 text-sm text-muted-600 dark:text-muted-300 leading-relaxed max-w-prose">
                    {r.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside data-about-aside className="lg:col-span-5 space-y-10">
          <section aria-labelledby="about-education-heading">
            <h3
              id="about-education-heading"
              data-about-aside-head
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 mb-5 opacity-0"
            >
              Education
            </h3>
            <ul className="space-y-6">
              {education.map((e) => (
                <li
                  key={e.title}
                  data-about-panel
                  className="panel-surface px-4 py-4 sm:px-5 opacity-0"
                >
                  <p className="font-mono text-xs text-primary-600 dark:text-primary-400">
                    {e.period}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-muted-900 dark:text-muted-100">
                    {e.title}
                  </p>
                  <p className="text-xs font-medium text-muted-500 dark:text-muted-400">
                    {e.org}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
                    {e.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-focus-heading">
            <h3
              id="about-focus-heading"
              data-about-aside-head
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 mb-5 opacity-0"
            >
              Strengths
            </h3>
            <ul className="space-y-6">
              {focusAreas.map((f) => (
                <li
                  key={f.label}
                  data-about-panel
                  className="panel-surface px-4 py-4 sm:px-5 opacity-0"
                >
                  <p className="text-sm font-semibold text-muted-900 dark:text-muted-100">
                    {f.label}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <AboutTechStackCollapsible />

          <div
            data-about-callout
            className="rounded-xl border border-primary-300/40 dark:border-primary-600/30 bg-primary-50/30 dark:bg-primary-950/20 px-5 py-5 opacity-0"
          >
            <p className="text-sm text-muted-700 dark:text-muted-300 leading-relaxed">
              Exploring how wallets, contracts, and decentralized apps
              complement traditional SaaS—alongside core delivery on Next, Nuxt,
              and React.
            </p>
          </div>
        </aside>
      </div>

      <footer
        data-about-footer
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-muted-200/80 dark:border-muted-700/80 opacity-0"
      >
        <p className="text-sm text-muted-500 dark:text-muted-400">
          Full timeline and detail: use the PDF or browse projects.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={CV_HREF}
            download={CV_FILENAME}
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
          >
            Download CV
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg border border-muted-300 dark:border-muted-600 px-4 py-2.5 text-sm font-medium text-muted-800 dark:text-muted-200 hover:border-primary-400 dark:hover:border-primary-500 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-muted-300 dark:border-muted-600 px-4 py-2.5 text-sm font-medium text-muted-800 dark:text-muted-200 hover:border-primary-400 dark:hover:border-primary-500 transition-colors"
          >
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
