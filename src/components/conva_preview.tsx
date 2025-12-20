"use client";
import { useEffect, useRef } from "react";

type CanvasPreviewProps = {
  imageSrc: string;
};

// Get the full URL for iframe
const getFullUrl = (url: string): string => {
  return url.startsWith("http://") || url.startsWith("https://") 
    ? url 
    : `https://${url}`;
};

export const CanvasPreview = ({ imageSrc }: CanvasPreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable all interactions on iframe load
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Disable pointer events
      iframe.style.pointerEvents = "none";
      
      // Disable scrolling
      iframe.scrolling = "no";
      
      // Make it non-accessible
      iframe.setAttribute("tabindex", "-1");
      iframe.setAttribute("aria-disabled", "true");
      iframe.setAttribute("role", "presentation");
      
      // Prevent focus
      iframe.addEventListener("focus", (e) => {
        e.preventDefault();
        iframe.blur();
      });

      // Disable context menu
      iframe.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
    }
  }, [imageSrc]);

  if (!imageSrc || imageSrc === "#") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted-200 dark:bg-muted-700">
        <span className="text-xs text-muted-500 dark:text-muted-400">Preview unavailable</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      style={{
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onMouseUp={(e) => e.preventDefault()}
      onClick={(e) => e.preventDefault()}
      onDoubleClick={(e) => e.preventDefault()}
      tabIndex={-1}
      aria-disabled="true"
      role="presentation"
    >
      <iframe
        ref={iframeRef}
        src={getFullUrl(imageSrc)}
        className="absolute border-0"
        title="Website preview"
        sandbox="allow-same-origin allow-scripts"
        loading="lazy"
        scrolling="no"
        style={{
          width: '400%',
          height: '400%',
          transform: 'scale(0.25)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          touchAction: 'none',
        }}
        tabIndex={-1}
        aria-disabled="true"
        role="presentation"
        onLoad={() => {
          // Additional safety: disable interactions after iframe loads
          if (iframeRef.current) {
            const iframe = iframeRef.current;
            try {
              // Try to access iframe content and disable interactions
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
              if (iframeDoc) {
                iframeDoc.body.style.pointerEvents = "none";
                iframeDoc.body.style.userSelect = "none";
                iframeDoc.body.style.overflow = "hidden";
                iframeDoc.body.setAttribute("tabindex", "-1");
                
                // Disable all interactive elements
                const interactiveElements = iframeDoc.querySelectorAll('a, button, input, select, textarea, [onclick], [role="button"]');
                interactiveElements.forEach((el) => {
                  (el as HTMLElement).style.pointerEvents = "none";
                  (el as HTMLElement).setAttribute("tabindex", "-1");
                });
              }
            } catch (e) {
              // CORS - can't access iframe content, but sandbox restrictions will help
            }
          }
        }}
      />
    </div>
  );
};
