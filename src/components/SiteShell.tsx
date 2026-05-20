"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import { Footer } from "./footer";
import { Modal } from "./modal";
import { GSAPInit } from "./GSAPInit";
import { ContentMotionLayer } from "./ContentMotionLayer";
import { AppLoadProvider } from "@/src/contexts/AppLoadContext";
import { ParallaxVerse } from "./ParallaxVerse";

/** Persistent app chrome + verse — mounted once in root layout, survives route changes */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);

  return (
    <AppLoadProvider>
      <GSAPInit />
      <ParallaxVerse>
        <Navbar isOpen={setModal} menuOpen={modal} />
        <div className="site-main">
          <ContentMotionLayer>{children}</ContentMotionLayer>
          <Footer />
        </div>
      </ParallaxVerse>
      <Modal isOpen={setModal} modal={modal} />
    </AppLoadProvider>
  );
}
