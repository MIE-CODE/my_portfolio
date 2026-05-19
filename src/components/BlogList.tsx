"use client";
import Link from "next/link";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { blogPosts } from "../data/blogPosts";

export const BlogList = () => {
  const ref = useGsapReveal({
    preset: "streamIn",
    stagger: 0.1,
    duration: 0.7,
    parallax: 0.06,
    ease: "power3.out",
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {blogPosts.map((post) => (
        <article
          key={post.id}
          data-reveal-item
          className="p-6 bg-white/90 dark:bg-muted-800/60 border border-muted-200/95 dark:border-muted-700 rounded-2xl verse-hover-hud verse-scan-border transition-all duration-300 hover:bg-white dark:hover:bg-muted-800/80 hover:border-primary-300 dark:hover:border-primary-600 backdrop-blur-sm shadow-[0_2px_10px_rgba(28,25,23,0.06)] dark:shadow-none opacity-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800">
              {post.category}
            </span>
            <span className="text-xs text-muted-600 dark:text-muted-400">
              {post.readTime}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-muted-900 dark:text-muted-50 mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-muted-700 dark:text-muted-300 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <time
              className="text-xs text-muted-600 dark:text-muted-400"
              dateTime={post.date}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <Link
              href={`/blog/${post.id}`}
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center gap-2"
            >
              Read more
              <span>→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};
