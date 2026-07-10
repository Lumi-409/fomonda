"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FeedbackSheet from "@/components/feedback-sheet";
import { avatarClasses } from "@/components/holding-badge";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";

type Tab = "보유" | "관심";

export default function ListPage() {
  const router = useRouter();
  const { entries, isHydrated, startNewCheck } = useAppContext();
  const [tab, setTab] = useState<Tab>("보유");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

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
      <div className="flex items-center justify-between">
        <p className="font-logo text-heading-sub text-gray-900">Fomonda</p>
        <button
          type="button"
          onClick={() => setIsFeedbackOpen(true)}
          className="rounded-badge bg-gray-100 px-md py-xs text-eyebrow font-semibold text-gray-500 transition-colors hover:bg-gray-200"
        >
          의견 남기기
        </button>
      </div>

      <div>
        <h1 className="text-heading-sub font-semibold text-gray-950">내 종목 리스트</h1>

        <div className="mt-lg flex gap-xl border-b border-gray-100">
          {(["보유", "관심"] as Tab[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTab(option)}
              className={`-mb-px border-b-2 pb-sm text-label-m font-semibold transition-colors ${
                tab === option
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
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
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-badge text-label-m font-semibold ${avatarClasses(entry.holding)}`}
            >
              {entry.stock.name.slice(0, 1)}
            </span>
            <span className="flex flex-1 flex-col gap-xs">
              <span className="text-label-m font-semibold text-gray-900">
                {entry.stock.name}
              </span>
              <span className="text-eyebrow text-gray-400">{entry.stock.code}</span>
            </span>
            <span className="shrink-0 rounded-badge bg-gray-100 px-md py-xs text-eyebrow text-gray-500">
              {entry.judgments.length}회 점검
            </span>
          </button>
        ))}

        <PrimaryButton variant="ghost" onClick={handleAddStock}>
          종목 추가하기
        </PrimaryButton>
      </div>

      <FeedbackSheet isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
