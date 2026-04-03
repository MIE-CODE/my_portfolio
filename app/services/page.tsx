import type { Metadata } from "next";
import { ServicesList } from "@/src/components/ServicesList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Services - CTO-Led Product & Full Stack Development",
  description:
    "Services aligned with real shipped work: Next.js and Nuxt SaaS, React and Vue enterprise UIs, payments and auth (Paystack, sessions, REST APIs), performance and analytics (GA, PostHog, HubSpot), motion (Framer Motion, GSAP), and technical leadership. CTO experience at Belsoft Systems, True Perk, SparkPay; founder of Blivap.",
  keywords: [
    "Next.js Development",
    "Nuxt Development",
    "React Development",
    "Vue Development",
    "TypeScript",
    "SaaS Development",
    "Fintech UX",
    "Paystack Integration",
    "Performance Optimization",
    "Analytics Integration",
    "CTO Consulting",
    "Technical Leadership",
    "Framer Motion",
    "GSAP",
    "Figma to Code",
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
              Product-minded engineering—same muscles behind Belsoft (BelCore, BelPower), Blivap, True Perk, SparkPay, and freelance SaaS
            </p>
            <p className="text-sm sm:text-base text-muted-500 dark:text-muted-500 max-w-2xl mx-auto">
              From architecture and CTO-style delivery to hands-on Next.js, Nuxt, and React: performance, payments, analytics, and design fidelity
            </p>
          </section>
          <ServicesList />
          
          {/* CTA Section */}
          <section className="mt-16 sm:mt-20 text-center">
            <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-gradient-to-br from-white via-primary-50/90 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl sm:rounded-3xl border border-primary-200/90 dark:border-primary-800 shadow-[0_4px_28px_-6px_rgba(58,92,128,0.12)] dark:shadow-none">
              <h2 className="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-6 sm:mb-8">
                Whether you need a greenfield product, a critical refactor, or leadership on stack and delivery, we can map it to something I&apos;ve already shipped at scale.
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

