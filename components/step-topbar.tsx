"use client";

import { useRouter } from "next/navigation";
import { IconBack } from "@/components/icons";

interface StepTopBarProps {
  step: number;
  totalSteps: number;
}

export default function StepTopBar({ step, totalSteps }: StepTopBarProps) {
  const router = useRouter();

  return (
    <div className="flex h-[52px] w-full shrink-0 items-center gap-md px-2xl py-xl">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
        className="flex shrink-0 items-center justify-center p-xs text-gray-900"
      >
        <IconBack className="h-4 w-4" />
      </button>

      <div className="h-1 flex-1 overflow-hidden rounded-badge bg-gray-100">
        <div
          className="h-full rounded-badge bg-gray-800 transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <span className="shrink-0 text-eyebrow font-semibold text-gray-500">
        {step}/{totalSteps}
      </span>
    </div>
  );
}
