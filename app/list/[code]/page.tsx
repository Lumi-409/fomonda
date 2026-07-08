"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";

export default function StockTimelinePage() {
  const router = useRouter();
  const params = useParams<{ code: string }>();
  const { getEntry, selectStock, setHolding } = useAppContext();

  const entry = getEntry(params.code);

  useEffect(() => {
    if (!entry) {
      router.replace("/list");
    }
  }, [entry, router]);

  if (!entry) {
    return null;
  }

  const handleRecheck = () => {
    selectStock(entry.stock);
    setHolding(entry.holding);
    router.push("/reason");
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{entry.stock.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {entry.stock.code} · {entry.holding ? "보유" : "관심"} · 판단 기록{" "}
            {entry.judgments.length}건
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {entry.judgments.map((judgment) => (
            <div
              key={judgment.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4"
            >
              <span className="text-xs text-slate-400">
                {new Date(judgment.createdAt).toLocaleString()}
              </span>
              <p className="text-sm text-slate-800">{judgment.reason}</p>
              <p className="text-sm leading-relaxed text-slate-600">
                {judgment.checkCard.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      <PrimaryButton onClick={handleRecheck}>이 종목 다시 점검하기</PrimaryButton>
    </div>
  );
}
