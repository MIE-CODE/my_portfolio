"use client";
import { useEffect, useState } from "react";

type CanvasPreviewProps = {
  imageSrc: string;
};

// Generate screenshot URL from website URL using multiple services as fallback
// const getScreenshotUrl = (url: string, serviceIndex: number = 0): string => {
//   // If it's already a full URL with http/https, use it directly
//   // Otherwise, prepend https://
//   const fullUrl = url.startsWith("http://") || url.startsWith("https://") 
//     ? url 
//     : `https://${url}`;
  
//   const encodedUrl = encodeURIComponent(fullUrl);
  
//   // Try different screenshot services
//   const services = [
//     // Service 1: screenshot.rocks (free tier)
//     `https://screenshot.rocks/api/screenshot?url=${encodedUrl}&width=1200&height=800`,
//     // Service 2: api.screenshotmachine.com (alternative)
//     `https://api.screenshotmachine.com/?key=demo&url=${encodedUrl}&dimension=1200x800`,
//     // Service 3: image.thum.io (fallback)
//     `https://image.thum.io/get/1200x800/${encodedUrl}`,
//   ];
  
//   return services[serviceIndex] || services[0];
// };

// Get the full URL for iframe fallback
const getFullUrl = (url: string): string => {
  return url.startsWith("http://") || url.startsWith("https://") 
    ? url 
    : `https://${url}`;
};

export const CanvasPreview = ({ imageSrc }: CanvasPreviewProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageSrc && imageSrc !== "#") {
      // Try to load screenshot, but default to iframe
      setError(false);
    } else {
      setError(true);
    }
  }, [imageSrc]);

  if (error || (!imageSrc || imageSrc === "#")) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted-200 dark:bg-muted-700">
        <span className="text-xs text-muted-500 dark:text-muted-400">Preview unavailable</span>
      </div>
    );
  }

  // Use iframe as primary method since screenshot APIs are unreliable
  // The iframe displays the actual website as a non-interactive preview
  // This shows the real website content, scaled to fit the container
  return (
    <div className="w-full h-full overflow-hidden relative">
      <iframe
        src={getFullUrl(imageSrc)}
        className="absolute border-0 pointer-events-none"
        title="Website preview"
        sandbox="allow-same-origin allow-scripts"
        loading="lazy"
        style={{
          width: '400%',
          height: '400%',
          transform: 'scale(0.25)',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};
