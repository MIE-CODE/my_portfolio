"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import { ConfirmDialog } from "@/src/components/admin/ConfirmDialog";
import {
  createExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "@/src/services/experience.service";
import type { ApiExperience } from "@/src/types/api";

type Tab = "work" | "education";

function ExperienceContent() {
  const [tab, setTab] = useState<Tab>("work");
  const [items, setItems] = useState<ApiExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ApiExperience | null>(null);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    getExperience(tab)
      .then((data) =>
        setItems(
          data.filter(
            (e) => !e.type || e.type === tab,
          ),
        ),
      )
      .finally(() => setLoading(false));
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const openForm = (item?: ApiExperience) => {
    setEditing(item ?? null);
    setCompany(item?.company ?? "");
    setRole(item?.role ?? "");
    setDescription(item?.description ?? "");
    setStartDate(item?.start_date ?? "");
    setEndDate(item?.end_date ?? "");
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      company,
      role,
      description,
      start_date: startDate,
      end_date: endDate,
      type: tab,
    };
    try {
      if (editing?.id) {
        await updateExperience(String(editing.id), payload);
      } else {
        await createExperience(payload);
      }
      setFormOpen(false);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteExperience(deleteId);
      setDeleteId(null);
      load();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <button type="button" className="btn-primary text-sm" onClick={() => openForm()}>
          Add entry
        </button>
      </div>
      <div className="flex gap-2 border-b dark:border-muted-700">
        {(["work", "education"] as Tab[]).map((t) => (
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
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={String(item.id)}
              className="rounded-lg border border-muted-200 p-4 dark:border-muted-700"
            >
              <p className="font-medium">
                {item.role} @ {item.company}
              </p>
              <p className="text-sm text-muted-500">
                {item.start_date} – {item.end_date ?? "Present"}
              </p>
              <p className="mt-2 text-sm">{item.description}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="text-sm text-primary-600"
                  onClick={() => openForm(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-sm text-red-600"
                  onClick={() => setDeleteId(String(item.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {formOpen ? (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-muted-900"
          >
            <h2 className="mb-4 text-lg font-semibold">
              {editing ? "Edit" : "Add"} {tab}
            </h2>
            <div className="space-y-3">
              <input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
                required
              />
              <input
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
                rows={3}
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary text-sm disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <ConfirmDialog
        open={!!deleteId}
        message="Delete this entry?"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default function AdminExperiencePage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <ExperienceContent />
      </AdminLayout>
    </AdminGuard>
  );
}
