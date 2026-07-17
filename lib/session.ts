const SESSION_STORAGE_KEY = "fomonda_session_id";

export function hasExistingSession(): boolean {
  return window.localStorage.getItem(SESSION_STORAGE_KEY) !== null;
}

export function getOrCreateSessionId(): string {
  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  window.localStorage.setItem(SESSION_STORAGE_KEY, id);
  return id;
}
