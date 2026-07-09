"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StepTopBar from "@/components/step-topbar";
import { useAppContext } from "@/lib/context/app-context";
import { searchStocks } from "@/lib/stocks";
import { Stock } from "@/lib/types";

export default function SearchPage() {
  const router = useRouter();
  const { selectStock } = useAppContext();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stock[]>([]);

  useEffect(() => {
    let active = true;
    searchStocks(query).then((stocks) => {
      if (active) setResults(stocks);
    });
    return () => {
      active = false;
    };
  }, [query]);

  const handleSelect = (stock: Stock) => {
    selectStock(stock);
    router.push("/holding");
  };

  return (
    <div className="flex flex-1 flex-col">
      <StepTopBar step={1} totalSteps={3} />
      <div className="flex flex-1 flex-col gap-2xl px-lg py-2xl">
        <div>
          <h1 className="text-heading-sub font-semibold text-gray-950">종목 검색</h1>
          <p className="mt-xs text-label-sm text-gray-600">
            지금 고민 중인 종목을 검색해주세요.
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="종목명 또는 종목코드"
          className="rounded-input border border-gray-200 bg-white px-lg py-md text-label-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-800"
        />

        <div className="flex flex-col gap-sm">
          {results.length === 0 && (
            <p className="text-label-sm text-gray-400">검색 결과가 없어요.</p>
          )}
          {results.map((stock) => (
            <button
              key={stock.code}
              type="button"
              onClick={() => handleSelect(stock)}
              className="flex items-center justify-between rounded-card border border-gray-200 bg-white px-lg py-md text-left transition-colors hover:bg-gray-50"
            >
              <span className="text-label-m font-semibold text-gray-900">{stock.name}</span>
              <span className="text-eyebrow text-gray-400">{stock.code}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
