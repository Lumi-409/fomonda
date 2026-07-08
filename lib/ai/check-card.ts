import { CheckCard } from "@/lib/types";
import { NewsItem } from "@/lib/news/naver";

const OPENAI_MODEL = "gpt-5.4-mini";

const SYSTEM_PROMPT = `당신은 투자자가 스스로 판단 이유를 점검하도록 돕는 메타인지 코치입니다.
- 사용자의 판단을 비판하거나 감정을 자극하지 마세요. 중립적이고 질문형 톤을 유지하세요.
- 매수·매도를 추천하지 마세요.
- "~하세요" 같은 지시형 표현을 쓰지 마세요.
- 목적은 사용자가 스스로 판단 이유를 다시 보게 만드는 것입니다.
- 인지적 재평가, 표현적 글쓰기, 메타인지 훈련, 손실회피/처분효과 관점을 참고해 문구를 구성하세요.
- check_question_1, check_question_2는 항상 작성하고, 세 번째 질문이 필요 없으면 check_question_3을 null로 두세요.`;

// strict 모드는 모든 필드를 required로 요구하므로, 2~3개 가변 개수는
// check_question_3을 nullable로 두는 방식으로 표현한다.
const CHECK_CARD_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string", description: "판단 요약 1~2문장" },
    weak_points: { type: "string", description: "근거로 보기 어려운 부분 1~2문장" },
    news_connection: {
      type: "string",
      description: "관련 객관적 자료(뉴스) 연결 포인트 1~2문장",
    },
    check_question_1: { type: "string" },
    check_question_2: { type: "string" },
    check_question_3: { type: ["string", "null"] },
  },
  required: [
    "summary",
    "weak_points",
    "news_connection",
    "check_question_1",
    "check_question_2",
    "check_question_3",
  ],
  additionalProperties: false,
} as const;

interface GenerateArgs {
  stockName: string;
  holding: boolean;
  reason: string;
  news: NewsItem[];
}

interface ResponsesApiResult {
  output_text?: string;
  output?: {
    type: string;
    content?: { type: string; text?: string }[];
  }[];
}

export async function generateCheckCard({
  stockName,
  holding,
  reason,
  news,
}: GenerateArgs): Promise<CheckCard> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY 환경변수가 설정되어 있지 않아요.");
  }

  const userPrompt = `종목명: ${stockName}
보유 여부: ${holding ? "보유 중" : "관심 종목(미보유)"}
판단 이유: ${reason}

관련 최신 뉴스:
${
  news.length > 0
    ? news.map((item, index) => `${index + 1}. ${item.title} - ${item.summary}`).join("\n")
    : "관련 뉴스를 찾지 못했어요."
}`;

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "check_card",
          strict: true,
          schema: CHECK_CARD_SCHEMA,
        },
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`OpenAI API 요청 실패 (status: ${res.status}) ${errorBody}`);
  }

  const data: ResponsesApiResult = await res.json();
  const content = extractOutputText(data);
  if (!content) {
    throw new Error("OpenAI 응답 형식이 올바르지 않아요.");
  }

  return normalizeCheckCard(JSON.parse(content));
}

function extractOutputText(data: ResponsesApiResult): string | null {
  if (typeof data.output_text === "string") return data.output_text;

  const message = data.output?.find((item) => item.type === "message");
  const textPart = message?.content?.find((part) => part.type === "output_text");
  return typeof textPart?.text === "string" ? textPart.text : null;
}

function normalizeCheckCard(raw: unknown): CheckCard {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("점검 카드 파싱에 실패했어요.");
  }

  const {
    summary,
    weak_points,
    news_connection,
    check_question_1,
    check_question_2,
    check_question_3,
  } = raw as Record<string, unknown>;

  if (
    typeof summary !== "string" ||
    typeof weak_points !== "string" ||
    typeof news_connection !== "string" ||
    typeof check_question_1 !== "string" ||
    typeof check_question_2 !== "string" ||
    (check_question_3 !== null && typeof check_question_3 !== "string")
  ) {
    throw new Error("점검 카드 파싱에 실패했어요.");
  }

  return {
    summary,
    weakPoints: weak_points,
    newsConnection: news_connection,
    checkQuestions: [check_question_1, check_question_2, ...(check_question_3 ? [check_question_3] : [])],
  };
}
