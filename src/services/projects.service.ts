import api from "@/src/lib/api";
import { asArray } from "@/src/lib/normalizeApi";
import type { ApiProject } from "@/src/types/api";

export async function getProjects() {
  const { data } = await api.get("/api/projects");
  return asArray<ApiProject>(data);
}

export async function getFeaturedProjects() {
  const { data } = await api.get("/api/projects/featured");
  return asArray<ApiProject>(data);
}

export async function getProject(id: string) {
  const { data } = await api.get<ApiProject>(`/api/projects/${id}`);
  return data;
}

export async function createProject(formData: FormData) {
  const { data } = await api.post<ApiProject>("/api/projects", formData);
  return data;
}

export async function updateProject(id: string, formData: FormData) {
  const { data } = await api.put<ApiProject>(`/api/projects/${id}`, formData);
  return data;
}

export async function deleteProject(id: string) {
  const { data } = await api.delete(`/api/projects/${id}`);
  return data;
}

export async function toggleFeatured(id: string) {
  const { data } = await api.patch<ApiProject>(`/api/projects/${id}/feature`);
  return data;
}

export async function updateStatus(id: string, status: string) {
  const { data } = await api.patch<ApiProject>(`/api/projects/${id}/status`, {
    status,
  });
  return data;
}
