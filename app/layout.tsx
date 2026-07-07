import type { Metadata } from "next";
import { CheckFlowProvider } from "@/lib/context/check-flow-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "포모온다",
  description: "매수·매도 충동 순간의 판단 이유를 점검하는 메타인지 점검 카드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <CheckFlowProvider>
          <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">
            {children}
          </main>
        </CheckFlowProvider>
      </body>
    </html>
  );
}
