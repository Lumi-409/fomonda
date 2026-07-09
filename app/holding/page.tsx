"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StepTopBar from "@/components/step-topbar";
import { useAppContext } from "@/lib/context/app-context";

export default function HoldingPage() {
  const router = useRouter();
  const { draft, setHolding } = useAppContext();

  useEffect(() => {
    if (!draft.stock) {
      router.replace("/search");
    }
  }, [draft.stock, router]);

  if (!draft.stock) {
    return null;
  }

  const handleSelect = (holding: boolean) => {
    setHolding(holding);
    router.push("/reason");
  };

  return (
    <div className="flex flex-1 flex-col">
      <StepTopBar step={2} totalSteps={3} />
      <div className="flex flex-1 flex-col gap-2xl px-lg py-2xl">
        <div>
          <h1 className="text-heading-sub font-semibold text-gray-950">보유 여부 선택</h1>
          <p className="mt-xs text-label-sm text-gray-600">
            {draft.stock.name}({draft.stock.code})을 지금 보유하고 있나요?
          </p>
        </div>

        <div className="flex gap-sm">
          <button
            type="button"
            onClick={() => handleSelect(true)}
            className="flex-1 rounded-card border border-gray-200 bg-white px-lg py-md text-label-m font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            보유 중이에요 (Y)
          </button>
          <button
            type="button"
            onClick={() => handleSelect(false)}
            className="flex-1 rounded-card border border-gray-200 bg-white px-lg py-md text-label-m font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            관심만 있어요 (N)
          </button>
        </div>
      </div>
    </div>
  );
}
