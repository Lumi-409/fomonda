import { CheckCard, CheckListItem, StockEntry, JudgmentRecord } from "@/lib/types";

interface JudgmentRow {
  id: string;
  session_id: string;
  stock_code: string;
  stock_name: string;
  holding: boolean;
  reason: string;
  check_card: unknown;
  created_at: string;
}

function supabaseHeaders() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!process.env.SUPABASE_URL || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되어 있지 않아요."
    );
  }
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

export async function fetchEntriesBySession(sessionId: string): Promise<StockEntry[]> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/judgments?session_id=eq.${encodeURIComponent(
    sessionId
  )}&order=created_at.desc`;

  const res = await fetch(url, {
    headers: supabaseHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Supabase 조회 실패 (status: ${res.status})`);
  }

  const rows: JudgmentRow[] = await res.json();
  return groupRowsByStock(rows);
}

interface InsertJudgmentArgs {
  sessionId: string;
  stockCode: string;
  stockName: string;
  holding: boolean;
  reason: string;
  checkCard: CheckCard;
}

export async function insertJudgment(args: InsertJudgmentArgs): Promise<void> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/judgments`;

  const res = await fetch(url, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify({
      session_id: args.sessionId,
      stock_code: args.stockCode,
      stock_name: args.stockName,
      holding: args.holding,
      reason: args.reason,
      check_card: args.checkCard,
    }),
  });

  if (!res.ok) {
    throw new Error(`Supabase 저장 실패 (status: ${res.status})`);
  }
}

export async function deleteEntry(sessionId: string, stockCode: string): Promise<void> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/judgments?session_id=eq.${encodeURIComponent(
    sessionId
  )}&stock_code=eq.${encodeURIComponent(stockCode)}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
  });

  if (!res.ok) {
    throw new Error(`Supabase 삭제 실패 (status: ${res.status})`);
  }
}

function groupRowsByStock(rows: JudgmentRow[]): StockEntry[] {
  const entries = new Map<string, StockEntry>();

  for (const row of rows) {
    const record: JudgmentRecord = {
      id: row.id,
      reason: row.reason,
      checkCard: normalizeCheckCard(row.check_card),
      createdAt: row.created_at,
    };

    const existing = entries.get(row.stock_code);
    if (existing) {
      existing.judgments.push(record);
      continue;
    }

    entries.set(row.stock_code, {
      stock: { code: row.stock_code, name: row.stock_name },
      holding: row.holding,
      judgments: [record],
    });
  }

  return Array.from(entries.values());
}

// 결과 카드 스키마가 (summary/weakPoints:string/newsConnection) → (summaryHeadline/weakPoints:CheckListItem[]/evidence)로
// 바뀌기 전에 저장된 레코드도 안전하게 표시하기 위한 하위 호환 변환.
function normalizeCheckCard(raw: unknown): CheckCard {
  const data = (raw ?? {}) as Record<string, unknown>;

  if (isCurrentShape(data)) {
    return {
      summaryHeadline: data.summaryHeadline as string,
      summary: data.summary as string,
      weakPoints: data.weakPoints as CheckListItem[],
      evidence: data.evidence as CheckListItem[],
      checkQuestions: (data.checkQuestions as string[]) ?? [],
    };
  }

  const legacySummary = typeof data.summary === "string" ? data.summary : "";
  const legacyWeakPoints = typeof data.weakPoints === "string" ? data.weakPoints : "";
  const legacyNewsConnection =
    typeof data.newsConnection === "string" ? data.newsConnection : "";

  return {
    summaryHeadline: legacySummary,
    summary: legacySummary,
    weakPoints: legacyWeakPoints ? [{ claim: legacyWeakPoints, detail: "" }] : [],
    evidence: legacyNewsConnection ? [{ claim: legacyNewsConnection, detail: "" }] : [],
    checkQuestions: Array.isArray(data.checkQuestions) ? (data.checkQuestions as string[]) : [],
  };
}

function isCurrentShape(data: Record<string, unknown>): boolean {
  return (
    typeof data.summaryHeadline === "string" &&
    Array.isArray(data.weakPoints) &&
    Array.isArray(data.evidence)
  );
}
