"use client";

import { useState } from "react";
import PrimaryButton from "@/components/primary-button";
import { getOrCreateSessionId } from "@/lib/session";
import { trackEvent } from "@/lib/analytics/mixpanel";

const MAX_LENGTH = 500;

interface FeedbackSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackSheet({ isOpen, onClose }: FeedbackSheetProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setContent("");
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const sessionId = getOrCreateSessionId();
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, content: content.trim() }),
      });

      if (!res.ok) {
        throw new Error("의견 등록에 실패했어요. 잠시 후 다시 시도해주세요");
      }

      trackEvent("Feedback Submitted");
      handleClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "의견 등록에 실패했어요. 잠시 후 다시 시도해주세요"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={handleClose}
        className="absolute inset-0 bg-gray-900/40"
      />
      <div className="relative flex w-full max-w-page flex-col gap-lg rounded-t-card bg-white px-lg pb-2xl pt-md">
        <div className="mx-auto h-1 w-10 rounded-badge bg-gray-200" />

        <div>
          <p className="text-heading-sub font-semibold text-gray-950">
            포몬다에 의견을 남겨주세요
          </p>
          <p className="mt-xs text-label-sm text-gray-600">
            더 나은 서비스를 위해 소중한 의견을 들려주세요
          </p>
        </div>

        <div className="flex w-full flex-col rounded-input border border-gray-200 bg-white px-[20px] py-[16px] focus-within:border-gray-800">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
            maxLength={MAX_LENGTH}
            rows={4}
            placeholder="내용을 입력해주세요"
            className="w-full flex-1 resize-none border-none bg-transparent text-label text-gray-900 outline-none placeholder:text-gray-400"
          />
          <span className="self-end text-eyebrow text-gray-400">
            {content.length}/{MAX_LENGTH}
          </span>
        </div>

        {errorMessage && <p className="text-label-sm text-pink-700">{errorMessage}</p>}

        <PrimaryButton onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
          의견 남기기
        </PrimaryButton>
      </div>
    </div>
  );
}
