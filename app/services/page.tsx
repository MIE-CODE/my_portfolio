import type { Metadata } from "next";
import { ServicesList } from "@/src/components/ServicesList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Services - Web & Mobile Development",
  description: "Professional web and mobile development services including React, Next.js, Flutter, and full-stack solutions.",
};

export default function ServicesPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text font-mono mb-6">
              {"< Services >"}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive development services to bring your digital vision to life
            </p>
          </section>
          <ServicesList />
        </div>
      </main>
    </Layout>
  );
}

