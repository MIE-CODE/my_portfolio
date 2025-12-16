/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "../src/style/globals.css";
import { ThemeProviderWrapper } from "../src/components/ThemeProviderWrapper";

export const metadata: Metadata = {
  title: {
    default: "Menya Israel - Full Stack Developer | React, Next.js, React Native Expert",
    template: "%s | Menya Israel Portfolio",
  },
  description:
    "Professional full-stack developer with 3+ years of experience specializing in React, Next.js, TypeScript, and React Native. Expert in building scalable, high-performance web and mobile applications. Explore my portfolio featuring innovative projects including Trueperk, SparkPay, Flyverge, and interactive 3D experiences.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Native Developer",
    "Web Developer",
    "Mobile Developer",
    "Frontend Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Menya Israel" }],
  creator: "Menya Israel",
  publisher: "Menya Israel",
  metadataBase: new URL("https://your-portfolio-domain.com"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-domain.com", // Update with your actual domain
    title: "Menya Israel - Full Stack Developer | React, Next.js, React Native Expert",
    description:
      "Professional full-stack developer with 3+ years of experience specializing in React, Next.js, TypeScript, and React Native. Expert in building scalable, high-performance web and mobile applications with modern architecture and best practices.",
    siteName: "Menya Israel Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You should add an OG image
        width: 1200,
        height: 630,
        alt: "Menya Israel - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menya Israel - Full Stack Developer",
    description:
      "Professional full-stack developer specializing in React, Next.js, TypeScript, and React Native.",
    images: ["/og-image.jpg"], // You should add a Twitter image
    creator: "@yourtwitterhandle", // Update with your Twitter handle
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#009c9e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Menya Israel",
              jobTitle: "Full Stack Developer",
              description:
                "Professional full-stack developer specializing in React, Next.js, TypeScript, and React Native",
              email: "israelvictor126@gmail.com",
              url: "https://your-portfolio-domain.com", // Update with your actual domain
              sameAs: [
                "http://www.linkedin.com/in/israelmenyaga",
                // Add other social profiles
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "React Native",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Web Development",
                "Mobile Development",
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
