const BURST_WINDOW_MS = 10_000;
const BURST_MAX = 1;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;
const DAILY_MAX = 30;
const PRUNE_AGE_MS = 25 * 60 * 60 * 1000;

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

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/check_requests?ip=eq.${encodeURIComponent(
    ip
  )}&select=created_at&order=created_at.desc&limit=${DAILY_MAX + 1}`;

  const res = await fetch(url, { headers: supabaseHeaders(), cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Supabase 조회 실패 (status: ${res.status})`);
  }

  const rows: { created_at: string }[] = await res.json();
  const now = Date.now();

  const withinDay = rows.filter((row) => now - new Date(row.created_at).getTime() < DAILY_WINDOW_MS);
  if (withinDay.length >= DAILY_MAX) {
    return { allowed: false, reason: "오늘 이용 가능한 점검 횟수를 모두 사용했어요. 내일 다시 시도해주세요." };
  }

  const withinBurst = withinDay.filter((row) => now - new Date(row.created_at).getTime() < BURST_WINDOW_MS);
  if (withinBurst.length >= BURST_MAX) {
    return { allowed: false, reason: "요청이 너무 잦아요. 잠시 후 다시 시도해주세요." };
  }

  return { allowed: true };
}

export async function logCheckRequest(ip: string): Promise<void> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/check_requests`;
  const res = await fetch(url, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify({ ip }),
  });
  if (!res.ok) {
    throw new Error(`Supabase 저장 실패 (status: ${res.status})`);
  }
}

// 응답 지연에 영향을 주지 않도록 호출부에서 await하지 않고 fire-and-forget으로 쓴다.
export async function pruneOldCheckRequests(ip: string): Promise<void> {
  const cutoff = new Date(Date.now() - PRUNE_AGE_MS).toISOString();
  const url = `${process.env.SUPABASE_URL}/rest/v1/check_requests?ip=eq.${encodeURIComponent(
    ip
  )}&created_at=lt.${encodeURIComponent(cutoff)}`;
  await fetch(url, { method: "DELETE", headers: { ...supabaseHeaders(), Prefer: "return=minimal" } }).catch(
    (error) => {
      console.error("[rate-limit] prune failed:", error);
    }
  );
}
