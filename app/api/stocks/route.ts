import { NextRequest, NextResponse } from "next/server";
import { getAllKrxStocks } from "@/lib/stocks/krx";
import { DUMMY_STOCK_LIST } from "@/lib/stocks/dummy-stock-list";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const trimmed = query.trim();
  if (!trimmed) {
    return NextResponse.json({ stocks: [] });
  }

  try {
    const allStocks = await getAllKrxStocks();
    const stocks = allStocks
      .filter((stock) => stock.name.includes(trimmed) || stock.code.includes(trimmed))
      .slice(0, 20);
    return NextResponse.json({ stocks });
  } catch (error) {
    console.error("[/api/stocks] KRX 조회 실패, 더미 리스트로 대체:", error);
    const fallback = DUMMY_STOCK_LIST.filter(
      (stock) => stock.name.includes(trimmed) || stock.code.includes(trimmed)
    );
    return NextResponse.json({ stocks: fallback });
  }
}
