"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import {
  deleteTestimonial,
  getAllTestimonials,
  toggleApprove,
} from "@/src/services/testimonials.service";
import type { ApiTestimonial } from "@/src/types/api";

type Tab = "pending" | "approved";

function TestimonialsContent() {
  const [tab, setTab] = useState<Tab>("pending");
  const [items, setItems] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getAllTestimonials()
      .then((data) => {
        setItems(
          data.filter((t) =>
            tab === "approved" ? t.approved : !t.approved,
          ),
        );
      })
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggle = async (id: string) => {
    setActionId(id);
    try {
      await toggleApprove(id);
      load();
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionId(id);
    try {
      await deleteTestimonial(id);
      load();
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Testimonials</h1>
      <div className="flex gap-2 border-b dark:border-muted-700">
        {(["pending", "approved"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm capitalize ${
              tab === t
                ? "border-b-2 border-primary-500 font-medium"
                : "text-muted-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <article
              key={String(t.id)}
              className="rounded-lg border border-muted-200 p-4 dark:border-muted-700"
            >
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-muted-500">
                {[t.role, t.company].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-2 text-sm">{t.message}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  disabled={actionId === String(t.id)}
                  onClick={() => handleToggle(String(t.id))}
                  className="text-sm text-primary-600 disabled:opacity-60"
                >
                  {actionId === String(t.id)
                    ? "Updating…"
                    : t.approved
                      ? "Unapprove"
                      : "Approve"}
                </button>
                <button
                  type="button"
                  disabled={actionId === String(t.id)}
                  onClick={() => handleDelete(String(t.id))}
                  className="text-sm text-red-600 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <TestimonialsContent />
      </AdminLayout>
    </AdminGuard>
  );
}
