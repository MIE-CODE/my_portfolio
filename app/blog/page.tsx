import type { Metadata } from "next";
import { BlogList } from "@/src/components/BlogList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Blog - Tech Insights & Tutorials",
  description: "Explore comprehensive articles, in-depth tutorials, and technical insights on web development, React, Next.js, TypeScript, React Native, and modern software engineering practices. Learn from real-world experiences and best practices from a professional developer.",
};

export default function BlogPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container-custom px-4">
          <section className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-6">
              {"< Blog >"}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on modern web development
            </p>
          </section>
          <BlogList />
        </div>
      </main>
    </Layout>
  );
}

