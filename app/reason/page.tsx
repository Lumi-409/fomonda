"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AmbientGlow from "@/components/ambient-glow";
import { HoldingBadge } from "@/components/holding-badge";
import { IconSwooshGradient } from "@/components/icons";
import PrimaryButton from "@/components/primary-button";
import StepTopBar from "@/components/step-topbar";
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
      <div className="relative isolate flex flex-1 flex-col items-center justify-center gap-md overflow-hidden bg-white text-center">
        <AmbientGlow />
        <IconSwooshGradient className="mb-sm h-8 w-9" />
        <p className="text-heading-sub font-semibold text-gray-900">
          투자 메타인지를 가동 중이에요
        </p>
        <p className="text-label-sm text-gray-500">
          판단 이유와 관련 뉴스를 비교하고 있어요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <StepTopBar step={3} totalSteps={4} />
      <div className="flex flex-1 flex-col justify-between gap-3xl px-lg py-2xl">
        <div className="flex flex-col gap-2xl">
          <div>
            <div className="text-heading-sub font-semibold text-gray-950">
              <p>이 종목을 매수/매도 판단의</p>
              <p>이유를 작성해주세요</p>
            </div>
            <div className="mt-sm flex gap-sm">
              <HoldingBadge holding={draft.holding} />
              <span className="rounded-badge bg-gray-100 px-md py-xs text-eyebrow font-semibold text-gray-700">
                {draft.stock.name}
              </span>
            </div>
          </div>

          {previousJudgment && (
            <div className="flex flex-col gap-xs rounded-card bg-gray-50 p-lg">
              <span className="text-eyebrow font-semibold text-gray-500">직전 판단 이유</span>
              <p className="text-label-sm text-gray-600">{previousJudgment.reason}</p>
            </div>
          )}

          <div className="flex flex-col gap-sm">
            <textarea
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value.slice(0, MAX_LENGTH))}
              maxLength={MAX_LENGTH}
              rows={5}
              placeholder="매수/매도를 고민하고 있는 이유를 적어주세요"
              className="resize-none rounded-input border border-gray-200 bg-white px-lg py-md text-label-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-800"
            />
            <span className="self-end text-eyebrow text-gray-400">
              {reasonText.length}/{MAX_LENGTH}
            </span>
          </div>

          <div className="flex flex-col gap-sm">
            <span className="text-label-sm font-semibold text-gray-900">
              혹시 이런 이유인가요?
            </span>
            <div className="flex flex-col gap-sm">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setReasonText(example.slice(0, MAX_LENGTH))}
                  className="rounded-card border border-gray-200 bg-white px-lg py-md text-left text-label-sm text-gray-600 transition-colors hover:bg-gray-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          {errorMessage && <p className="text-label-sm text-pink-700">{errorMessage}</p>}
          <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
            {errorMessage ? "다시 시도" : "점검 시작"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
