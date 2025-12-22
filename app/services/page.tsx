import type { Metadata } from "next";
import { ServicesList } from "@/src/components/ServicesList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Services - Full Stack Development Services",
  description: "Comprehensive professional development services: Next.js development, React & TypeScript, performance optimization, analytics & CRM integration (Google Analytics, PostHog, HubSpot), headless CMS (Sanity, Contentful), animation & design implementation (Framer Motion, GSAP), and Web3 development. Building production-ready websites from Figma to deployment.",
  keywords: [
    "Web Development Services",
    "Next.js Development",
    "React Development",
    "TypeScript Development",
    "Performance Optimization",
    "Analytics Integration",
    "CRM Integration",
    "Headless CMS",
    "Animation Services",
    "Web3 Development",
    "Figma to Code",
    "Full Stack Services",
  ],
};

export default function ServicesPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="container-custom px-4">
          <section className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-4 sm:mb-6">
              {"< Services >"}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-600 dark:text-muted-400 max-w-3xl mx-auto leading-relaxed mb-2">
              Comprehensive development services to bring your digital vision to life
            </p>
            <p className="text-sm sm:text-base text-muted-500 dark:text-muted-500 max-w-2xl mx-auto">
              From concept to deployment, I deliver production-ready solutions with modern technologies and best practices
            </p>
          </section>
          <ServicesList />
          
          {/* CTA Section */}
          <section className="mt-16 sm:mt-20 text-center">
            <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl sm:rounded-3xl border border-primary-200 dark:border-primary-800">
              <h2 className="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-6 sm:mb-8">
                Let&apos;s discuss how I can help bring your ideas to life with cutting-edge technology and exceptional user experiences.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
                >
                  Get in Touch
                </a>
                <a
                  href="mailto:israelvictor126@gmail.com"
                  className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
                >
                  Send Email
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

