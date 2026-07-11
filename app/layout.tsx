import type { Metadata } from "next";
import Script from "next/script";
import AnalyticsPageView from "@/components/analytics-page-view";
import { AppProvider } from "@/lib/context/app-context";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const SITE_URL = "https://fomonda.vercel.app";
const OG_TITLE = "Fomonda - 내 투자 판단, 근거인가요 감정인가요?";
const OG_DESCRIPTION =
  "매수매도 판단 이유 한 줄 적으면, 포몬다가 근거인지 감정인지 짚어드릴게요";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Fomonda",
  description:
    "매수·매도 판단을 대신하지 않고, 뇌동매매·FOMO·불안에 휩쓸린 건 아닌지 스스로 점검하도록 돕는 메타인지 AI",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "Fomonda",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
        <AnalyticsPageView />
        <AppProvider>
          <main className="relative mx-auto flex min-h-screen w-full max-w-page flex-col bg-white">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
