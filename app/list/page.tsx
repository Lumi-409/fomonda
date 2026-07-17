"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/confirm-dialog";
import FeedbackSheet from "@/components/feedback-sheet";
import PrimaryButton from "@/components/primary-button";
import { avatarClasses } from "@/components/holding-badge";
import { IconCheckboxState, IconGear, IconPlus, IconSearch } from "@/components/icons";
import { useAppContext } from "@/lib/context/app-context";
import { StockEntry } from "@/lib/types";
import { hasSeenFeedbackModal, markFeedbackModalSeen } from "@/lib/feedback-modal";
import { trackEvent } from "@/lib/analytics/mixpanel";

type Tab = "보유" | "관심";
type SortBy = "recent" | "name" | "count";
type MenuView = "root" | "sort";

const SORT_LABELS: Record<SortBy, string> = {
  recent: "최신순",
  name: "이름순",
  count: "점검 횟수순",
};

function latestJudgmentAt(entry: StockEntry): number {
  return Math.max(...entry.judgments.map((j) => new Date(j.createdAt).getTime()));
}

function sortEntries(entries: StockEntry[], sortBy: SortBy): StockEntry[] {
  const sorted = [...entries];
  if (sortBy === "name") {
    sorted.sort((a, b) => a.stock.name.localeCompare(b.stock.name, "ko"));
  } else if (sortBy === "count") {
    sorted.sort((a, b) => b.judgments.length - a.judgments.length);
  } else {
    sorted.sort((a, b) => latestJudgmentAt(b) - latestJudgmentAt(a));
  }
  return sorted;
}

