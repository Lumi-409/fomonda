"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { IconAlert, IconBrain, IconCheck, IconThink } from "@/components/icons";
import { ListItemRow, QuestionRow } from "@/components/check-list-item";
import { useAppContext } from "@/lib/context/app-context";

const TABS = [
  { id: "summary", label: "점검 요약" },
  { id: "weak-points", label: "약한 근거" },
  { id: "evidence", label: "객관적 자료" },
  { id: "questions", label: "셀프 체크 질문" },
] as const;

export default function ResultPage() {
  const router = useRouter();
  const { draft } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("summary");

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!draft.checkCard) {
      router.replace("/search");
    }
  }, [draft.checkCard, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) {
          setActiveTab(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    TABS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [draft.checkCard]);

  if (!draft.checkCard) {
    return null;
  }

  const { checkCard } = draft;

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[52px] w-full shrink-0 items-center justify-end px-lg py-lg">
        <button
          type="button"
          aria-label="닫기"
          onClick={() => router.push("/list")}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-gray-900"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14.0492 0.334739C14.4955 -0.11158 15.2189 -0.11158 15.6653 0.334739C16.1116 0.781057 16.1116 1.50451 15.6653 1.95083L9.61609 8L15.6653 14.0492C16.1116 14.4955 16.1116 15.2189 15.6653 15.6653C15.2189 16.1116 14.4955 16.1116 14.0492 15.6653L8 9.61609L1.95083 15.6653C1.50451 16.1116 0.781057 16.1116 0.334739 15.6653C-0.11158 15.2189 -0.11158 14.4955 0.334739 14.0492L6.38391 8L0.334739 1.95083C-0.11158 1.50451 -0.11158 0.781057 0.334739 0.334739C0.781057 -0.11158 1.50451 -0.11158 1.95083 0.334739L8 6.38391L14.0492 0.334739Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col py-2xl">
        <div className="flex flex-col gap-lg px-lg pb-lg">
          <div
            id="summary"
            ref={(el) => {
              sectionRefs.current.summary = el;
            }}
            className="flex flex-col gap-lg"
          >
            <div className="text-heading-sub font-semibold text-gray-950">
              <p>
                <span className="text-purple-700">{checkCard.weakPoints.length}개</span>의
                약한 근거가 있어요
              </p>
              <p>점검 결과를 확인해보세요</p>
            </div>

            <div className="sticky top-0 z-10 flex gap-sm overflow-x-auto bg-white py-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`shrink-0 rounded-pill px-lg py-sm text-label font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "bg-gray-800 text-gray-50"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex w-full flex-col gap-lg rounded-card border border-gray-200 bg-gradient-calm-subtle p-xl">
              <div className="flex items-center gap-xs">
                <IconCheck />
                <p className="bg-gradient-calm-accent bg-clip-text text-label font-semibold text-transparent">
                  판단을 요약했어요
                </p>
              </div>
              <div className="flex flex-col gap-md">
                <p className="text-label font-semibold text-gray-800">
                  {checkCard.summaryHeadline}
                </p>
                <p className="text-label-sm font-medium text-gray-700">{checkCard.summary}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-lg bg-gray-100">
          <section
            id="weak-points"
            ref={(el) => {
              sectionRefs.current["weak-points"] = el;
            }}
            className="flex flex-col gap-2xl bg-white p-xl"
          >
            <div className="flex items-center gap-sm">
              <IconAlert className="h-5 w-auto shrink-0" />
              <h2 className="text-label-lg font-semibold text-gray-900">
                약한 근거 <span className="text-purple-700">{checkCard.weakPoints.length}개</span>
              </h2>
            </div>
            <ul className="flex flex-col gap-lg">
              {checkCard.weakPoints.map((item, index) => (
                <ListItemRow key={index} item={item} />
              ))}
            </ul>
          </section>

          <section
            id="evidence"
            ref={(el) => {
              sectionRefs.current.evidence = el;
            }}
            className="flex flex-col gap-2xl bg-white p-xl"
          >
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-sm">
                <IconBrain className="h-5 w-auto shrink-0" />
                <h2 className="text-label-lg font-semibold text-gray-900">메타인지 가동 자료</h2>
              </div>
              <p className="text-label-sm text-gray-500">
                종목의 객관적 자료를 정리했어요. 자료를 기반으로 기존 투자 판단을
                점검해보세요
              </p>
            </div>
            <ul className="flex flex-col gap-lg">
              {checkCard.evidence.map((item, index) => (
                <ListItemRow key={index} item={item} />
              ))}
            </ul>
          </section>

          <section
            id="questions"
            ref={(el) => {
              sectionRefs.current.questions = el;
            }}
            className="flex flex-col gap-2xl bg-white p-xl"
          >
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-sm">
                <IconThink className="h-5 w-auto shrink-0" />
                <h2 className="text-label-lg font-semibold text-gray-900">스스로 점검할 질문</h2>
              </div>
              <p className="text-label-sm text-gray-500">
                아래의 질문을 한 번 대답해보면서 내가 왜 이런 판단을 내렸는지
                객관적으로 한 번 더 점검해보세요
              </p>
            </div>
            <div className="flex flex-col gap-sm">
              {checkCard.checkQuestions.map((question, index) => (
                <QuestionRow key={index} index={index} question={question} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-auto flex gap-md px-lg pb-2xl pt-lg">
        <PrimaryButton variant="secondary" className="flex-1" onClick={() => router.push("/reason")}>
          다시 점검하기
        </PrimaryButton>
        <PrimaryButton className="flex-1" onClick={() => router.push("/list")}>
          리스트 확인
        </PrimaryButton>
      </div>
    </div>
  );
}
