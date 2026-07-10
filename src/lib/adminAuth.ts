export const ADMIN_TOKEN_KEY = "admin_token";
export const ADMIN_SESSION_CLEARED_EVENT = "admin-session-cleared";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {
    /* private mode / quota */
  }
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.dispatchEvent(new CustomEvent(ADMIN_SESSION_CLEARED_EVENT));
  } catch {
    /* ignore */
  }
}
