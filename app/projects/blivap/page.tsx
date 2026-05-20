import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/src/components/JsonLd";
import { buildPageMetadata } from "@/src/seo/buildMetadata";
import {
  blivapSoftwareJsonLd,
  breadcrumbJsonLd,
} from "@/src/seo/jsonLd";
import { PAGE_SEO } from "@/src/seo/pages";
import { SITE } from "@/src/seo/site";
import blivapScreenshot from "@/src/images/flyverge.png";

export const metadata = buildPageMetadata(PAGE_SEO.blivap);

export default function BlivapProjectPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: "Blivap", path: "/projects/blivap" },
          ]),
          blivapSoftwareJsonLd(),
        ]}
      />
      <main id="main-content" className="page-shell">
        <article className="container-custom max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link
              href="/projects"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              ← Back to projects
            </Link>
          </nav>

          <header className="mb-8 sm:mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
              Owned product · Healthcare
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-900 dark:text-muted-50 leading-tight">
              Blivap — Blood Donation Platform
            </h1>
            <p className="mt-2 text-lg text-muted-600 dark:text-muted-400">
              Built by{" "}
              <span className="font-semibold text-muted-900 dark:text-muted-100">
                Israel Enyo Menyaga (MIE)
              </span>
            </p>
          </header>

          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-muted-200 dark:border-muted-700 bg-muted-100 dark:bg-muted-800">
            <Image
              src={blivapScreenshot}
              alt="Blivap blood donation platform screenshot — project by Israel Enyo Menyaga (MIE)"
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover object-top"
            />
          </div>

          <section aria-labelledby="blivap-summary" className="panel-surface p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 id="blivap-summary" className="sr-only">
              Blivap summary
            </h2>
            <p className="text-base sm:text-lg text-muted-700 dark:text-muted-300 leading-relaxed">
              <strong>Blivap</strong> (
              <a
                href={SITE.blivap}
                className="text-primary-600 underline dark:text-primary-400"
                rel="noopener noreferrer"
              >
                blivap.com
              </a>
              ) is a blood donation platform founded and engineered by{" "}
              <strong>Israel Enyo Menyaga</strong>. It connects blood and sperm
              donors with people who need donations through real-time
              donor–recipient matching, secure onboarding, and AI-assisted
              screening questionnaires.
            </p>
          </section>

          <section aria-labelledby="blivap-stack" className="mb-8">
            <h2
              id="blivap-stack"
              className="text-xl font-semibold text-muted-900 dark:text-muted-50 mb-4"
            >
              Technology stack
            </h2>
            <ul className="flex flex-wrap gap-2" role="list">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "NestJS",
                "Tailwind CSS",
                "REST APIs",
                "OpenAI API",
                "Redux Toolkit",
              ].map((tech) => (
                <li key={tech}>
                  <span className="rounded-md border border-muted-300 dark:border-muted-600 bg-muted-50 dark:bg-muted-800 px-2.5 py-1 font-mono text-xs text-muted-700 dark:text-muted-300">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="blivap-features" className="mb-10">
            <h2
              id="blivap-features"
              className="text-xl font-semibold text-muted-900 dark:text-muted-50 mb-4"
            >
              Key features
            </h2>
            <ul className="space-y-3 text-muted-700 dark:text-muted-300" role="list">
              <li>Real-time donor–recipient matching for blood and sperm donations</li>
              <li>AI-driven screening and onboarding questionnaires</li>
              <li>Secure authentication, profiles, appointments, and wallet flows</li>
              <li>Public education pages and authenticated donor dashboards</li>
              <li>Production infrastructure, custom domains, and verification workflows</li>
            </ul>
          </section>

          <footer className="flex flex-col xs:flex-row flex-wrap gap-3 border-t border-muted-200 pt-6 sm:pt-8 dark:border-muted-700">
            <a
              href={SITE.blivap}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm w-full xs:w-auto"
            >
              Visit Blivap (blivap.com)
            </a>
            <Link href="/projects" className="btn-secondary text-sm w-full xs:w-auto">
              All projects
            </Link>
            <Link href="/contact" className="btn-secondary text-sm w-full xs:w-auto">
              Contact Israel Menyaga
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
