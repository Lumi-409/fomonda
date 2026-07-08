"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { CheckCard, JudgmentRecord, Stock, StockEntry } from "../types";

interface DraftState {
  stock: Stock | null;
  holding: boolean | null;
  reason: string;
  checkCard: CheckCard | null;
}

interface AppContextValue {
  entries: StockEntry[];
  draft: DraftState;
  startNewCheck: () => void;
  selectStock: (stock: Stock) => void;
  setHolding: (holding: boolean) => void;
  recordJudgment: (reason: string, checkCard: CheckCard) => void;
  getEntry: (code: string) => StockEntry | undefined;
}

const initialDraft: DraftState = {
  stock: null,
  holding: null,
  reason: "",
  checkCard: null,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<StockEntry[]>([]);
  const [draft, setDraft] = useState<DraftState>(initialDraft);

  const value = useMemo<AppContextValue>(
    () => ({
      entries,
      draft,
      startNewCheck: () => setDraft(initialDraft),
      selectStock: (stock) => setDraft({ ...initialDraft, stock }),
      setHolding: (holding) => setDraft((prev) => ({ ...prev, holding })),
      recordJudgment: (reason, checkCard) => {
        if (!draft.stock || draft.holding === null) return;
        const stock = draft.stock;
        const holding = draft.holding;

        setDraft((prev) => ({ ...prev, reason, checkCard }));

        const record: JudgmentRecord = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          reason,
          checkCard,
          createdAt: new Date().toISOString(),
        };

        setEntries((prev) => {
          const existingIndex = prev.findIndex(
            (entry) => entry.stock.code === stock.code
          );
          if (existingIndex === -1) {
            return [...prev, { stock, holding, judgments: [record] }];
          }
          const next = [...prev];
          next[existingIndex] = {
            ...next[existingIndex],
            holding,
            judgments: [record, ...next[existingIndex].judgments],
          };
          return next;
        });
      },
      getEntry: (code) => entries.find((entry) => entry.stock.code === code),
    }),
    [entries, draft]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext는 AppProvider 내부에서만 사용할 수 있어요.");
  }
  return ctx;
}
