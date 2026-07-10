"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import { StatCards, pickSummary } from "@/src/components/admin/StatCards";
import { getSummary } from "@/src/services/analytics.service";
import type { AnalyticsSummary } from "@/src/types/api";

function DashboardContent() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSummary()
      .then(setSummary)
      .catch(() => setError("Failed to load summary"))
      .finally(() => setLoading(false));
  }, []);

  const stats = summary ? pickSummary(summary) : null;
  const topPages = stats?.topPages.slice(0, 5) ?? [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-muted-900 dark:text-muted-50">
        Dashboard
      </h1>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : summary ? (
        <>
          <StatCards summary={summary} />
          <div>
            <h2 className="mb-3 text-lg font-medium">Top pages</h2>
            <div className="overflow-x-auto rounded-xl border border-muted-200 dark:border-muted-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-muted-200 bg-muted-50 dark:border-muted-700 dark:bg-muted-900">
                  <tr>
                    <th className="px-4 py-3 font-medium">Page</th>
                    <th className="px-4 py-3 font-medium">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-muted-500">
                        No data yet
                      </td>
                    </tr>
                  ) : (
                    topPages.map((row) => (
                      <tr
                        key={row.path}
                        className="border-b border-muted-100 dark:border-muted-800"
                      >
                        <td className="px-4 py-3">{row.path}</td>
                        <td className="px-4 py-3">{row.count}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <DashboardContent />
      </AdminLayout>
    </AdminGuard>
  );
}
