"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BackTopBar from "@/components/back-topbar";
import { IconAlert, IconBrain, IconCheck, IconThink } from "@/components/icons";
import { ListItemRow, QuestionRow } from "@/components/check-list-item";
import { useAppContext } from "@/lib/context/app-context";

export default function JudgmentDetailPage() {
  const router = useRouter();
  const params = useParams<{ code: string; judgmentId: string }>();
  const { getEntry } = useAppContext();

  const entry = getEntry(params.code);
  const judgment = entry?.judgments.find((j) => j.id === params.judgmentId);

  useEffect(() => {
    if (!entry) {
      router.replace("/list");
    } else if (!judgment) {
      router.replace(`/list/${params.code}`);
    }
  }, [entry, judgment, params.code, router]);

  if (!entry || !judgment) {
    return null;
  }

  const { checkCard } = judgment;

  return (
    <div className="flex flex-1 flex-col">
      <BackTopBar />
      <div className="flex flex-1 flex-col gap-2xl px-lg py-2xl">
        <div>
          <p className="text-eyebrow text-gray-400">
            {new Date(judgment.createdAt).toLocaleString()}
          </p>
          <h1 className="mt-xs text-heading-sub font-semibold text-gray-950">
            {entry.stock.name}
          </h1>
          <p className="mt-xs text-label-sm text-gray-600">
            {entry.stock.code} · {entry.holding ? "보유" : "관심"}
          </p>
        </div>

        <div className="flex flex-col gap-xs rounded-card bg-gray-50 p-lg">
          <span className="text-eyebrow font-semibold text-gray-500">판단 이유</span>
          <p className="text-label-sm text-gray-700">{judgment.reason}</p>
        </div>

        <div className="flex w-full flex-col gap-lg rounded-card border border-gray-200 bg-gradient-calm-subtle p-xl">
          <div className="flex items-center gap-xs">
            <IconCheck />
            <p className="bg-gradient-calm-accent bg-clip-text text-label-m font-semibold text-transparent">
              판단을 요약했어요
            </p>
          </div>
          <div className="flex flex-col gap-md">
            <p className="text-label-m font-semibold text-gray-800">
              {checkCard.summaryHeadline}
            </p>
            <p className="text-label-sm text-gray-700">{checkCard.summary}</p>
          </div>
        </div>

        <div className="flex flex-col gap-lg">
          <div className="flex flex-col gap-sm rounded-card border border-gray-200 bg-white p-lg">
            <div className="flex items-center gap-sm">
              <IconAlert className="shrink-0" />
              <h2 className="text-label-m font-semibold text-gray-900">
                약한 근거 {checkCard.weakPoints.length}개
              </h2>
            </div>
            <ul className="flex flex-col gap-md">
              {checkCard.weakPoints.map((item, index) => (
                <ListItemRow key={index} item={item} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-sm rounded-card border border-gray-200 bg-white p-lg">
            <div className="flex items-center gap-sm">
              <IconBrain className="shrink-0" />
              <h2 className="text-label-m font-semibold text-gray-900">메타인지 가동 자료</h2>
            </div>
            <ul className="flex flex-col gap-md">
              {checkCard.evidence.map((item, index) => (
                <ListItemRow key={index} item={item} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-sm rounded-card border border-gray-200 bg-white p-lg">
            <div className="flex items-center gap-sm">
              <IconThink className="shrink-0" />
              <h2 className="text-label-m font-semibold text-gray-900">스스로 점검할 질문</h2>
            </div>
            <div className="flex flex-col gap-sm">
              {checkCard.checkQuestions.map((question, index) => (
                <QuestionRow key={index} index={index} question={question} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
