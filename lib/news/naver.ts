export interface NewsItem {
  title: string;
  summary: string;
}

function stripHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function fetchStockNews(stockName: string): Promise<NewsItem[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경변수가 설정되어 있지 않아요."
    );
  }

  const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(
    stockName
  )}&display=5&sort=sim`;

  const res = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Naver 뉴스 API 요청 실패 (status: ${res.status})`);
  }

  const data: { items?: { title: string; description: string }[] } = await res.json();

  return (data.items ?? []).slice(0, 5).map((item) => ({
    title: stripHtml(item.title),
    summary: stripHtml(item.description),
  }));
}
