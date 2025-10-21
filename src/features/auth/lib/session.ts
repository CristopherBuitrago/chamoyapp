import type { Role } from "../../../entities/auth/model/roles";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  name: string;
};

export type Session = {
  user: SessionUser;
  token: string;
};

const STORAGE_KEY = 'app_session';

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Session : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentRole(): Role | null {
  return getSession()?.user.role ?? null;
}
