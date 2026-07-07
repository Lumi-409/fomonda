"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useCheckFlow } from "@/lib/context/check-flow-context";
import { generateDummyCheckCard } from "@/lib/dummy-check-card";

const MAX_LENGTH = 200;

const EXAMPLES = [
  "오늘 급락 뉴스를 보고 불안해서 지금이라도 팔아야 할 것 같아요",
  "커뮤니티에서 다들 지금이 저점이라고 해서 더 사고 싶어요",
  "실적 발표 이후 반등할 것 같은 느낌이 들어서 보유하려고요",
];

export default function ReasonPage() {
  const router = useRouter();
  const { stockName, holdingStatus, concernType, setReason, setCheckCard } =
    useCheckFlow();

  const [reasonText, setReasonText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stockName || !holdingStatus || !concernType) {
      router.replace("/register");
    }
  }, [stockName, holdingStatus, concernType, router]);

  if (!stockName || !holdingStatus || !concernType) {
    return null;
  }

  const canSubmit = reasonText.trim().length > 0 && !isLoading;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsLoading(true);
    setReason(reasonText.trim());

    window.setTimeout(() => {
      const card = generateDummyCheckCard(stockName, reasonText.trim(), concernType);
      setCheckCard(card);
      router.push("/card");
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        <p className="text-sm text-slate-600">
          판단 이유와 최신 이슈를 비교하고 있어요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">판단 이유 입력</h1>
          <p className="mt-1 text-sm text-slate-500">
            {stockName} · {holdingStatus} · {concernType}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value.slice(0, MAX_LENGTH))}
            maxLength={MAX_LENGTH}
            rows={5}
            placeholder="지금 이 판단을 내린 이유를 적어주세요"
            className="resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
          <span className="self-end text-xs text-slate-400">
            {reasonText.length}/{MAX_LENGTH}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">입력 예시</span>
          <div className="flex flex-col gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setReasonText(example.slice(0, MAX_LENGTH))}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
        점검 시작
      </PrimaryButton>
    </div>
  );
}
