"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";
import { useTheme } from "@/src/contexts/ThemeContext";
import Navbar from "./Navbar";
import { Footer } from "./footer";
import { Modal } from "./modal";
import { GSAPInit } from "./GSAPInit";
import { ContentMotionLayer } from "./ContentMotionLayer";
import { AppLoadProvider } from "@/src/contexts/AppLoadContext";
import { GamifyShell } from "./GamifyShell";

/**
 * Client-only shell — `ssr: false` keeps ParallaxVerse/three out of the
 * server bundle (avoids SSG hangs + missing vendor-chunks/three.js).
 */
const ParallaxVerse = dynamic(
  () => import("./ParallaxVerse").then((m) => m.ParallaxVerse),
  { ssr: false },
);

/** Persistent app chrome — ParallaxVerse only in tech mode (client-only). */
export function SiteShell({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState(false);
  const [techMounted, setTechMounted] = useState(false);
  const pathname = usePathname();
  const { mode, ready: themeReady } = useTheme();
  const wantTech = themeReady && mode === "tech";

  useEffect(() => {
    ensureDocumentScrollable();
  }, []);

  useEffect(() => {
    if (modal) return;
    ensureDocumentScrollable();
  }, [pathname, modal]);

  useEffect(() => {
    setTechMounted(wantTech);
  }, [wantTech]);

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  const chrome = (
    <>
      <Navbar isOpen={setModal} menuOpen={modal} />
      <div className="site-main">
        <ContentMotionLayer>{children}</ContentMotionLayer>
        <Footer />
      </div>
    </>
  );

  // SSR + first paint always use GamifyShell so page HTML is never empty
  // and three.js is never required on the server.
  const shell =
    techMounted ? (
      <ParallaxVerse>{chrome}</ParallaxVerse>
    ) : (
      <GamifyShell>{chrome}</GamifyShell>
    );

  return (
    <AppLoadProvider>
      <GSAPInit />
      <div suppressHydrationWarning>{shell}</div>
      <Modal isOpen={setModal} modal={modal} />
    </AppLoadProvider>
  );
}
