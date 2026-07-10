"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StepTopBar from "@/components/step-topbar";
import { IconSearchGlass } from "@/components/icons";
import { useAppContext } from "@/lib/context/app-context";
import { getRecommendedStocks, searchStocks } from "@/lib/stocks";
import { addRecentStock, getRecentStocks } from "@/lib/stocks/recent";
import { Stock } from "@/lib/types";

function HighlightedName({ name, query }: { name: string; query: string }) {
  const index = name.toLowerCase().indexOf(query.toLowerCase());
  if (!query || index === -1) {
    return <span className="text-gray-700">{name}</span>;
  }
  return (
    <span className="text-gray-700">
      {name.slice(0, index)}
      <span className="text-purple-500">{name.slice(index, index + query.length)}</span>
      {name.slice(index + query.length)}
    </span>
  );
}

function StockChip({ stock, onClick }: { stock: Stock; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-sm rounded-card bg-gray-100 px-lg py-md text-left transition-colors hover:bg-gray-200"
    >
      <span className="whitespace-nowrap text-label-sm font-semibold text-gray-700">
        {stock.name}
      </span>
      <span className="whitespace-nowrap text-eyebrow text-gray-400">{stock.code}</span>
    </button>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const { selectStock } = useAppContext();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stock[]>([]);
  const [recent, setRecent] = useState<Stock[]>([]);
  const recommended = getRecommendedStocks();

  useEffect(() => {
    setRecent(getRecentStocks());
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    let active = true;
    searchStocks(query).then((stocks) => {
      if (active) setResults(stocks);
    });
    return () => {
      active = false;
    };
  }, [query]);

  const handleSelect = (stock: Stock) => {
    addRecentStock(stock);
    selectStock(stock);
    router.push("/holding");
  };

  const isSearching = query.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col">
      <StepTopBar step={1} totalSteps={4} />
      <div className="flex flex-1 flex-col gap-[32px] px-lg py-2xl">
        <div>
          <div className="text-heading-sub font-semibold text-gray-950">
            <p>매수/매도를 고민 중이거나</p>
            <p>관심있는 종목을 입력해주세요</p>
          </div>
          <p className="mt-sm text-label-sm text-gray-600">
            한국거래소 상장 종목만 검색 가능해요
          </p>
        </div>

        <div className="flex w-full items-center gap-sm rounded-[16px] border border-gray-200 bg-white py-[16px] pl-[16px] pr-[20px] focus-within:border-gray-800">
          <IconSearchGlass className="h-5 w-5 shrink-0 text-gray-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="종목명을 입력해주세요"
            className="flex-1 border-none bg-transparent text-label text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        {isSearching ? (
          <div className="flex flex-col">
            {results.length === 0 && (
              <p className="text-label-sm text-gray-400">검색 결과가 없어요.</p>
            )}
            {results.map((stock) => (
              <button
                key={stock.code}
                type="button"
                onClick={() => handleSelect(stock)}
                className="flex items-center justify-between border-b border-gray-100 py-lg text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-label-m font-semibold">
                  <HighlightedName name={stock.name} query={query} />
                </span>
                <span className="text-eyebrow text-gray-400">{stock.code}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2xl">
            {recent.length > 0 && (
              <div className="flex flex-col gap-lg">
                <span className="text-label-sm font-semibold text-gray-500">
                  최근 확인한 종목
                </span>
                <div className="flex gap-sm overflow-x-auto">
                  {recent.map((stock) => (
                    <StockChip
                      key={stock.code}
                      stock={stock}
                      onClick={() => handleSelect(stock)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-lg">
              <span className="text-label-sm font-semibold text-gray-500">추천 종목</span>
              <div className="flex gap-sm overflow-x-auto">
                {recommended.map((stock) => (
                  <StockChip key={stock.code} stock={stock} onClick={() => handleSelect(stock)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