export default function ListPage() {
  const router = useRouter();
  const { entries, isHydrated, startNewCheck, deleteEntries } = useAppContext();
  const [tab, setTab] = useState<Tab>("보유");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const [sortBy, setSortBy] = useState<SortBy>("recent");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>("root");

  const [isEditMode, setIsEditMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [isFirstVisitModalOpen, setIsFirstVisitModalOpen] = useState(false);

  useEffect(() => {
    if (hasSeenFeedbackModal()) return;
    markFeedbackModalSeen();
    setIsFirstVisitModalOpen(true);
    trackEvent("feedback_modal_shown");
  }, []);

  const handleFeedbackModalAccept = () => {
    trackEvent("feedback_modal_accepted");
    setIsFirstVisitModalOpen(false);
    setIsFeedbackOpen(true);
  };

  const handleFeedbackModalDismiss = () => {
    trackEvent("feedback_modal_dismissed");
    setIsFirstVisitModalOpen(false);
  };

  const filtered = useMemo(() => {
    const byTab = entries.filter((entry) => (tab === "보유" ? entry.holding : !entry.holding));
    return sortEntries(byTab, sortBy);
  }, [entries, tab, sortBy]);

  const handleAddStock = () => {
    startNewCheck();
    router.push("/search");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMenuView("root");
  };

  const enterEditMode = () => {
    setIsEditMode(true);
    setSelected(new Set());
    closeMenu();
  };

  const exitEditMode = () => {
    setIsEditMode(false);
    setSelected(new Set());
  };

  const toggleSelected = (code: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const codes = Array.from(selected);
      await deleteEntries(codes);
      trackEvent("Stock Deleted", { count: codes.length });
      setIsDeleteConfirmOpen(false);
      exitEditMode();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "삭제에 실패했어요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between px-lg py-lg">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-logo text-heading-sub text-gray-900"
        >
          Fomonda
        </button>

        {isEditMode ? (
          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={exitEditMode}
              className="text-label-sm font-semibold text-gray-600"
            >
              취소
            </button>
            <button
              type="button"
              disabled={selected.size === 0}
              onClick={() => setIsDeleteConfirmOpen(true)}
              className={`rounded-badge px-sm py-xs text-eyebrow font-semibold transition-colors ${
                selected.size > 0 ? "bg-gray-900 text-gray-50" : "bg-gray-100 text-gray-300"
              }`}
            >
              삭제
            </button>
          </div>
        ) : (
          <div className="relative flex items-center gap-sm">
            <button
              type="button"
              onClick={() => setIsFeedbackOpen(true)}
              className="rounded-badge border border-gray-200 bg-transparent px-sm py-xs text-eyebrow font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              의견 남기기
            </button>
            <button
              type="button"
              aria-label="설정"
              onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
              className="flex h-6 w-6 shrink-0 items-center justify-center text-gray-900"
            >
              <IconGear />
            </button>

            {isMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={closeMenu}
                  className="fixed inset-0 z-40 cursor-default"
                />
                <div className="absolute right-0 top-full z-50 mt-xs w-[160px] rounded-card bg-white py-xs shadow-modal">
                  {menuView === "root" ? (
                    <>
                      <button
                        type="button"
                        onClick={enterEditMode}
                        className="block w-full px-lg py-sm text-left text-label-m font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        종목 편집
                      </button>
                      <button
                        type="button"
                        onClick={() => setMenuView("sort")}
                        className="block w-full px-lg py-sm text-left text-label-m font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        정렬
                      </button>
                    </>
                  ) : (
                    (Object.keys(SORT_LABELS) as SortBy[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSortBy(option);
                          closeMenu();
                        }}
                        className={`block w-full px-lg py-sm text-left text-label-m font-semibold hover:bg-gray-50 ${
                          sortBy === option ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {SORT_LABELS[option]}
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-lg px-lg pb-2xl">
        <div>
          <h1 className="text-heading-sub font-semibold text-gray-950">내 종목 리스트</h1>

          <div className="-mx-lg mt-lg flex border-b border-gray-100 bg-white px-lg">
            {(["보유", "관심"] as Tab[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTab(option)}
                className={`-mb-px flex h-[54px] flex-1 items-center justify-center border-b-2 text-label font-semibold transition-colors ${
                  tab === option
                    ? "border-gray-950 text-gray-800"
                    : "border-transparent text-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-md flex items-center gap-sm rounded-card bg-gray-50 px-lg py-md">
            <IconSearch className="shrink-0" />
            <p className="text-label-sm font-medium text-gray-700">종목을 선택하면 다시 점검할 수 있어요</p>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
        {!isHydrated && (
          <p className="text-label-sm text-gray-400">불러오는 중이에요...</p>
        )}
        {isHydrated && filtered.length === 0 && (
          <p className="text-label-sm text-gray-400">아직 점검한 {tab} 종목이 없어요.</p>
        )}
        {filtered.map((entry) => (
          <button
            key={entry.stock.code}
            type="button"
            onClick={() => {
              if (isEditMode) {
                toggleSelected(entry.stock.code);
                return;
              }
              trackEvent("List Entry Clicked", {
                code: entry.stock.code,
                name: entry.stock.name,
              });
              router.push(`/list/${entry.stock.code}`);
            }}
            className="flex items-center gap-lg rounded-card border border-gray-200 bg-white py-[16px] pl-[16px] pr-[20px] text-left transition-colors hover:bg-gray-50"
          >
            {isEditMode && (
              <IconCheckboxState checked={selected.has(entry.stock.code)} className="h-5 w-5 shrink-0" />
            )}
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-label-m font-semibold ${avatarClasses(entry.holding)}`}
            >
              {entry.stock.name.slice(0, 1)}
            </span>
            <span className="flex flex-1 flex-col gap-xs">
              <span className="text-label-m font-semibold text-gray-900">
                {entry.stock.name}
              </span>
              <span className="text-eyebrow text-gray-400">{entry.stock.code}</span>
            </span>
            <span className="shrink-0 rounded-badge bg-gray-100 px-sm py-xs text-eyebrow text-gray-500">
              {entry.judgments.length}회 점검
            </span>
          </button>
        ))}

        {!isEditMode && (
          <button
            type="button"
            onClick={handleAddStock}
            className="flex items-center justify-center gap-sm py-md text-label-sm font-semibold text-gray-500"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <IconPlus />
            </span>
            종목 추가하기
          </button>
        )}
        </div>

        <button
          type="button"
          onClick={() => router.push("/privacy")}
          className="mt-auto self-center pt-2xl text-eyebrow text-gray-400 underline underline-offset-2"
        >
          개인정보처리방침
        </button>
      </div>

      <FeedbackSheet isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {isFirstVisitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-lg">
          <button
            type="button"
            aria-label="닫기"
            onClick={handleFeedbackModalDismiss}
            className="absolute inset-0 bg-gray-900/40"
          />
          <div className="relative flex w-full max-w-page flex-col gap-lg rounded-card bg-white p-xl shadow-modal">
            <div>
              <p className="text-label font-semibold text-gray-900">
                포몬다 첫 사용 경험 어떠셨나요?
              </p>
              <p className="mt-xs text-label-sm text-gray-600">짧은 의견도 큰 도움이 돼요</p>
            </div>
            <div className="flex gap-md">
              <PrimaryButton variant="secondary" className="flex-1" onClick={handleFeedbackModalDismiss}>
                다음에 할게요
              </PrimaryButton>
              <PrimaryButton className="flex-1" onClick={handleFeedbackModalAccept}>
                의견 남기기
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title={`${selected.size}개 종목을 삭제할까요?`}
        description="판단 타임라인이 모두 삭제되며 되돌릴 수 없어요"
        isConfirming={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteConfirmOpen(false);
          setDeleteError(null);
        }}
      />
      {deleteError && (
        <p className="fixed bottom-2xl left-1/2 z-50 -translate-x-1/2 rounded-card bg-gray-900 px-lg py-sm text-label-sm text-gray-50">
          {deleteError}
        </p>
      )}
    </div>
  );
}
