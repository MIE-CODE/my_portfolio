import api from "@/src/lib/api";
import type { ResumeMeta } from "@/src/types/api";

export async function getResume() {
  const { data } = await api.get<ResumeMeta>("/api/resume");
  return data;
}

export async function uploadResume(formData: FormData) {
  const { data } = await api.post<ResumeMeta>("/api/resume", formData);
  return data;
}

export async function deleteResume() {
  const { data } = await api.delete("/api/resume");
  return data;
}
