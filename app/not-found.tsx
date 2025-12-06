"use client";
import Link from "next/link";
import { Layout } from "@/src/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            {/* 404 Number */}
            <div className="mb-8 animate-bounce-in">
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold gradient-text font-mono leading-none">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="mb-8 animate-fade-in-up animate-delay-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 mb-4">
                Page Not Found
              </h2>
              <p className="text-sm sm:text-base text-muted-600 dark:text-muted-400 leading-relaxed max-w-md mx-auto">
                Looks like you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>

            {/* Game-like Elements */}
            <div className="mb-8 animate-fade-in-up animate-delay-400">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 dark:bg-accent-900/30 border border-accent-300 dark:border-accent-700 rounded-lg mb-6">
                <span className="text-2xl">🎮</span>
                <span className="text-sm font-mono text-accent-700 dark:text-accent-300">Level Not Found</span>
              </div>
            </div>

            {/* Navigation Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-600">
              <Link
                href="/"
                className="btn-primary text-sm"
              >
                🏠 Return Home
              </Link>
              <Link
                href="/projects"
                className="btn-secondary text-sm"
              >
                📁 View Projects
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 animate-fade-in animate-delay-800">
              <p className="text-xs text-muted-500 dark:text-muted-500 mb-4 font-mono">QUICK LINKS</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/about"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                >
                  About
                </Link>
                <span className="text-muted-400 dark:text-muted-600">•</span>
                <Link
                  href="/services"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                >
                  Services
                </Link>
                <span className="text-muted-400 dark:text-muted-600">•</span>
                <Link
                  href="/experience"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                >
                  Experience
                </Link>
                <span className="text-muted-400 dark:text-muted-600">•</span>
                <Link
                  href="/contact"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
