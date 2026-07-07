"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useCheckFlow } from "@/lib/context/check-flow-context";

export default function SavedPage() {
  const router = useRouter();
  const { savedCriterion, reset } = useCheckFlow();

  useEffect(() => {
    if (!savedCriterion) {
      router.replace("/register");
    }
  }, [savedCriterion, router]);

  if (!savedCriterion) {
    return null;
  }

  const handleRestart = () => {
    reset();
    router.push("/register");
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">기준 저장 완료</h1>
          <p className="mt-1 text-sm text-slate-500">
            이번 판단 기준이 저장됐어요.
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <span className="text-xs font-medium text-slate-400">저장된 기준</span>
          <p className="text-sm leading-relaxed text-slate-800">{savedCriterion}</p>
        </div>
      </div>

      <PrimaryButton onClick={handleRestart}>다른 종목 점검하기</PrimaryButton>
    </div>
  );
}
