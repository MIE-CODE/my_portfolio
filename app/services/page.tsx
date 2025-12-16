import type { Metadata } from "next";
import { ServicesList } from "@/src/components/ServicesList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Services - Web & Mobile Development",
  description: "Comprehensive professional web and mobile development services specializing in React, Next.js, React Native, TypeScript, and full-stack solutions. Expert services for building scalable, high-performance applications with modern technologies and best practices.",
};

export default function ServicesPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container-custom px-4">
          <section className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-6">
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

