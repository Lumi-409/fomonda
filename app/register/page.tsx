"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useCheckFlow } from "@/lib/context/check-flow-context";
import { ConcernType, HoldingStatus } from "@/lib/types";

const HOLDING_OPTIONS: HoldingStatus[] = ["관심", "보유"];
const CONCERN_OPTIONS: ConcernType[] = ["매수 고민", "매도 고민"];

export default function RegisterPage() {
  const router = useRouter();
  const { setStockInfo } = useCheckFlow();

  const [stockName, setStockName] = useState("");
  const [holdingStatus, setHoldingStatus] = useState<HoldingStatus | null>(null);
  const [concernType, setConcernType] = useState<ConcernType | null>(null);

  const canProceed = stockName.trim().length > 0 && holdingStatus && concernType;

  const handleNext = () => {
    if (!canProceed || !holdingStatus || !concernType) return;
    setStockInfo(stockName.trim(), holdingStatus, concernType);
    router.push("/reason");
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900">종목 등록</h1>
          <p className="mt-1 text-sm text-slate-500">
            지금 고민 중인 종목 정보를 알려주세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="stockName" className="text-sm font-medium text-slate-700">
            종목명
          </label>
          <input
            id="stockName"
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            placeholder="예: 삼성전자"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">현재 상태</span>
          <div className="flex gap-2">
            {HOLDING_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setHoldingStatus(option)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  holdingStatus === option
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">현재 고민 상태</span>
          <div className="flex gap-2">
            {CONCERN_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setConcernType(option)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  concernType === option
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PrimaryButton onClick={handleNext} disabled={!canProceed}>
        다음
      </PrimaryButton>
    </div>
  );
}
