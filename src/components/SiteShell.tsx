"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ensureDocumentScrollable } from "@/src/lib/ensureScrollable";
import { useTheme } from "@/src/contexts/ThemeContext";
import Navbar from "./Navbar";
import { Footer } from "./footer";
import { Modal } from "./modal";
import { GSAPInit } from "./GSAPInit";
import { ContentMotionLayer } from "./ContentMotionLayer";
import { AppLoadProvider } from "@/src/contexts/AppLoadContext";
import { ParallaxVerse } from "./ParallaxVerse";
import { GamifyShell } from "./GamifyShell";

/** Persistent app chrome — ParallaxVerse only in tech mode */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const pathname = usePathname();
  const { mode, ready: themeReady } = useTheme();

  useEffect(() => {
    ensureDocumentScrollable();
  }, []);

  useEffect(() => {
    if (modal) return;
    ensureDocumentScrollable();
  }, [pathname, modal]);

  useEffect(() => {
    ensureDocumentScrollable();
  }, [mode]);

  const chrome = (
    <>
      <Navbar isOpen={setModal} menuOpen={modal} />
      <div className="site-main">
        <ContentMotionLayer>{children}</ContentMotionLayer>
        <Footer />
      </div>
    </>
  );

  const shell =
    themeReady && mode === "tech" ? (
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
