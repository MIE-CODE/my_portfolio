import api from "@/src/lib/api";
import { asArray } from "@/src/lib/normalizeApi";
import type { ApiExperience } from "@/src/types/api";

export async function getExperience(type?: "work" | "education") {
  const { data } = await api.get("/api/experience", {
    params: type ? { type } : undefined,
  });
  return asArray<ApiExperience>(data);
}

export async function createExperience(data: Partial<ApiExperience>) {
  const { data: created } = await api.post<ApiExperience>(
    "/api/experience",
    data,
  );
  return created;
}

export async function updateExperience(
  id: string,
  data: Partial<ApiExperience>,
) {
  const { data: updated } = await api.put<ApiExperience>(
    `/api/experience/${id}`,
    data,
  );
  return updated;
}

export async function deleteExperience(id: string) {
  const { data } = await api.delete(`/api/experience/${id}`);
  return data;
}
