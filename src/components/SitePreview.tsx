"use client";

import Image, { type StaticImageData } from "next/image";

export type PreviewImage = string | StaticImageData;
import { useEffect, useRef, useState } from "react";

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;
const LIVE_FALLBACK_MS = 3000;

/** Hosts that usually allow iframe embeds (e.g. Vercel previews). */
const EMBED_FRIENDLY_SUFFIXES = [".vercel.app", "localhost", "127.0.0.1"];

type PreviewMode = "static" | "live" | "empty";

type SitePreviewProps = {
  url: string;
  title: string;
  fallback?: PreviewImage;
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

function hostAllowsEmbed(href: string): boolean {
  try {
    const host = new URL(href).hostname.toLowerCase();
    return EMBED_FRIENDLY_SUFFIXES.some(
      (suffix) => host === suffix.slice(1) || host.endsWith(suffix),
    );
  } catch {
    return false;
  }
}

function resolveInitialMode(href: string | null, fallback?: PreviewImage): PreviewMode {
  if (!href) return fallback ? "static" : "empty";
  if (fallback) return "static";
  if (hostAllowsEmbed(href)) return "live";
  return "empty";
}

function PreviewChrome({
  href,
  live,
}: {
  href: string | null;
  live?: boolean;
}) {
  return (
    <div className="site-preview__chrome" aria-hidden>
      <span className="site-preview__traffic">
        <span className="site-preview__dot site-preview__dot--close" />
        <span className="site-preview__dot site-preview__dot--min" />
        <span className="site-preview__dot site-preview__dot--max" />
      </span>
      <span className="site-preview__url font-mono">
        {href ? displayHost(href) : "preview offline"}
      </span>
      {live ? <span className="site-preview__live font-mono">LIVE</span> : null}
    </div>
  );
}

export function SitePreview({
  url,
  title,
  fallback,
  className = "",
}: SitePreviewProps) {
  const href = normalizeUrl(url);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const [scale, setScale] = useState(0.25);
  const [liveReady, setLiveReady] = useState(false);
  const [mode, setMode] = useState<PreviewMode>(() =>
    resolveInitialMode(href, fallback),
  );

  useEffect(() => {
    setMode(resolveInitialMode(href, fallback));
    setLiveReady(false);
  }, [href, fallback]);

  useEffect(() => {
    if (mode !== "live" || !href) return;

    fallbackTimerRef.current = window.setTimeout(() => {
      setMode((current) => (current === "live" ? (fallback ? "static" : "empty") : current));
    }, LIVE_FALLBACK_MS);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, [mode, href, fallback]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node || mode !== "live") return;

    const updateScale = () => {
      const width = node.clientWidth;
      if (width > 0) setScale(width / PREVIEW_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  const rootClass = `site-preview ${className}`.trim();

  if (mode === "static" && fallback) {
    return (
      <div className={`${rootClass} site-preview--static`}>
        <PreviewChrome href={href} />
        <div className="site-preview__viewport site-preview__viewport--static relative">
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

  if (mode === "empty" || !href) {
    return (
      <div className={`${rootClass} site-preview--empty`}>
        <PreviewChrome href={href} />
        <div className="site-preview__viewport site-preview__viewport--static flex items-center justify-center">
          <span className="text-xs font-mono text-muted-500 dark:text-muted-400">
            Preview unavailable
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${rootClass} site-preview--live pointer-events-none select-none`}>
      <PreviewChrome href={href} live={liveReady} />
      <div ref={viewportRef} className="site-preview__viewport">
        {!liveReady ? <div className="site-preview__shimmer" aria-hidden /> : null}
        <iframe
          src={href}
          title={`Live preview of ${title}`}
          className="site-preview__frame"
          sandbox="allow-scripts allow-same-origin allow-popups"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            transform: `scale(${scale})`,
          }}
          onLoad={() => {
            if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
            setLiveReady(true);
          }}
          onError={() => setMode(fallback ? "static" : "empty")}
        />
        <div className="site-preview__fade" aria-hidden />
      </div>
    </div>
  );
}
