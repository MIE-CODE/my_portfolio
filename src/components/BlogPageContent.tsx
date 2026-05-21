"use client";

import { useMemo, useState } from "react";
import { BlogList } from "@/src/components/BlogList";
import { blogPosts } from "@/src/data/blogPosts";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useBlogPageMotion } from "@/src/hooks/useBlogPageMotion";

const TELEMETRY = [
  { k: "SECTOR", v: "DATA_STREAM", gk: "Zone", gv: "Blog" },
  { k: "BUFFER", v: "LOG_READ", gk: "Mode", gv: "Read" },
  { k: "ENTRIES", v: String(blogPosts.length).padStart(2, "0"), gk: "Posts", gv: String(blogPosts.length) },
  { k: "SYNC", v: "LIVE", gk: "Sync", gv: "Live" },
] as const;

export function BlogPageContent() {
  const { mode } = useTheme();
  const isTech = mode === "tech";
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const motionRef = useBlogPageMotion(activeCategory ?? "all");

  const categories = useMemo(
    () => Array.from(new Set(blogPosts.map((p) => p.category))).sort(),
    [],
  );

  const filtered = useMemo(
    () =>
      activeCategory
        ? blogPosts.filter((p) => p.category === activeCategory)
        : blogPosts,
    [activeCategory],
  );

  const latest = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0],
    [],
  );

  return (
    <div ref={motionRef} className="stream-layout">
      <div
        data-stream-strip
        className={`stream-strip panel-surface stream-reveal${isTech ? " verse-scan-border" : ""}`}
        aria-label="Data stream status"
      >
        <span className="stream-strip__status">
          {isTech && <span className="stream-strip__pulse" aria-hidden />}
          {isTech ? "LOG_BUFFER_ACTIVE" : "Story mode"}
        </span>
        <span className={`stream-strip__meta${isTech ? " font-mono" : ""}`}>
          {isTech ? "DATA_STREAM · READ MODE" : "Blog · Level up"}
        </span>
        <span className={`stream-strip__meta hidden sm:inline${isTech ? " font-mono" : ""}`}>
          {filtered.length} {isTech ? `packet${filtered.length === 1 ? "" : "s"} loaded` : `post${filtered.length === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="stream-grid">
        <section className="stream-main min-w-0" aria-label="Blog posts">
          <BlogList posts={filtered} isTech={isTech} />
        </section>

        <aside className="stream-sidebar" aria-label="Stream filters and telemetry">
          <p
            data-stream-sidebar-part
            className={`stream-sidebar__label stream-reveal${isTech ? " font-mono" : " font-display"}`}
          >
            {isTech ? "SECTOR_INDEX" : "Topics"}
          </p>

          <div
            data-stream-sidebar-part
            className="stream-filters panel-surface stream-reveal"
            aria-label="Filter posts by topic"
          >
            <p className={`stream-filters__head${isTech ? " font-mono" : " font-display"}`}>
              {isTech ? "FILTER::TOPIC" : "Filter"}
            </p>
            <ul className="stream-filters__list" role="list">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`stream-filter${activeCategory === null ? " stream-filter--active" : ""}`}
                  aria-pressed={activeCategory === null}
                >
                  <span>{isTech ? "ALL_STREAMS" : "All posts"}</span>
                  <span className={`stream-filter__count${isTech ? " font-mono" : ""}`}>
                    {String(blogPosts.length).padStart(2, "0")}
                  </span>
                </button>
              </li>
              {categories.map((cat) => {
                const count = blogPosts.filter((p) => p.category === cat).length;
                return (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`stream-filter${activeCategory === cat ? " stream-filter--active" : ""}`}
                      aria-pressed={activeCategory === cat}
                    >
                      <span>
                        {isTech ? cat.toUpperCase().replace(/\s+/g, "_") : cat}
                      </span>
                      <span className={`stream-filter__count${isTech ? " font-mono" : ""}`}>
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            data-stream-sidebar-part
            className="stream-telemetry panel-surface stream-reveal"
            aria-hidden
          >
            <p className={`stream-telemetry__head${isTech ? " font-mono" : " font-display"}`}>
              {isTech ? "TELEMETRY" : "Stats"}
            </p>
            <dl className="stream-telemetry__grid">
              {TELEMETRY.map((row) => (
                <div key={row.k} className="stream-telemetry__row">
                  <dt className={isTech ? "font-mono" : ""}>{isTech ? row.k : row.gk}</dt>
                  <dd className={isTech ? "font-mono" : ""}>{isTech ? row.v : row.gv}</dd>
                </div>
              ))}
            </dl>
            {latest && (
              <p className={`stream-telemetry__latest${isTech ? " font-mono" : ""}`}>
                {isTech
                  ? `LATEST::${latest.title.slice(0, 28)}${latest.title.length > 28 ? "…" : ""}`
                  : `Latest: ${latest.title.slice(0, 32)}${latest.title.length > 32 ? "…" : ""}`}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
