import api from "@/src/lib/api";
import { asArray } from "@/src/lib/normalizeApi";
import type { ApiTestimonial } from "@/src/types/api";

export async function getTestimonials() {
  const { data } = await api.get("/api/testimonials");
  return asArray<ApiTestimonial>(data);
}

export async function getAllTestimonials() {
  const { data } = await api.get("/api/testimonials/all");
  return asArray<ApiTestimonial>(data);
}

export async function submitTestimonial(data: Partial<ApiTestimonial>) {
  const { data: created } = await api.post<ApiTestimonial>(
    "/api/testimonials",
    data,
  );
  return created;
}

export async function toggleApprove(id: string) {
  const { data } = await api.patch<ApiTestimonial>(
    `/api/testimonials/${id}/approve`,
  );
  return data;
}

export async function deleteTestimonial(id: string) {
  const { data } = await api.delete(`/api/testimonials/${id}`);
  return data;
}
