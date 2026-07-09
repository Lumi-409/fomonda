"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";

type Tab = "보유" | "관심";

export default function ListPage() {
  const router = useRouter();
  const { entries, isHydrated, startNewCheck } = useAppContext();
  const [tab, setTab] = useState<Tab>("보유");

  const filtered = useMemo(
    () => entries.filter((entry) => (tab === "보유" ? entry.holding : !entry.holding)),
    [entries, tab]
  );

  const handleAddStock = () => {
    startNewCheck();
    router.push("/search");
  };

  return (
    <div className="flex flex-1 flex-col gap-2xl px-lg py-2xl">
      <h1 className="text-heading-sub font-semibold text-gray-950">내 종목 리스트</h1>

      <div className="flex gap-sm">
        {(["보유", "관심"] as Tab[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTab(option)}
            className={`flex-1 rounded-button px-lg py-md text-label-m font-semibold transition-colors ${
              tab === option ? "bg-gray-800 text-gray-50" : "bg-gray-100 text-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-sm">
        {!isHydrated && (
          <p className="text-label-sm text-gray-400">불러오는 중이에요...</p>
        )}
        {isHydrated && filtered.length === 0 && (
          <p className="text-label-sm text-gray-400">아직 점검한 {tab} 종목이 없어요.</p>
        )}
        {filtered.map((entry) => (
          <button
            key={entry.stock.code}
            type="button"
            onClick={() => router.push(`/list/${entry.stock.code}`)}
            className="flex items-center gap-md rounded-card border border-gray-200 bg-white px-lg py-md text-left transition-colors hover:bg-gray-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-badge bg-gray-100 text-label-m font-semibold text-gray-800">
              {entry.stock.name.slice(0, 1)}
            </span>
            <span className="flex flex-1 flex-col gap-xs">
              <span className="flex items-center justify-between">
                <span className="text-label-m font-semibold text-gray-900">
                  {entry.stock.name}
                </span>
                <span className="text-eyebrow text-gray-400">{entry.stock.code}</span>
              </span>
              <span className="text-eyebrow text-gray-500">
                판단 기록 {entry.judgments.length}건
              </span>
            </span>
          </button>
        ))}

        <PrimaryButton variant="ghost" onClick={handleAddStock}>
          종목 추가하기
        </PrimaryButton>
      </div>
    </div>
  );
}
