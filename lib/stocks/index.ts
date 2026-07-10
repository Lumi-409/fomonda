import { Stock } from "@/lib/types";
import { DUMMY_STOCK_LIST } from "./dummy-stock-list";

// 추천 종목: 실시간 랭킹이 아니라 고정된 안내용 목록.
const RECOMMENDED_CODES = ["005930", "000660", "035420", "035720"];

export function stockMatches(stock: Stock, query: string): boolean {
  const q = query.toLowerCase();
  return stock.name.toLowerCase().includes(q) || stock.code.toLowerCase().includes(q);
}

export function getRecommendedStocks(): Stock[] {
  return DUMMY_STOCK_LIST.filter((stock) => RECOMMENDED_CODES.includes(stock.code));
}

export async function searchStocks(query: string): Promise<Stock[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const res = await fetch(`/api/stocks?q=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`/api/stocks 요청 실패 (status: ${res.status})`);
    const data: { stocks: Stock[] } = await res.json();
    return data.stocks;
  } catch {
    return DUMMY_STOCK_LIST.filter((stock) => stockMatches(stock, trimmed));
  }
}
