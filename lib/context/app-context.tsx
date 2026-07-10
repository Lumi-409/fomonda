"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { CheckCard, JudgmentRecord, Stock, StockEntry } from "../types";
import { getOrCreateSessionId } from "../session";

interface DraftState {
  stock: Stock | null;
  holding: boolean | null;
  reason: string;
  checkCard: CheckCard | null;
}

interface AppContextValue {
  entries: StockEntry[];
  draft: DraftState;
  isHydrated: boolean;
  startNewCheck: () => void;
  selectStock: (stock: Stock) => void;
  setHolding: (holding: boolean) => void;
  recordJudgment: (reason: string, checkCard: CheckCard) => void;
  getEntry: (code: string) => StockEntry | undefined;
  deleteEntries: (codes: string[]) => Promise<void>;
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
  const [isHydrated, setIsHydrated] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);

    fetch(`/api/judgments?sessionId=${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : { entries: [] }))
      .then((data: { entries?: StockEntry[] }) => {
        setEntries(data.entries ?? []);
      })
      .catch((error) => {
        console.error("판단 타임라인을 불러오지 못했어요:", error);
      })
      .finally(() => setIsHydrated(true));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      entries,
      draft,
      isHydrated,
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

        if (sessionId) {
          fetch("/api/judgments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              stockCode: stock.code,
              stockName: stock.name,
              holding,
              reason,
              checkCard,
            }),
          }).catch((error) => {
            console.error("판단 기록 저장에 실패했어요:", error);
          });
        }
      },
      getEntry: (code) => entries.find((entry) => entry.stock.code === code),
      deleteEntries: async (codes) => {
        if (!sessionId || codes.length === 0) return;

        const results = await Promise.allSettled(
          codes.map((code) =>
            fetch("/api/judgments", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId, stockCode: code }),
            }).then((res) => {
              if (!res.ok) throw new Error(`삭제 실패 (status: ${res.status})`);
            })
          )
        );

        const succeededCodes = codes.filter((_, i) => results[i].status === "fulfilled");
        if (succeededCodes.length > 0) {
          const succeeded = new Set(succeededCodes);
          setEntries((prev) => prev.filter((entry) => !succeeded.has(entry.stock.code)));
        }

        const failedCount = results.filter((r) => r.status === "rejected").length;
        if (failedCount > 0) {
          throw new Error(`${failedCount}개 종목 삭제에 실패했어요.`);
        }
      },
    }),
    [entries, draft, isHydrated, sessionId]
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
