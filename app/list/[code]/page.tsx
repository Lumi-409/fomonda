"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import BackTopBar from "@/components/back-topbar";
import { avatarClasses, HoldingBadge } from "@/components/holding-badge";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";
import { trackEvent } from "@/lib/analytics/mixpanel";

export default function StockTimelinePage() {
  const router = useRouter();
  const params = useParams<{ code: string }>();
  const { getEntry, selectStock, setHolding } = useAppContext();

  const entry = getEntry(params.code);
  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    if (!entry) {
      router.replace("/list");
    }
  }, [entry, router]);

  useEffect(() => {
    if (!entry || hasTrackedViewRef.current) return;
    hasTrackedViewRef.current = true;
    trackEvent("stock_timeline_viewed", { code: entry.stock.code });
  }, [entry]);

  if (!entry) {
    return null;
  }

  const handleRecheck = () => {
    trackEvent("same_stock_recheck_started", { code: entry.stock.code });
    selectStock(entry.stock);
    setHolding(entry.holding);
    router.push("/reason");
  };

  return (
    <div className="flex flex-1 flex-col">
      <BackTopBar />
      <div className="flex flex-1 flex-col gap-2xl px-lg py-2xl">
        <div className="flex items-center gap-md">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-label-lg font-semibold ${avatarClasses(entry.holding)}`}
          >
            {entry.stock.name.slice(0, 1)}
          </span>
          <div className="flex flex-1 flex-col">
            <h1 className="text-heading-sub font-semibold text-gray-950">{entry.stock.name}</h1>
            <p className="mt-xs text-label-sm text-gray-600">
              {entry.stock.code} · {entry.judgments.length}회 점검
            </p>
          </div>
          <HoldingBadge holding={entry.holding} />
        </div>

        <PrimaryButton onClick={handleRecheck}>다시 점검하기</PrimaryButton>

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
              <p className="text-label-m font-semibold text-gray-900">
                {judgment.checkCard.summaryHeadline}
              </p>
              <p className="text-label-sm text-gray-600">{judgment.checkCard.summary}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
