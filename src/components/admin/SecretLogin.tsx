"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/src/context/AdminAuthContext";
import { lockScroll, unlockScroll } from "@/src/lib/scrollLock";
import { CloseIcon } from "@/src/svg";

export function SecretLogin() {
  const router = useRouter();
  const { isAdmin, isLoading, login } = useAdminAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setError("");
    setAdminId("");
    setPassword("");
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase();
      const isShortcutA =
        key === "a" || e.code === "KeyA" || e.code === "Keya";
      const match =
        isShortcutA && e.shiftKey && (e.ctrlKey || e.metaKey);
      if (!match) return;
      e.preventDefault();
      if (isLoading) return;
      if (isAdmin) {
        router.push("/admin/dashboard");
        return;
      }
      setModalOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isAdmin, isLoading, router]);

  useEffect(() => {
    if (!modalOpen) {
      unlockScroll();
      return;
    }
    lockScroll();
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") closeModal();
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
      unlockScroll();
    };
  }, [modalOpen, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(adminId, password);
      closeModal();
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
      role="presentation"
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Access"
        className="relative w-full max-w-sm rounded-xl border border-muted-300 bg-muted-50 p-6 shadow-xl dark:border-muted-700 dark:bg-muted-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 rounded p-1 text-muted-500 hover:text-muted-900 dark:hover:text-muted-100"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label
              htmlFor="access-id"
              className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-500"
            >
              ID
            </label>
            <input
              id="access-id"
              type="text"
              autoComplete="username"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full rounded-lg border border-muted-300 bg-white px-3 py-2 text-sm dark:border-muted-600 dark:bg-muted-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="access-password"
              className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-500"
            >
              Password
            </label>
            <input
              id="access-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-muted-300 bg-white px-3 py-2 text-sm dark:border-muted-600 dark:bg-muted-800"
              required
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full touch-target text-sm disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
