import { NextRequest, NextResponse } from "next/server";
import { fetchStockNews } from "@/lib/news/naver";
import { generateCheckCard } from "@/lib/ai/check-card";
import { checkRateLimit, logCheckRequest, pruneOldCheckRequests } from "@/lib/db/rate-limit";

const FAILURE_MESSAGE = "지금 점검이 어려워요. 잠시 후 다시 시도해주세요";
const MAX_REASON_LENGTH = 200;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

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

  const ip = getClientIp(request);

  // 레이트 리밋은 어뷰징 방지용 부가 장치일 뿐이라, Supabase 조회/기록 자체가 실패해도
  // 핵심 기능(AI 점검)까지 막히지 않도록 fail-open으로 처리한다. 실제 초과 판정만 차단한다.
  try {
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: rateLimit.reason }, { status: 429 });
    }
    await logCheckRequest(ip);
    pruneOldCheckRequests(ip);
  } catch (error) {
    console.error("[/api/check] rate limit check failed, allowing request through:", error);
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
