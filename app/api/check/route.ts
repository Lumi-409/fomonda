import { NextRequest, NextResponse } from "next/server";
import { fetchStockNews } from "@/lib/news/naver";
import { generateCheckCard } from "@/lib/ai/check-card";

const FAILURE_MESSAGE = "지금 점검이 어려워요. 잠시 후 다시 시도해주세요";
const MAX_REASON_LENGTH = 200;

export async function POST(request: NextRequest) {
  let body: { stockName?: string; reason?: string; holding?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  const { stockName, reason, holding } = body;
  if (!stockName || !reason || typeof holding !== "boolean") {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }
  if (reason.length > MAX_REASON_LENGTH) {
    return NextResponse.json(
      { error: `판단 이유는 ${MAX_REASON_LENGTH}자 이내로 입력해주세요.` },
      { status: 400 }
    );
  }

  try {
    const news = await fetchStockNews(stockName);
    const checkCard = await generateCheckCard({ stockName, holding, reason, news });
    return NextResponse.json({ checkCard });
  } catch (error) {
    console.error("[/api/check] failed:", error);
    return NextResponse.json({ error: FAILURE_MESSAGE }, { status: 502 });
  }
}
