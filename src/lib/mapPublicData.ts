import type { ApiExperience, ApiProject, ApiSkill } from "@/src/types/api";
import type { PreviewImage } from "@/src/components/SitePreview";

export type ProjectCardData = {
  id: number | string;
  img: PreviewImage | string;
  skills: string[];
  title: string;
  description: string;
  link: string;
  githubLink: string;
  category: "Frontend" | "Backend";
  role?: string;
  detailPath?: string;
};

export type ExperienceItem = {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  type?: "work" | "education";
};

export type StackSkillItem = {
  id: string;
  name: string;
  category: string;
  proficiency?: string;
  xp?: number;
};

function normalizeTags(tags?: string[] | string): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return String(tags)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function mapApiProjectToCard(project: ApiProject): ProjectCardData {
  const thumbnail = project.thumbnail ?? "/blivap.png";
  return {
    id: project.id,
    img: thumbnail,
    skills: normalizeTags(project.tags),
    title: project.title,
    description: project.description ?? "",
    link: project.live_url ?? "#",
    githubLink: project.github_url ?? "#",
    category: project.category ?? "Frontend",
    role: project.role,
    detailPath: project.detailPath ?? `/projects/${project.id}`,
  };
}

export function mapApiProjects(projects: ApiProject[]): ProjectCardData[] {
  return projects.map(mapApiProjectToCard);
}

export function mapApiExperience(item: ApiExperience): ExperienceItem {
  const start = item.start_date ?? "";
  const end = item.end_date ?? "Present";
  const year =
    item.year ?? (start ? `${start} - ${end}` : end);
  return {
    year,
    title: item.role ?? item.title ?? "",
    company: item.company,
    description: item.description ?? "",
    achievements: item.achievements ?? [],
    type: item.type,
  };
}

export function mapApiExperiences(items: ApiExperience[]): ExperienceItem[] {
  return items.map(mapApiExperience);
}

export function mapApiSkill(skill: ApiSkill): StackSkillItem {
  return {
    id: String(skill.id),
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
    xp: 1000,
  };
}

export function mapApiSkills(skills: ApiSkill[]): StackSkillItem[] {
  return skills.map(mapApiSkill);
}

export function groupSkillsByCategory(skills: StackSkillItem[]) {
  const map = new Map<string, StackSkillItem[]>();
  for (const skill of skills) {
    const list = map.get(skill.category) ?? [];
    list.push(skill);
    map.set(skill.category, list);
  }
  return map;
}
