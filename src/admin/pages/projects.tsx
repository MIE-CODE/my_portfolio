"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import { ConfirmDialog } from "@/src/components/admin/ConfirmDialog";
import {
  createProject,
  deleteProject,
  getProjects,
  toggleFeatured,
  updateProject,
  updateStatus,
} from "@/src/services/projects.service";
import type { ApiProject } from "@/src/types/api";

function ProjectFormModal({
  open,
  initial,
  onClose,
  onSaved,
}: {
  open: boolean;
  initial?: ApiProject | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("published");
  const [images, setImages] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setLiveUrl(initial?.live_url ?? "");
    setGithubUrl(initial?.github_url ?? "");
    setTags(
      Array.isArray(initial?.tags)
        ? initial.tags.join(", ")
        : String(initial?.tags ?? ""),
    );
    setFeatured(!!initial?.featured);
    setStatus(initial?.status ?? "published");
    setImages(null);
  }, [open, initial]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("live_url", liveUrl);
    fd.append("github_url", githubUrl);
    fd.append("tags", tags);
    fd.append("featured", String(featured));
    fd.append("status", status);
    if (images) {
      Array.from(images).forEach((file) => fd.append("images", file));
    }
    try {
      if (initial?.id) {
        await updateProject(String(initial.id), fd);
      } else {
        await createProject(fd);
      }
      onSaved();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="my-8 w-full max-w-lg rounded-xl border bg-white p-6 dark:bg-muted-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold">
          {initial ? "Edit project" : "New project"}
        </h2>
        <div className="space-y-3">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            placeholder="Live URL"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="GitHub URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="w-full text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded border px-4 py-2 text-sm">
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
  );
}

function ProjectsContent() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ApiProject | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggleFeatured = async (id: string) => {
    setTogglingId(id);
    try {
      await toggleFeatured(id);
      load();
    } finally {
      setTogglingId(null);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateStatus(id, status);
    load();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
      load();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button
          type="button"
          className="btn-primary text-sm"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          Create New Project
        </button>
      </div>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border dark:border-muted-700">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted-50 dark:bg-muted-900">
              <tr>
                <th className="px-4 py-3">Thumb</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={String(p.id)} className="border-b dark:border-muted-800">
                  <td className="px-4 py-3">
                    {p.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.thumbnail}
                        alt=""
                        className="h-10 w-16 rounded object-cover"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">
                    <select
                      value={p.status ?? "published"}
                      onChange={(e) =>
                        handleStatusChange(String(p.id), e.target.value)
                      }
                      className="rounded border px-2 py-1 text-xs"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={togglingId === String(p.id)}
                      onClick={() => handleToggleFeatured(String(p.id))}
                      className="text-sm text-primary-600 disabled:opacity-60"
                    >
                      {p.featured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="mr-2 text-sm text-primary-600"
                      onClick={() => {
                        setEditing(p);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() => setDeleteId(String(p.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ProjectFormModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSaved={load}
      />
      <ConfirmDialog
        open={!!deleteId}
        message="Delete this project?"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default function AdminProjectsPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <ProjectsContent />
      </AdminLayout>
    </AdminGuard>
  );
}
