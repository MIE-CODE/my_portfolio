/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "../src/style/globals.css";
import { ThemeProviderWrapper } from "../src/components/ThemeProviderWrapper";

export const metadata: Metadata = {
  title: {
    default: "Menyaga Enyo Israel - Full Stack Developer | React, Next.js, React Native Expert",
    template: "%s",
  },
  description:
    "Professional full-stack developer with 5+ years of experience specializing in React, Next.js, TypeScript, and Tailwind CSS. Expert in building production websites from Figma designs to deployment, performance optimization (Core Web Vitals, Lighthouse), analytics integration (Google Analytics, PostHog), CRM systems (HubSpot), and headless CMS (Sanity, Contentful). Genuinely excited about blockchain technology and eager to learn Web3 development and Ethereum scaling solutions. Passionate about crafting high-quality user experiences with security-conscious development practices.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Tailwind CSS Developer",
    "Web3 Developer",
    "Blockchain Developer",
    "Ethereum Developer",
    "Figma to Code",
    "Performance Optimization",
    "Lighthouse Optimization",
    "Core Web Vitals",
    "Google Analytics",
    "PostHog",
    "HubSpot Integration",
    "Headless CMS",
    "Sanity CMS",
    "Contentful",
    "Framer Motion",
    "GSAP",
    "Web Developer",
    "Frontend Developer",
    "Software Engineer",
    "Portfolio",
    "Menyaga Enyo Israel",
    "Israel Enyo Menyaga",
    "M_I_E_CODE",
    "MIE",
  ],
  authors: [{ name: "Menyaga Israel" }],
  creator: "Menyaga Israel",
  publisher: "Menyaga Israel",
  metadataBase: new URL("https://mieworks.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mieworks.vercel.app",
    title: "Menyaga Enyo Israel - Full Stack Developer | React, Next.js, React Native Expert",
    description:
      "Professional full-stack developer with 5+ years of experience specializing in React, Next.js, TypeScript, and Tailwind CSS. Expert in building production websites from Figma designs, performance optimization, and analytics integration. Genuinely excited about blockchain technology and eager to learn Web3 development.",
    siteName: "Menyaga Enyo Israel Portfolio",
    images: [
      {
        url: "https://mieworks.vercel.app/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Menyaga Enyo Israel - Full Stack Developer",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menyaga Enyo Israel - Full Stack Developer",
    description:
      "Professional full-stack developer specializing in React, Next.js, TypeScript, and React Native.",
    images: ["https://mieworks.vercel.app/twitter-image.svg"],
    creator: "@M_I_E_CODE", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const resolvedTheme = savedTheme === 'system' || !savedTheme 
                    ? (systemPrefersDark ? 'dark' : 'light')
                    : savedTheme;
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="any" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#009c9e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Menyaga Enyo Israel",
              jobTitle: "Full Stack Developer",
              description:
                "Professional full-stack developer specializing in React, Next.js, TypeScript, and Tailwind CSS. Genuinely excited about blockchain technology and eager to learn Web3 development.",
              email: "israelvictor126@gmail.com",
              url: "https://mieworks.vercel.app",
              sameAs: [
                "http://www.linkedin.com/in/israelmenyaga",
                // Add other social profiles
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Framer Motion",
                "GSAP",
                "Google Analytics",
                "PostHog",
                "HubSpot",
                "Sanity CMS",
                "Contentful",
                "Performance Optimization",
                "Core Web Vitals",
                "Lighthouse",
                "Figma to Code",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Web Development",
                "Security",
                "QA Testing",
                "Blockchain Interest",
                "Web3 Interest",
                "Ethereum Interest",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-muted-50 dark:bg-muted-900 text-muted-900 dark:text-muted-50 transition-colors duration-300">
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}
