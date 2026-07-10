import type { AnalyticsSummary } from "@/src/types/api";

function pickSummary(summary: AnalyticsSummary | Record<string, unknown>) {
  const s = summary as Record<string, unknown>;
  return {
    totalVisits: Number(s.totalVisits ?? s.total_visits ?? 0),
    visitsToday: Number(s.visitsToday ?? s.visits_today ?? 0),
    visitsThisWeek: Number(s.visitsThisWeek ?? s.visits_this_week ?? 0),
    visitsThisMonth: Number(s.visitsThisMonth ?? s.visits_this_month ?? 0),
    topPages: (s.topPages ?? s.top_pages ?? []) as {
      path: string;
      count: number;
    }[],
  };
}

export function StatCards({ summary }: { summary: AnalyticsSummary }) {
  const stats = pickSummary(summary);
  const cards = [
    { label: "Total Visits", value: stats.totalVisits },
    { label: "Visits Today", value: stats.visitsToday },
    { label: "Visits This Week", value: stats.visitsThisWeek },
    { label: "Visits This Month", value: stats.visitsThisMonth },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-muted-200 bg-white p-4 dark:border-muted-700 dark:bg-muted-900"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-500">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-muted-900 dark:text-muted-50">
            {card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export { pickSummary };
