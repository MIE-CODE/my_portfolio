import api from "@/src/lib/api";
import type { AuthLoginResponse } from "@/src/types/api";

export async function login(adminId: string, password: string) {
  const { data } = await api.post<AuthLoginResponse>("/auth/login", {
    adminId,
    password,
  });
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function getMe() {
  const { data } = await api.get("/api/auth/me");
  return data;
}
