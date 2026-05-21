"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;

type SitePreviewProps = {
  url: string;
  title: string;
  fallback?: StaticImageData;
  className?: string;
};

function normalizeUrl(url: string): string | null {
  if (!url || url === "#") return null;
  try {
    const parsed = new URL(
      url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`,
    );
    return parsed.href;
  } catch {
    return null;
  }
}

function displayHost(href: string): string {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function SitePreview({
  url,
  title,
  fallback,
  className = "",
}: SitePreviewProps) {
  const href = normalizeUrl(url);
  const viewportRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0.25);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    href ? "loading" : "fallback",
  );

  const showFallback = useCallback(() => {
    setStatus("fallback");
  }, []);

  useEffect(() => {
    if (!href) {
      setStatus("fallback");
      return;
    }
    setStatus("loading");
    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "fallback" : current));
    }, 9000);
    return () => clearTimeout(timeout);
  }, [href]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node || status === "fallback") return;

    const updateScale = () => {
      const width = node.clientWidth;
      if (width > 0) {
        setScale(width / PREVIEW_WIDTH);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, [status]);

  if (!href || status === "fallback") {
    if (fallback) {
      return (
        <div
          className={`site-preview site-preview--static ${className}`.trim()}
        >
          <div className="site-preview__chrome" aria-hidden>
            <span className="site-preview__traffic">
              <span className="site-preview__dot site-preview__dot--close" />
              <span className="site-preview__dot site-preview__dot--min" />
              <span className="site-preview__dot site-preview__dot--max" />
            </span>
            <span className="site-preview__url font-mono">
              {href ? displayHost(href) : "preview offline"}
            </span>
          </div>
          <div className="site-preview__viewport site-preview__viewport--static">
            <Image
              src={fallback}
              alt={`${title} — preview`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`site-preview site-preview--empty ${className}`.trim()}
      >
        <span className="text-xs font-mono text-muted-500 dark:text-muted-400">
          Preview unavailable
        </span>
      </div>
    );
  }

  return (
    <div
      className={`site-preview pointer-events-none select-none ${className}`.trim()}
    >
      <div className="site-preview__chrome" aria-hidden>
        <span className="site-preview__traffic">
          <span className="site-preview__dot site-preview__dot--close" />
          <span className="site-preview__dot site-preview__dot--min" />
          <span className="site-preview__dot site-preview__dot--max" />
        </span>
        <span className="site-preview__url font-mono">{displayHost(href)}</span>
        {status === "loading" ? (
          <span className="site-preview__live font-mono">LIVE</span>
        ) : null}
      </div>

      <div ref={viewportRef} className="site-preview__viewport">
        {status === "loading" ? (
          <div className="site-preview__shimmer" aria-hidden />
        ) : null}
        <iframe
          ref={iframeRef}
          src={href}
          title={`Live preview of ${title}`}
          className="site-preview__frame"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            transform: `scale(${scale})`,
          }}
          onLoad={() => setStatus("ready")}
          onError={showFallback}
        />
        <div className="site-preview__fade" aria-hidden />
      </div>
    </div>
  );
}
