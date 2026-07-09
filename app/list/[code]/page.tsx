"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BackTopBar from "@/components/back-topbar";
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
    <div className="flex flex-1 flex-col">
      <BackTopBar />
      <div className="flex flex-1 flex-col justify-between gap-3xl px-lg py-2xl">
        <div className="flex flex-col gap-2xl">
          <div className="flex items-center gap-md">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-badge bg-gray-100 text-label-lg font-semibold text-gray-800">
              {entry.stock.name.slice(0, 1)}
            </span>
            <div>
              <h1 className="text-heading-sub font-semibold text-gray-950">
                {entry.stock.name}
              </h1>
              <p className="mt-xs text-label-sm text-gray-600">
                {entry.stock.code} · {entry.holding ? "보유" : "관심"} · 판단 기록{" "}
                {entry.judgments.length}건
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-md">
            {entry.judgments.map((judgment) => (
              <button
                key={judgment.id}
                type="button"
                onClick={() => router.push(`/list/${entry.stock.code}/${judgment.id}`)}
                className="flex flex-col gap-sm rounded-card border border-gray-200 bg-white p-lg text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-eyebrow text-gray-400">
                  {new Date(judgment.createdAt).toLocaleString()}
                </span>
                <p className="text-label-sm font-semibold text-gray-900">{judgment.reason}</p>
                <p className="text-label-sm text-gray-600">{judgment.checkCard.summary}</p>
              </button>
            ))}
          </div>
        </div>

        <PrimaryButton onClick={handleRecheck}>이 종목 다시 점검하기</PrimaryButton>
      </div>
    </div>
  );
}
