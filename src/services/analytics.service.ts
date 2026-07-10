import api from "@/src/lib/api";
import { asArray } from "@/src/lib/normalizeApi";
import type { AnalyticsSummary, PageViewRow } from "@/src/types/api";

export async function trackVisit(page: string) {
  const { data } = await api.post("/api/analytics/track", { page });
  return data;
}

export async function getAnalytics() {
  const { data } = await api.get("/api/analytics");
  return asArray<PageViewRow>(data);
}

export async function getSummary() {
  const { data } = await api.get<AnalyticsSummary>("/api/analytics/summary");
  return data;
}
