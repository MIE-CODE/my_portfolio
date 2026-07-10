"use client";

import { useEffect } from "react";
import { trackVisit } from "@/src/services/analytics.service";

export function useTrackVisit(page: string) {
  useEffect(() => {
    trackVisit(page).catch(() => {});
  }, [page]);
}
