"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useCheckFlow } from "@/lib/context/check-flow-context";

export default function CardPage() {
  const router = useRouter();
  const { checkCard, reason, setSavedCriterion } = useCheckFlow();

  useEffect(() => {
    if (!checkCard) {
      router.replace("/register");
    }
  }, [checkCard, router]);

  if (!checkCard) {
    return null;
  }

  const handleSaveCriterion = () => {
    setSavedCriterion(reason);
    router.push("/saved");
  };

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold text-slate-900">점검 카드</h1>

        <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">판단 요약</h2>
          <p className="text-sm leading-relaxed text-slate-800">{checkCard.summary}</p>
        </section>

        <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">
            근거로 보기 어려운 부분
          </h2>
          <p className="text-sm leading-relaxed text-slate-800">
            {checkCard.weakPoints}
          </p>
        </section>

        <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">
            최근 이슈 연결 포인트
          </h2>
          <p className="text-sm leading-relaxed text-slate-800">
            {checkCard.newsConnection}
          </p>
        </section>

        <section className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">확인 질문</h2>
          <ol className="flex flex-col gap-2">
            {checkCard.checkQuestions.map((question, index) => (
              <li key={index} className="text-sm leading-relaxed text-slate-800">
                {index + 1}. {question}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="flex flex-col gap-2">
        <PrimaryButton variant="secondary" onClick={() => router.push("/rewrite")}>
          판단 이유 다시 쓰기
        </PrimaryButton>
        <PrimaryButton onClick={handleSaveCriterion}>이 기준 저장하기</PrimaryButton>
      </div>
    </div>
  );
}
