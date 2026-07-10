import { getExperience } from "@/src/services/experience.service";
import { getFeaturedProjects, getProject, getProjects } from "@/src/services/projects.service";
import { getResume } from "@/src/services/resume.service";
import { getSkills } from "@/src/services/skills.service";

/** Placeholder / missing API — skip network during build & local without a real backend. */
function isApiConfigured() {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!url) return false;
  return !/your-backend-url|example\.com|localhost|127\.0\.0\.1/i.test(url);
}

async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isApiConfigured()) return fallback;
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function safeGetSkills() {
  return safeCall(getSkills, []);
}

export async function safeGetFeaturedProjects() {
  return safeCall(getFeaturedProjects, []);
}

export async function safeGetProjects() {
  return safeCall(getProjects, []);
}

export async function safeGetProject(id: string) {
  return safeCall(() => getProject(id), null);
}

export async function safeGetExperience() {
  return safeCall(getExperience, []);
}

export async function safeGetResume() {
  return safeCall(getResume, null);
}
