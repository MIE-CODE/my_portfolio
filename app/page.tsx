"use client";
import { Reveal } from "@/src/animation/Reveal";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Stack } from "@/src/components/stack";
import Image from "next/image";
import keyboardImage from "@/src/images/keyboard.png";
import { Layout } from "@/src/components/Layout";
import { XPBar } from "@/src/components/XPBar";
import { Achievements } from "@/src/components/Achievements";
import { Stats } from "@/src/components/Stats";

export default function Home() {
  const text = useTypewriter({
    words: ["Developer", "Engineer", "Architect", "Creator"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
  });

  return (
    <Layout>
      <main id="main-content" className="min-h-screen" role="main">
        <div className="container-custom">
          {/* Hero Section with Game UI */}
          <section 
            id="hero" 
            className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-center gap-8 pt-24 pb-12" 
            aria-label="Hero section"
          >
            {/* XP Bar */}
            <div className="w-full max-w-md mb-4 animate-fade-in">
              <XPBar currentXP={7500} maxXP={10000} level={15} />
            </div>

            {/* Main Title */}
            <div className="flex flex-col gap-4 max-w-3xl animate-fade-in-up animate-delay-200">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-muted-900 dark:text-muted-50">Software </span>
                  <span className="gradient-text inline-block">
                    {text[0]}
                  </span>
                  <Cursor cursorBlinking />
                </h1>
                <p className="text-xs sm:text-sm font-mono text-muted-600 dark:text-muted-400 tracking-wider">
                  Next.js • React • Flutter • MongoDB • Node.js • Express.js
                </p>
              </div>
              <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 max-w-xl mx-auto leading-relaxed">
                Crafting digital experiences with cutting-edge technology
              </p>
            </div>
            
            {/* Stats */}
            <div className="w-full max-w-2xl mt-4 animate-fade-in-up animate-delay-400">
              <Stats />
            </div>
            
            {/* Action Buttons */}
            <nav className="flex items-center justify-center flex-wrap gap-4 mt-6 animate-fade-in-up animate-delay-500" aria-label="Primary actions">
              <Reveal>
                <a
                  href="mailto:israelvictor126@gmail.com"
                  className="btn-primary text-sm"
                  aria-label="Send email to Menya Israel"
                >
                  📧 Contact Me
                </a>
              </Reveal>
              <Reveal>
                <a
                  href="https://docs.google.com/document/d/17Wq0_KFeW19I54rMaAtq2JQZG5jNki0BuaNH_4wRwEI/edit?usp=sharing"
                  className="btn-secondary text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume in new tab"
                >
                  📄 Resume
                </a>
              </Reveal>
            </nav>
            
            {/* Achievements */}
            <div className="w-full max-w-2xl mt-8 animate-fade-in-up animate-delay-600">
              <p className="text-xs text-muted-500 dark:text-muted-500 mb-3 font-mono">ACHIEVEMENTS</p>
              <Achievements />
            </div>
            
            {/* Keyboard Image */}
            <div className="w-full max-w-md h-32 md:h-40 relative opacity-60 mt-8 animate-fade-in animate-delay-600" aria-hidden="true">
              <Image
                src={keyboardImage}
                alt=""
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </section>

          <Stack />
        </div>
      </main>
    </Layout>
  );
}
