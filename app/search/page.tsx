"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">종목 검색</h1>
        <p className="mt-1 text-sm text-slate-500">
          지금 고민 중인 종목을 검색해주세요.
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="종목명 또는 종목코드"
        className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-500"
      />

      <div className="flex flex-col gap-2">
        {results.length === 0 && (
          <p className="text-sm text-slate-400">검색 결과가 없어요.</p>
        )}
        {results.map((stock) => (
          <button
            key={stock.code}
            type="button"
            onClick={() => handleSelect(stock)}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:bg-slate-50"
          >
            <span className="text-sm font-medium text-slate-900">{stock.name}</span>
            <span className="text-xs text-slate-400">{stock.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
