"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import { ConfirmDialog } from "@/src/components/admin/ConfirmDialog";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "@/src/services/skills.service";
import type { ApiSkill } from "@/src/types/api";

function SkillsContent() {
  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [proficiency, setProficiency] = useState("intermediate");
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getSkills()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const grouped = useMemo(() => {
    const map = new Map<string, ApiSkill[]>();
    for (const s of skills) {
      const list = map.get(s.category) ?? [];
      list.push(s);
      map.set(s.category, list);
    }
    return map;
  }, [skills]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editId) {
        await updateSkill(editId, { name, category, proficiency });
        setEditId(null);
      } else {
        await createSkill({ name, category, proficiency });
      }
      setName("");
      setCategory("");
      setProficiency("intermediate");
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (skill: ApiSkill) => {
    setEditId(String(skill.id));
    setName(skill.name);
    setCategory(skill.category);
    setProficiency(skill.proficiency ?? "intermediate");
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteSkill(deleteId);
      setDeleteId(null);
      load();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Skills</h1>
      <form
        onSubmit={handleAdd}
        className="flex flex-wrap items-end gap-3 rounded-xl border border-muted-200 p-4 dark:border-muted-700"
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border px-3 py-2 text-sm dark:border-muted-600 dark:bg-muted-800"
          required
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border px-3 py-2 text-sm dark:border-muted-600 dark:bg-muted-800"
          required
        />
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="rounded border px-3 py-2 text-sm dark:border-muted-600 dark:bg-muted-800"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary text-sm disabled:opacity-60"
        >
          {submitting ? "Saving…" : editId ? "Update" : "Add"}
        </button>
        {editId ? (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
              setCategory("");
            }}
            className="text-sm text-muted-500"
          >
            Cancel edit
          </button>
        ) : null}
      </form>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : (
        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([cat, items]) => (
            <section key={cat}>
              <h2 className="mb-3 text-lg font-medium">{cat}</h2>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li
                    key={String(skill.id)}
                    className="flex items-center justify-between rounded-lg border border-muted-200 px-4 py-3 dark:border-muted-700"
                  >
                    <span>
                      {skill.name}{" "}
                      <span className="text-muted-500">({skill.proficiency})</span>
                    </span>
                    <span className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(skill)}
                        className="text-sm text-primary-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(String(skill.id))}
                        className="text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      <ConfirmDialog
        open={!!deleteId}
        message="Delete this skill?"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default function AdminSkillsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <SkillsContent />
      </AdminLayout>
    </AdminGuard>
  );
}
