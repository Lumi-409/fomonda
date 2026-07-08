import type { Metadata } from "next";
import { AppProvider } from "@/lib/context/app-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "포모온다",
  description:
    "매수·매도 판단을 대신하지 않고, 뇌동매매·FOMO·불안에 휩쓸린 건 아닌지 스스로 점검하도록 돕는 메타인지 AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppProvider>
          <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
