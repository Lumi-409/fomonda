export interface Stock {
  code: string;
  name: string;
}

export interface CheckCard {
  summary: string;
  weakPoints: string;
  newsConnection: string;
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
