"use client";

import { useTrackVisit } from "@/src/hooks/useTrackVisit";

export function VisitTracker({ path }: { path: string }) {
  useTrackVisit(path);
  return null;
}
