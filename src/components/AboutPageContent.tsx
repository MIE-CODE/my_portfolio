import Link from "next/link";

const roles = [
  {
    period: "2026 —",
    title: "Chief Technology Officer",
    org: "Belsoft Systems",
    detail:
      "BelCore workspace client and BelPower utility billing—Next.js, TypeScript, Redux, Paystack, sessions.",
  },
  {
    period: "2025 —",
    title: "Founder",
    org: "Blivap",
    detail:
      "Donor marketplace for Nigeria: Next.js App Router, MUI, Redux, cookie-backed API, SEO and @vercel/og.",
  },
  {
    period: "2024 —",
    title: "Full stack (freelance)",
    org: "Independent",
    detail:
      "Figma-to-ship web apps, headless CMS, analytics, and performance work for client products.",
  },
  {
    period: "2022 — 2024",
    title: "Chief Technology Officer",
    org: "True Perk",
    detail: "Nuxt 3, Vue 3, Pinia, engagement and recognition SaaS at enterprise scale.",
  },
  {
    period: "2020 — 2022",
    title: "Chief Technology Officer",
    org: "SparkPay",
    detail: "Next.js payroll SaaS, HubSpot, marketing and product surfaces.",
  },
];

const focusAreas = [
  {
    label: "Product delivery",
    body: "End-to-end ownership from architecture through release: APIs, auth, payments, and UI systems.",
  },
  {
    label: "Performance",
    body: "Lighthouse and Core Web Vitals as part of normal delivery—not a separate phase.",
  },
  {
    label: "Motion & polish",
    body: "GSAP and ScrollTrigger where marketing and product need motion without sacrificing frame budget.",
  },
];

const stack = [
  "Next.js",
  "Nuxt",
  "React",
  "Vue",
  "TypeScript",
  "Tailwind",
  "Redux / Zustand",
  "REST",
  "Paystack",
  "PostHog",
  "HubSpot",
  "Sanity",
  "Contentful",
];

export function AboutPageContent() {
  return (
    <div className="about-dossier max-w-5xl mx-auto pb-8">
      <div className="about-dossier__hero mb-12 sm:mb-16 grid gap-8 lg:grid-cols-12 lg:gap-10 items-end border-b border-muted-200/80 dark:border-muted-700/80 pb-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400 mb-4">
            File · biography
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-muted-900 dark:text-muted-50 leading-[0.95]">
            Menyaga
            <span className="block text-muted-400 dark:text-muted-500 font-light mt-1">
              Enyo Israel
            </span>
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base sm:text-lg text-muted-600 dark:text-muted-300 leading-relaxed max-w-xl lg:max-w-none">
            I build and lead production SaaS: collaboration tools, fintech and billing, HR and engagement,
            and marketplaces. I work in{" "}
            <span className="text-muted-900 dark:text-muted-100 font-medium">
              Next.js and Nuxt
            </span>
            , with TypeScript, strong API boundaries, and shipping discipline.
          </p>
          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-[11px] sm:text-xs">
            <div>
              <dt className="text-muted-500 dark:text-muted-500 uppercase tracking-wider mb-1">
                Mode
              </dt>
              <dd className="text-muted-800 dark:text-muted-200">CTO · founder · IC</dd>
            </div>
            <div>
              <dt className="text-muted-500 dark:text-muted-500 uppercase tracking-wider mb-1">
                Stack bias
              </dt>
              <dd className="text-muted-800 dark:text-muted-200">React / Vue</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-muted-500 dark:text-muted-500 uppercase tracking-wider mb-1">
                Open to
              </dt>
              <dd className="text-muted-800 dark:text-muted-200">Select freelance</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 mb-16 sm:mb-20">
        <section
          className="lg:col-span-7"
          aria-labelledby="about-timeline-heading"
        >
          <h3
            id="about-timeline-heading"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 mb-8"
          >
            Chronology
          </h3>
          <ol className="space-y-10">
            {roles.map((r) => (
              <li
                key={`${r.org}-${r.period}`}
                className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-10"
              >
                <time className="font-mono text-xs text-primary-600 dark:text-primary-400 tabular-nums shrink-0 sm:w-28 sm:text-right pt-1">
                  {r.period}
                </time>
                <div className="sm:flex-1 sm:border-l sm:border-primary-500/20 dark:sm:border-primary-400/20 sm:pl-8 min-w-0">
                  <p className="text-lg font-semibold text-muted-900 dark:text-muted-50">{r.title}</p>
                  <p className="text-sm font-medium text-muted-500 dark:text-muted-400">{r.org}</p>
                  <p className="mt-2 text-sm text-muted-600 dark:text-muted-300 leading-relaxed max-w-prose">
                    {r.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="lg:col-span-5 space-y-10">
          <section aria-labelledby="about-focus-heading">
            <h3
              id="about-focus-heading"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 mb-5"
            >
              How I work
            </h3>
            <ul className="space-y-6">
              {focusAreas.map((f) => (
                <li
                  key={f.label}
                  className="rounded-xl border border-muted-200/90 dark:border-muted-700/80 bg-muted-50/40 dark:bg-muted-900/20 px-4 py-4 sm:px-5"
                >
                  <p className="text-sm font-semibold text-muted-900 dark:text-muted-100">{f.label}</p>
                  <p className="mt-2 text-xs sm:text-sm text-muted-600 dark:text-muted-400 leading-relaxed">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-stack-heading">
            <h3
              id="about-stack-heading"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-500 dark:text-muted-400 mb-4"
            >
              Tools & surfaces
            </h3>
            <ul className="flex flex-wrap gap-2">
              {stack.map((tag) => (
                <li key={tag}>
                  <span className="inline-block rounded-md border border-muted-300/80 dark:border-muted-600/60 bg-white/80 dark:bg-muted-800/40 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-muted-700 dark:text-muted-300">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-xl border border-primary-300/40 dark:border-primary-600/30 bg-primary-50/30 dark:bg-primary-950/20 px-5 py-5">
            <p className="text-sm text-muted-700 dark:text-muted-300 leading-relaxed">
              Interested in how wallets and contracts sit next to traditional SaaS—learning Ethereum and
              the wider ecosystem alongside shipping core product work.
            </p>
          </div>
        </aside>
      </div>

      <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-muted-200/80 dark:border-muted-700/80">
        <p className="text-sm text-muted-500 dark:text-muted-400">
          Want to collaborate or see shipped work?
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
          >
            View projects
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
