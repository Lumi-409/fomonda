"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useCheckFlow } from "@/lib/context/check-flow-context";

const MAX_LENGTH = 200;

export default function RewritePage() {
  const router = useRouter();
  const { stockName, reason, setSavedCriterion } = useCheckFlow();

  const [rewrittenText, setRewrittenText] = useState("");

  useEffect(() => {
    if (!stockName || !reason) {
      router.replace("/register");
    }
  }, [stockName, reason, router]);

  if (!stockName || !reason) {
    return null;
  }

  const canSave = rewrittenText.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    setSavedCriterion(rewrittenText.trim());
    router.push("/saved");
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">판단 이유 재작성</h1>
          <p className="mt-1 text-sm text-slate-500">
            기존 이유를 다시 읽어보고, 새로운 판단 이유를 적어주세요.
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <span className="text-xs font-medium text-slate-400">기존 판단 이유</span>
          <p className="text-sm leading-relaxed text-slate-600">{reason}</p>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            value={rewrittenText}
            onChange={(e) => setRewrittenText(e.target.value.slice(0, MAX_LENGTH))}
            maxLength={MAX_LENGTH}
            rows={5}
            placeholder="다시 생각해본 판단 이유를 적어주세요"
            className="resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
          <span className="self-end text-xs text-slate-400">
            {rewrittenText.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      <PrimaryButton onClick={handleSave} disabled={!canSave}>
        저장
      </PrimaryButton>
    </div>
  );
}
