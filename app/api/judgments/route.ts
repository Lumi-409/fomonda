import { NextRequest, NextResponse } from "next/server";
import { fetchEntriesBySession, insertJudgment, deleteEntry } from "@/lib/db/judgments";
import { CheckCard } from "@/lib/types";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId가 필요해요." }, { status: 400 });
  }

  try {
    const entries = await fetchEntriesBySession(sessionId);
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("[/api/judgments GET] failed:", error);
    return NextResponse.json({ error: "기록을 불러오지 못했어요." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  let body: {
    sessionId?: string;
    stockCode?: string;
    stockName?: string;
    holding?: boolean;
    reason?: string;
    checkCard?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  const { sessionId, stockCode, stockName, holding, reason, checkCard } = body;
  if (
    !sessionId ||
    !stockCode ||
    !stockName ||
    typeof holding !== "boolean" ||
    !reason ||
    typeof checkCard !== "object" ||
    checkCard === null
  ) {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  try {
    await insertJudgment({
      sessionId,
      stockCode,
      stockName,
      holding,
      reason,
      checkCard: checkCard as CheckCard,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/judgments POST] failed:", error);
    return NextResponse.json({ error: "기록 저장에 실패했어요." }, { status: 502 });
  }
}

export async function DELETE(request: NextRequest) {
  let body: { sessionId?: string; stockCode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  const { sessionId, stockCode } = body;
  if (!sessionId || !stockCode) {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  try {
    await deleteEntry(sessionId, stockCode);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/judgments DELETE] failed:", error);
    return NextResponse.json({ error: "삭제에 실패했어요." }, { status: 502 });
  }
}
