"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Avatar3DProps {
  className?: string;
}

export const Avatar3D = ({ className = "" }: Avatar3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    if (isHovered) {
      card.addEventListener("mousemove", handleMouseMove);
    }
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-[500px] rounded-2xl overflow-hidden transition-transform duration-300 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* 3D Avatar Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-primary-500/30 to-primary-600/20 dark:from-primary-600/20 dark:via-primary-700/30 dark:to-primary-800/20 rounded-2xl">
        {/* 3D Walking Avatar */}
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
          <div
            ref={avatarRef}
            className="relative w-64 h-80 flex items-end justify-center animate-3d-walk"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D Avatar Image Container with depth */}
            <div 
              className="relative w-full h-full animate-3d-bounce"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Main Avatar Image */}
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src="/avatar.jpg"
                  alt="Menya Israel - Full Stack Developer"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                    imageRendering: "auto",
                  }}
                />
              </div>

              {/* 3D Depth Layers - creates parallax effect */}
              <div
                className="absolute inset-0 bg-primary-400/10 dark:bg-primary-600/10 blur-3xl"
                style={{
                  transform: "translateZ(-50px) scale(1.2)",
                  transformStyle: "preserve-3d",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-primary-500/10 dark:bg-primary-700/10 blur-2xl"
                style={{
                  transform: "translateZ(-30px) scale(1.1)",
                  transformStyle: "preserve-3d",
                }}
              ></div>
            </div>

            {/* Ground shadow that moves with walking */}
            <div 
              className="absolute -bottom-4 left-1/2 w-32 h-8 bg-primary-400/20 dark:bg-primary-600/20 rounded-full blur-xl animate-3d-shadow"
              style={{
                transformStyle: "preserve-3d",
              }}
            ></div>

            {/* 3D Glow effect that follows the avatar */}
            <div 
              className="absolute inset-0 bg-primary-400/20 dark:bg-primary-600/20 blur-2xl rounded-full animate-3d-bounce"
              style={{
                transform: "translateZ(-20px)",
                transformStyle: "preserve-3d",
              }}
            ></div>
          </div>
        </div>

        {/* 3D Depth layers for enhanced effect */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-primary-300/50 dark:border-primary-600/50 pointer-events-none"
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d",
          }}
        ></div>
        
        {/* Floating particles effect with 3D depth */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-400/40 dark:bg-primary-500/40 animate-float pointer-events-none"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
              transform: `translateZ(${i * 10}px)`,
              transformStyle: "preserve-3d",
              animationDuration: `${3 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Shine effect on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
      ></div>
    </div>
  );
};
