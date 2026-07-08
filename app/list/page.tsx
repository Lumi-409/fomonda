"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/context/app-context";

type Tab = "보유" | "관심";

export default function ListPage() {
  const router = useRouter();
  const { entries, isHydrated } = useAppContext();
  const [tab, setTab] = useState<Tab>("보유");

  const filtered = useMemo(
    () => entries.filter((entry) => (tab === "보유" ? entry.holding : !entry.holding)),
    [entries, tab]
  );

  return (
    <div className="flex flex-1 flex-col gap-6">
      <h1 className="text-xl font-bold text-slate-900">내 종목 리스트</h1>

      <div className="flex gap-2">
        {(["보유", "관심"] as Tab[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTab(option)}
            className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              tab === option
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {!isHydrated && (
          <p className="text-sm text-slate-400">불러오는 중이에요...</p>
        )}
        {isHydrated && filtered.length === 0 && (
          <p className="text-sm text-slate-400">아직 점검한 {tab} 종목이 없어요.</p>
        )}
        {filtered.map((entry) => (
          <button
            key={entry.stock.code}
            type="button"
            onClick={() => router.push(`/list/${entry.stock.code}`)}
            className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:bg-slate-50"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">
                {entry.stock.name}
              </span>
              <span className="text-xs text-slate-400">{entry.stock.code}</span>
            </div>
            <span className="text-xs text-slate-500">
              판단 기록 {entry.judgments.length}건
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
