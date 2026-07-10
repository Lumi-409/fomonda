"use client";

import PrimaryButton from "@/components/primary-button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "삭제",
  cancelLabel = "취소",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-lg">
      <button
        type="button"
        aria-label="닫기"
        onClick={onCancel}
        className="absolute inset-0 bg-gray-900/40"
      />
      <div className="relative flex w-full max-w-page flex-col gap-lg rounded-card bg-white p-xl shadow-modal">
        <div>
          <p className="text-label font-semibold text-gray-900">{title}</p>
          {description && (
            <p className="mt-xs text-label-sm text-gray-600">{description}</p>
          )}
        </div>
        <div className="flex gap-md">
          <PrimaryButton variant="secondary" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </PrimaryButton>
          <PrimaryButton
            className="flex-1"
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
