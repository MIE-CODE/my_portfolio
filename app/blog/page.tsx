import type { Metadata } from "next";
import { BlogList } from "@/src/components/BlogList";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Blog - Tech Insights & Tutorials",
  description: "Read my latest articles on web development, React, Next.js, TypeScript, and modern development practices.",
};

export default function BlogPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <section className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl  font-bold gradient-text font-mono mb-6">
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

