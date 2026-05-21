"use client";

import { SitePreview } from "./SitePreview";
import { SITE } from "@/src/seo/site";

export function BlivapLivePreview() {
  return (
    <SitePreview
      url={SITE.blivap}
      title="Blivap"
      fallback="/blivap.png"
      className="aspect-[16/10] w-full sm:aspect-[16/9]"
    />
  );
}
