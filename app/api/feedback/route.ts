import { NextRequest, NextResponse } from "next/server";
import { insertFeedback } from "@/lib/db/feedback";

export async function POST(request: NextRequest) {
  let body: { sessionId?: string; content?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  const { sessionId, content } = body;
  if (!sessionId || !content || !content.trim()) {
    return NextResponse.json({ error: "요청 형식이 올바르지 않아요." }, { status: 400 });
  }

  try {
    await insertFeedback({ sessionId, content: content.trim() });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/feedback POST] failed:", error);
    return NextResponse.json({ error: "의견 등록에 실패했어요." }, { status: 502 });
  }
}
