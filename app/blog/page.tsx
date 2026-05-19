import type { Metadata } from "next";
import { BlogList } from "@/src/components/BlogList";
import { PageHeader } from "@/src/components/PageHeader";

export const metadata: Metadata = {
  title: "Blog - Tech Insights & Tutorials",
  description: "Explore comprehensive articles, in-depth tutorials, and technical insights on web development, React, Next.js, TypeScript, React Native, and modern software engineering practices. Learn from real-world experiences and best practices from a professional developer.",
};

export default function BlogPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20"
      data-parallax-depth="0.1"
    >
      <div className="container-custom px-4">
        <PageHeader
          title="< Blog >"
          description="Insights, tutorials, and thoughts on modern web development"
        />
        <BlogList />
      </div>
    </main>
  );
}

