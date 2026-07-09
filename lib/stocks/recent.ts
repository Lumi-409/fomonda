import { Stock } from "@/lib/types";

const STORAGE_KEY = "fomonda_recent_stocks";
const MAX_RECENT = 4;

export function getRecentStocks(): Stock[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRecentStock(stock: Stock): void {
  if (typeof window === "undefined") return;
  const existing = getRecentStocks().filter((item) => item.code !== stock.code);
  const next = [stock, ...existing].slice(0, MAX_RECENT);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
