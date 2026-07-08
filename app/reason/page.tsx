"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";
import { CheckCard } from "@/lib/types";

const MAX_LENGTH = 200;

const EXAMPLES = [
  "오늘 급락 뉴스를 보고 불안해서 지금이라도 팔아야 할 것 같아요",
  "커뮤니티에서 다들 지금이 저점이라고 해서 더 사고 싶어요",
  "실적 발표 이후 반등할 것 같은 느낌이 들어서 보유하려고요",
];

export default function ReasonPage() {
  const router = useRouter();
  const { draft, recordJudgment, getEntry } = useAppContext();

  const [reasonText, setReasonText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!draft.stock || draft.holding === null) {
      router.replace("/search");
    }
  }, [draft.stock, draft.holding, router]);

  if (!draft.stock || draft.holding === null) {
    return null;
  }

  const previousJudgment = getEntry(draft.stock.code)?.judgments[0] ?? null;
  const canSubmit = reasonText.trim().length > 0 && !isLoading;

  const handleSubmit = async () => {
    if (!canSubmit || !draft.stock) return;
    setIsLoading(true);
    setErrorMessage(null);
    const trimmed = reasonText.trim();

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockName: draft.stock.name,
          reason: trimmed,
          holding: draft.holding,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "지금 점검이 어려워요. 잠시 후 다시 시도해주세요");
      }

      const data: { checkCard: CheckCard } = await res.json();
      recordJudgment(trimmed, data.checkCard);
      router.push("/result");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "지금 점검이 어려워요. 잠시 후 다시 시도해주세요"
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        <p className="text-sm text-slate-600">메타인지 가동 중이에요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">판단 이유 입력</h1>
          <p className="mt-1 text-sm text-slate-500">
            {draft.stock.name} · {draft.holding ? "보유" : "관심"}
          </p>
        </div>

        {previousJudgment && (
          <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-medium text-slate-400">직전 판단 이유</span>
            <p className="text-sm leading-relaxed text-slate-600">
              {previousJudgment.reason}
            </p>
          </div>
        )}

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

      <div className="flex flex-col gap-2">
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
          {errorMessage ? "다시 시도" : "점검 시작"}
        </PrimaryButton>
      </div>
    </div>
  );
}
