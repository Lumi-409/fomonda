export interface Stock {
  code: string;
  name: string;
}

export interface CheckListItem {
  claim: string;
  detail: string;
}

export interface CheckCard {
  summaryHeadline: string;
  summary: string;
  weakPoints: CheckListItem[];
  evidence: CheckListItem[];
  checkQuestions: string[];
}

export interface JudgmentRecord {
  id: string;
  reason: string;
  checkCard: CheckCard;
  createdAt: string;
}

export interface StockEntry {
  stock: Stock;
  holding: boolean;
  judgments: JudgmentRecord[];
}
