import { NextRequest, NextResponse } from "next/server";
import { getAllKrxStocks } from "@/lib/stocks/krx";
import { DUMMY_STOCK_LIST } from "@/lib/stocks/dummy-stock-list";
import { stockMatches } from "@/lib/stocks";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const trimmed = query.trim();
  if (!trimmed) {
    return NextResponse.json({ stocks: [] });
  }

  try {
    const allStocks = await getAllKrxStocks();
    const stocks = allStocks.filter((stock) => stockMatches(stock, trimmed)).slice(0, 20);
    return NextResponse.json({ stocks });
  } catch (error) {
    console.error("[/api/stocks] KRX 조회 실패, 더미 리스트로 대체:", error);
    const fallback = DUMMY_STOCK_LIST.filter((stock) => stockMatches(stock, trimmed));
    return NextResponse.json({ stocks: fallback });
  }
}
