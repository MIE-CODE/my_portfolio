"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import {
  deleteMessage,
  getMessages,
  markAsRead,
} from "@/src/services/contact.service";
import type { ContactMessage } from "@/src/types/api";

function MessagesContent() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getMessages()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          const da = new Date(a.created_at ?? a.createdAt ?? 0).getTime();
          const db = new Date(b.created_at ?? b.createdAt ?? 0).getTime();
          return db - da;
        });
        setMessages(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleMarkRead = async (id: string) => {
    setActionId(id);
    try {
      await markAsRead(id);
      load();
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionId(id);
    try {
      await deleteMessage(id);
      if (expandedId === id) setExpandedId(null);
      load();
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Messages</h1>
      {loading ? (
        <p className="text-sm text-muted-500">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-muted-500">No messages</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg) => {
            const id = String(msg.id);
            const unread = !msg.read;
            const expanded = expandedId === id;
            return (
              <li
                key={id}
                className={`rounded-lg border p-4 ${
                  unread
                    ? "border-primary-300 bg-primary-50/50 font-medium dark:border-primary-800 dark:bg-primary-950/30"
                    : "border-muted-200 dark:border-muted-700"
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setExpandedId(expanded ? null : id)}
                >
                  <span className="block text-sm">
                    {msg.name} &lt;{msg.email}&gt;
                  </span>
                  <span className="text-sm text-muted-600">{msg.subject}</span>
                </button>
                {expanded ? (
                  <div className="mt-3 border-t pt-3 dark:border-muted-700">
                    <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                    <div className="mt-3 flex gap-2">
                      {unread ? (
                        <button
                          type="button"
                          disabled={actionId === id}
                          onClick={() => handleMarkRead(id)}
                          className="text-sm text-primary-600 disabled:opacity-60"
                        >
                          {actionId === id ? "Updating…" : "Mark as read"}
                        </button>
                      ) : null}
                      <button
                        type="button"
                        disabled={actionId === id}
                        onClick={() => handleDelete(id)}
                        className="text-sm text-red-600 disabled:opacity-60"
                      >
                        {actionId === id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminGuard>
      <AdminLayout>
        <MessagesContent />
      </AdminLayout>
    </AdminGuard>
  );
}
