import { XMLParser } from "fast-xml-parser";
import { Stock } from "@/lib/types";

const ENDPOINT = "https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo";
const ANCHOR_CODE = "005930"; // 항상 상장되어 있는 종목으로 최근 영업일(basDt)을 알아낸다

const parser = new XMLParser();

interface KrxItem {
  basDt?: string;
  srtnCd?: string; // 단축코드, "A005930" 형태
  itmsNm?: string; // 종목명
}

interface KrxXml {
  response?: {
    header?: { resultCode?: string; resultMsg?: string };
    body?: {
      items?: { item?: KrxItem[] | KrxItem };
    };
  };
}

function toArray<T>(value: T[] | T | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

async function requestKrx(params: Record<string, string>): Promise<KrxItem[]> {
  const serviceKey = process.env.DATA_GO_KR_API_KEY;
  if (!serviceKey) {
    throw new Error("DATA_GO_KR_API_KEY 환경변수가 설정되어 있지 않아요.");
  }

  const search = new URLSearchParams({ serviceKey, ...params });
  // KRX 데이터는 영업일 기준 하루 1회만 갱신되므로 Next.js Data Cache로 1시간 캐싱한다.
  // 서버리스 인스턴스마다 새로 뜨는 모듈 스코프 캐시(cachedStocks)와 달리, 이 캐시는
  // Vercel 배포 전체에서 공유되어 매 요청마다 KRX를 다시 호출하는 지연을 막아준다.
  const res = await fetch(`${ENDPOINT}?${search.toString()}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`KRX 상장종목정보 API 요청 실패 (status: ${res.status})`);
  }

  const xml: KrxXml = parser.parse(await res.text());
  const resultCode = xml.response?.header?.resultCode;
  if (resultCode && resultCode !== "00") {
    throw new Error(`KRX 상장종목정보 API 오류: ${xml.response?.header?.resultMsg ?? resultCode}`);
  }

  return toArray(xml.response?.body?.items?.item);
}

async function getLatestBasDt(): Promise<string> {
  const items = await requestKrx({
    numOfRows: "1",
    pageNo: "1",
    likeSrtnCd: ANCHOR_CODE,
  });
  const basDt = items[0]?.basDt;
  if (!basDt) {
    throw new Error("KRX 최근 영업일(basDt)을 확인하지 못했어요.");
  }
  return basDt;
}

function toStock(item: KrxItem): Stock | null {
  if (!item.srtnCd || !item.itmsNm) return null;
  return { code: item.srtnCd.replace(/^A/, ""), name: item.itmsNm };
}

async function fetchAllKrxStocks(): Promise<Stock[]> {
  const basDt = await getLatestBasDt();
  const items = await requestKrx({
    numOfRows: "3000",
    pageNo: "1",
    basDt,
  });

  const seen = new Set<string>();
  const stocks: Stock[] = [];
  for (const item of items) {
    const stock = toStock(item);
    if (!stock || seen.has(stock.code)) continue;
    seen.add(stock.code);
    stocks.push(stock);
  }
  return stocks;
}

// 서버 시작 후 최초 요청 시 한 번만 KRX를 호출하고, 이후에는 메모리 캐시를 재사용한다.
let cachedStocks: Promise<Stock[]> | null = null;

export function getAllKrxStocks(): Promise<Stock[]> {
  if (!cachedStocks) {
    cachedStocks = fetchAllKrxStocks().catch((error) => {
      cachedStocks = null; // 실패 시 다음 요청에서 재시도할 수 있도록 캐시를 비운다
      throw error;
    });
  }
  return cachedStocks;
}
