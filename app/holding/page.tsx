"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">보유 여부 선택</h1>
        <p className="mt-1 text-sm text-slate-500">
          {draft.stock.name}({draft.stock.code})을 지금 보유하고 있나요?
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleSelect(true)}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          보유 중이에요 (Y)
        </button>
        <button
          type="button"
          onClick={() => handleSelect(false)}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          관심만 있어요 (N)
        </button>
      </div>
    </div>
  );
}
