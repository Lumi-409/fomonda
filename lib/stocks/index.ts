import { Stock } from "@/lib/types";
import { DUMMY_STOCK_LIST } from "./dummy-stock-list";

// 추천 종목: 실시간 랭킹이 아니라 고정된 안내용 목록.
const RECOMMENDED_CODES = ["005930", "000660", "035420", "035720"];

export function getRecommendedStocks(): Stock[] {
  return DUMMY_STOCK_LIST.filter((stock) => RECOMMENDED_CODES.includes(stock.code));
}

/**
 * M1 임시 하드코딩 검색. M2에서 금융위원회 KRX 상장종목정보 API 연동으로
 * 교체할 때 이 함수의 내부 구현만 바꾸면 되도록 시그니처를 맞춰둔다.
 */
export async function searchStocks(query: string): Promise<Stock[]> {
  const trimmed = query.trim();
  if (!trimmed) return DUMMY_STOCK_LIST;

  return DUMMY_STOCK_LIST.filter(
    (stock) => stock.name.includes(trimmed) || stock.code.includes(trimmed)
  );
}
