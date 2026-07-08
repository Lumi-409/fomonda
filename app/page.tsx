"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";

export default function OnboardingPage() {
  const router = useRouter();
  const { startNewCheck } = useAppContext();

  const handleStart = () => {
    startNewCheck();
    router.push("/search");
  };

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">포모온다</h1>
        <p className="text-base leading-relaxed text-slate-600">
          포모온다는 지금 매수·매도를 대신 정해주지 않아요. 대신 지금 이
          판단이 뇌동매매나 FOMO, 불안에 휩쓸린 건 아닌지 스스로 점검하도록
          도와줘요.
        </p>
        <ul className="flex flex-col gap-2 text-sm text-slate-500">
          <li>· 종목과 판단 이유를 입력하면 관련 뉴스와 비교해 점검 카드를 만들어줘요</li>
          <li>· 매수·매도 추천은 하지 않아요</li>
          <li>· 점검 결과는 종목별 타임라인에 자동으로 남아요</li>
        </ul>
      </div>
      <PrimaryButton onClick={handleStart}>시작하기</PrimaryButton>
    </div>
  );
}
