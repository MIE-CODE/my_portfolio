"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import { ConfirmDialog } from "@/src/components/admin/ConfirmDialog";
import {
  deleteResume,
  getResume,
  uploadResume,
} from "@/src/services/resume.service";
import type { ResumeMeta } from "@/src/types/api";

function ResumeContent() {
  const [resume, setResume] = useState<ResumeMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    setLoading(true);
    getResume()
      .then(setResume)
      .catch(() => setResume(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const fileUrl = resume?.file_url ?? resume?.url;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      await uploadResume(fd);
      load();
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteResume();
      setResume(null);
      setDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Resume</h1>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : resume && fileUrl ? (
        <div className="rounded-lg border border-muted-200 p-4 dark:border-muted-700">
          <p className="font-medium">{resume.filename ?? "resume.pdf"}</p>
          <p className="text-sm text-muted-500">
            Uploaded:{" "}
            {resume.uploaded_at ?? resume.uploadDate ?? "—"}
          </p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-4 inline-block text-sm"
          >
            Download
          </a>
        </div>
      ) : (
        <p className="text-sm text-muted-500">No resume on file</p>
      )}
      <div className="flex flex-wrap gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="btn-primary text-sm disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload New Resume"}
        </button>
        {resume ? (
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600"
          >
            Delete Resume
          </button>
        ) : null}
      </div>
      <ConfirmDialog
        open={deleteOpen}
        message="Delete the current resume?"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}

export default function AdminResumePage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <ResumeContent />
      </AdminLayout>
    </AdminGuard>
  );
}
