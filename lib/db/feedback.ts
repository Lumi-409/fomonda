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

interface InsertFeedbackArgs {
  sessionId: string;
  content: string;
}

export async function insertFeedback(args: InsertFeedbackArgs): Promise<void> {
  const url = `${process.env.SUPABASE_URL}/rest/v1/feedback`;

  const res = await fetch(url, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify({
      session_id: args.sessionId,
      content: args.content,
    }),
  });

  if (!res.ok) {
    throw new Error(`Supabase 저장 실패 (status: ${res.status})`);
  }
}
