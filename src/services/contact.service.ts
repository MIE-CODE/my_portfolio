import api from "@/src/lib/api";
import { asArray } from "@/src/lib/normalizeApi";
import type { ContactMessage, ContactSubmitData } from "@/src/types/api";

export async function submitContact(data: ContactSubmitData) {
  const { data: result } = await api.post("/api/contact", data);
  return result;
}

export async function getMessages() {
  const { data } = await api.get("/api/contact");
  return asArray<ContactMessage>(data);
}

export async function markAsRead(id: string) {
  const { data } = await api.patch(`/api/contact/${id}/read`);
  return data;
}

export async function deleteMessage(id: string) {
  const { data } = await api.delete(`/api/contact/${id}`);
  return data;
}
