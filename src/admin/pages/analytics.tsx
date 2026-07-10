"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import { StatCards } from "@/src/components/admin/StatCards";
import { getAnalytics, getSummary } from "@/src/services/analytics.service";
import type { AnalyticsSummary, PageViewRow } from "@/src/types/api";

function AnalyticsContent() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [pages, setPages] = useState<PageViewRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSummary(), getAnalytics()])
      .then(([s, p]) => {
        setSummary(s);
        const rows = Array.isArray(p) ? p : [];
        setPages(
          [...rows].sort(
            (a, b) =>
              Number(b.count ?? (b as { views?: number }).views) -
              Number(a.count ?? (a as { views?: number }).views),
          ),
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : (
        <>
          {summary ? <StatCards summary={summary} /> : null}
          <div className="overflow-x-auto rounded-xl border border-muted-200 dark:border-muted-700">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted-50 dark:bg-muted-900">
                <tr>
                  <th className="px-4 py-3">Page</th>
                  <th className="px-4 py-3">Views</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((row) => (
                  <tr key={row.path} className="border-b dark:border-muted-800">
                    <td className="px-4 py-3">{row.path}</td>
                    <td className="px-4 py-3">
                      {row.count ?? (row as { views?: number }).views ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <AnalyticsContent />
      </AdminLayout>
    </AdminGuard>
  );
}
