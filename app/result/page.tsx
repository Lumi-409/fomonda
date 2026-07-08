"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { useAppContext } from "@/lib/context/app-context";

export default function ResultPage() {
  const router = useRouter();
  const { draft } = useAppContext();

  useEffect(() => {
    if (!draft.checkCard) {
      router.replace("/search");
    }
  }, [draft.checkCard, router]);

  if (!draft.checkCard) {
    return null;
  }

  const { checkCard } = draft;

  return (
    <div className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold text-slate-900">점검 카드</h1>

        <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">판단 요약</h2>
          <p className="text-sm leading-relaxed text-slate-800">{checkCard.summary}</p>
        </section>

        <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">약한 근거</h2>
          <p className="text-sm leading-relaxed text-slate-800">
            {checkCard.weakPoints}
          </p>
        </section>

        <section className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">관련 객관적 자료</h2>
          <p className="text-sm leading-relaxed text-slate-800">
            {checkCard.newsConnection}
          </p>
        </section>

        <section className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-500">스스로 점검할 질문</h2>
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
        <PrimaryButton onClick={() => router.push("/reason")}>
          기준 재작성
        </PrimaryButton>
        <PrimaryButton variant="secondary" onClick={() => router.push("/list")}>
          리스트 보러가기
        </PrimaryButton>
      </div>
    </div>
  );
}
