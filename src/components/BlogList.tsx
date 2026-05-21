"use client";

import Link from "next/link";
import type { BlogPost } from "@/src/data/blogPosts";

type BlogListProps = {
  posts: BlogPost[];
  isTech?: boolean;
};

export const BlogList = ({ posts, isTech = false }: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <p className="stream-empty font-mono" role="status">
        NO_PACKETS_IN_STREAM — select another filter.
      </p>
    );
  }

  return (
    <div
      className="stream-cards"
      aria-label="Blog posts"
    >
      {posts.map((post, index) => (
        <article
          key={post.id}
          data-stream-card
          className={`stream-card game-card verse-hover-hud opacity-0${isTech ? " verse-scan-border" : ""}`}
        >
          {isTech && (
            <>
              <span className="stream-card__corner stream-card__corner--tl" aria-hidden />
              <span className="stream-card__corner stream-card__corner--tr" aria-hidden />
              <span className="stream-card__corner stream-card__corner--bl" aria-hidden />
              <span className="stream-card__corner stream-card__corner--br" aria-hidden />
            </>
          )}

          <header className="stream-card__head">
            {isTech && (
              <span className="stream-card__index font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <div className="stream-card__meta">
              <span className={`stream-card__tag${isTech ? " font-mono" : " gamify-badge"}`}>
                {isTech ? post.category.toUpperCase().replace(/\s+/g, "_") : post.category}
              </span>
              <span className={`stream-card__duration${isTech ? " font-mono" : ""}`}>
                {post.readTime.replace(/\s*read\s*/i, "").trim()}
              </span>
            </div>
          </header>

          <h2 className="stream-card__title font-display">{post.title}</h2>
          <p className="stream-card__excerpt">{post.excerpt}</p>

          <footer className="stream-card__foot">
            <time
              className="stream-card__date font-mono"
              dateTime={post.date}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).toUpperCase()}
            </time>
            <Link
              href={`/blog/${post.id}`}
              className={`stream-card__link touch-target${isTech ? " font-mono" : " font-semibold text-primary-600 dark:text-primary-400"}`}
            >
              {isTech ? "READ_PACKET →" : "Read story →"}
            </Link>
          </footer>
        </article>
      ))}
    </div>
  );
};
