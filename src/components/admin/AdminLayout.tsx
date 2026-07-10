"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_NAV } from "@/src/config/adminNav";
import { useAdminAuth } from "@/src/context/AdminAuthContext";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      router.replace("/");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-dvh bg-muted-100 dark:bg-muted-950">
      <aside className="flex w-56 shrink-0 flex-col border-r border-muted-300 bg-white dark:border-muted-800 dark:bg-muted-900">
        <div className="border-b border-muted-200 px-4 py-4 dark:border-muted-800">
          <span className="text-sm font-semibold text-muted-800 dark:text-muted-100">
            Console
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary-100 font-medium text-primary-800 dark:bg-primary-900/40 dark:text-primary-200"
                    : "text-muted-600 hover:bg-muted-100 dark:text-muted-400 dark:hover:bg-muted-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-muted-200 p-2 dark:border-muted-800">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-600 hover:bg-muted-100 disabled:opacity-60 dark:text-muted-400 dark:hover:bg-muted-800"
          >
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
