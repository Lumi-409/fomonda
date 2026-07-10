import type { Metadata } from "next";
import AnalyticsPageView from "@/components/analytics-page-view";
import { AppProvider } from "@/lib/context/app-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fomonda",
  description:
    "매수·매도 판단을 대신하지 않고, 뇌동매매·FOMO·불안에 휩쓸린 건 아닌지 스스로 점검하도록 돕는 메타인지 AI",
  icons: {
    icon: "/favicon.ico",
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
