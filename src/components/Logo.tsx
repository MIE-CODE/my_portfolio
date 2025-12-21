"use client";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  className = "",
  showText = false 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#627d98", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#486581", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Background with rounded corners */}
        <rect width="100" height="100" rx="22" fill="url(#logoGrad)"/>
        
        {/* Modern stylized M - Figma/ChatGPT inspired */}
        {/* Left leg */}
        <rect x="18" y="28" width="9" height="44" rx="4.5" fill="white"/>
        
        {/* Center V shape */}
        <path d="M 27 28 L 50 56 L 27 72 Z" fill="white"/>
        
        {/* Right leg */}
        <rect x="50" y="28" width="9" height="44" rx="4.5" fill="white"/>
        
        {/* Connecting bridge for modern look */}
        <rect x="27" y="50" width="23" height="8" rx="4" fill="white" opacity="0.9"/>
      </svg>
      
      {showText && (
        <span className={`font-bold gradient-text font-mono tracking-tight ${textSizeClasses[size]}`}>
          MIE
        </span>
      )}
    </div>
  );
};

