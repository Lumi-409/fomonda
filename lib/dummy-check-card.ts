import { CheckCard, ConcernType } from "./types";

/**
 * M1 임시 더미 응답. Claude API + Naver 뉴스 API 연동은 M2에서
 * 이 함수를 실제 API 호출로 교체한다. 반환 형태는 PRD 6장의
 * JSON 스키마(summary/weak_points/news_connection/check_questions)와 동일하게 맞춘다.
 */
export function generateDummyCheckCard(
  stockName: string,
  reason: string,
  concernType: ConcernType
): CheckCard {
  const trimmedStock = stockName.trim() || "해당 종목";
  const trimmedReason = reason.trim();

  return {
    summary: `${trimmedStock}에 대한 ${concernType} 이유로 "${trimmedReason}"라는 판단을 남겼어요. 이 판단이 어떤 정보에 기반했는지 함께 짚어볼게요.`,
    weakPoints:
      "구체적인 수치나 기간보다는 최근 분위기나 느낌에 가까운 표현이 포함되어 있어요. 어떤 근거가 이 판단을 뒷받침하는지 다시 살펴볼 부분이 있어요.",
    newsConnection:
      "최근 관련 뉴스에서도 비슷한 시점에 여러 의견이 엇갈리고 있어요. 이 판단이 특정 뉴스나 커뮤니티 반응에서 영향을 받은 부분은 없는지 확인해볼 수 있어요.",
    checkQuestions: [
      "이 판단은 언제부터 갖고 있던 생각인가요, 아니면 오늘 새로 생긴 생각인가요?",
      "지금 이 판단을 뒷받침하는 정보 중 스스로 확인한 것과 남을 통해 들은 것은 각각 무엇인가요?",
      "같은 정보를 내일 다시 봐도 지금과 같은 판단을 내릴 것 같나요?",
    ],
  };
}
