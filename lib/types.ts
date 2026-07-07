export type HoldingStatus = "관심" | "보유";

export type ConcernType = "매수 고민" | "매도 고민";

export interface CheckCard {
  summary: string;
  weakPoints: string;
  newsConnection: string;
  checkQuestions: [string, string, string];
}
