import api from "@/src/lib/api";
import { asArray } from "@/src/lib/normalizeApi";
import type { ApiSkill } from "@/src/types/api";

export async function getSkills() {
  const { data } = await api.get("/api/skills");
  return asArray<ApiSkill>(data);
}

export async function createSkill(data: Partial<ApiSkill>) {
  const { data: created } = await api.post<ApiSkill>("/api/skills", data);
  return created;
}

export async function updateSkill(id: string, data: Partial<ApiSkill>) {
  const { data: updated } = await api.put<ApiSkill>(`/api/skills/${id}`, data);
  return updated;
}

export async function deleteSkill(id: string) {
  const { data } = await api.delete(`/api/skills/${id}`);
  return data;
}
