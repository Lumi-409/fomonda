"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { CheckCard, ConcernType, HoldingStatus } from "../types";

interface CheckFlowState {
  stockName: string;
  holdingStatus: HoldingStatus | null;
  concernType: ConcernType | null;
  reason: string;
  checkCard: CheckCard | null;
  savedCriterion: string | null;
}

interface CheckFlowContextValue extends CheckFlowState {
  setStockInfo: (
    stockName: string,
    holdingStatus: HoldingStatus,
    concernType: ConcernType
  ) => void;
  setReason: (reason: string) => void;
  setCheckCard: (card: CheckCard) => void;
  setSavedCriterion: (text: string) => void;
  reset: () => void;
}

const initialState: CheckFlowState = {
  stockName: "",
  holdingStatus: null,
  concernType: null,
  reason: "",
  checkCard: null,
  savedCriterion: null,
};

const CheckFlowContext = createContext<CheckFlowContextValue | null>(null);

export function CheckFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckFlowState>(initialState);

  const value = useMemo<CheckFlowContextValue>(
    () => ({
      ...state,
      setStockInfo: (stockName, holdingStatus, concernType) =>
        setState((prev) => ({ ...prev, stockName, holdingStatus, concernType })),
      setReason: (reason) => setState((prev) => ({ ...prev, reason })),
      setCheckCard: (card) => setState((prev) => ({ ...prev, checkCard: card })),
      setSavedCriterion: (text) =>
        setState((prev) => ({ ...prev, savedCriterion: text })),
      reset: () => setState(initialState),
    }),
    [state]
  );

  return (
    <CheckFlowContext.Provider value={value}>{children}</CheckFlowContext.Provider>
  );
}

export function useCheckFlow() {
  const ctx = useContext(CheckFlowContext);
  if (!ctx) {
    throw new Error("useCheckFlow는 CheckFlowProvider 내부에서만 사용할 수 있어요.");
  }
  return ctx;
}
