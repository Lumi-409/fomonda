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
      <StepTopBar step={2} totalSteps={4} />
      <div className="flex flex-1 flex-col gap-2xl px-lg py-2xl">
        <div>
          <div className="text-heading-sub font-semibold text-gray-950">
            <p>{draft.stock.name}는</p>
            <p>지금 보유하고 있는 종목인가요?</p>
          </div>
          <p className="mt-sm text-label-sm text-gray-600">
            보유 중인 종목인지 관심 종목인지 알려주세요
          </p>
        </div>

        <div className="flex flex-col gap-md">
          <button
            type="button"
            onClick={() => handleSelect(true)}
            className="rounded-card bg-gray-100 px-lg py-lg text-center text-label-m font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          >
            네, 보유하고 있어요
          </button>
          <button
            type="button"
            onClick={() => handleSelect(false)}
            className="rounded-card bg-gray-100 px-lg py-lg text-center text-label-m font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          >
            아니요, 관심만 있어요
          </button>
        </div>
      </div>
    </div>
  );
}
