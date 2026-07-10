export type AuthLoginResponse = { token: string };

export type AnalyticsSummary = {
  totalVisits: number;
  visitsToday: number;
  visitsThisWeek: number;
  visitsThisMonth: number;
  topPages: { path: string; count: number }[];
};

export type PageViewRow = { path: string; count: number };

export type ApiProject = {
  id: string | number;
  title: string;
  description?: string;
  live_url?: string;
  github_url?: string;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  featured?: boolean;
  status?: string;
  category?: "Frontend" | "Backend";
  role?: string;
  detailPath?: string;
};

export type ApiSkill = {
  id: string | number;
  name: string;
  category: string;
  proficiency?: string;
};

export type ApiExperience = {
  id: string | number;
  company: string;
  role: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  type?: "work" | "education";
  year?: string;
  title?: string;
  achievements?: string[];
};

export type ContactMessage = {
  id: string | number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: string;
  created_at?: string;
};

export type ContactSubmitData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ApiTestimonial = {
  id: string | number;
  name: string;
  role?: string;
  company?: string;
  message: string;
  approved?: boolean;
};

export type ResumeMeta = {
  filename?: string;
  file_url?: string;
  url?: string;
  uploaded_at?: string;
  uploadDate?: string;
};
