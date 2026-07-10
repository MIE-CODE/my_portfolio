"use client";

import { AdminAuthProvider } from "@/src/context/AdminAuthContext";
import { SecretLogin } from "@/src/components/admin/SecretLogin";

export function AdminAuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <SecretLogin />
      {children}
    </AdminAuthProvider>
  );
}
