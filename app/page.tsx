"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">포모온다</h1>
        <p className="text-base leading-relaxed text-slate-600">
          지금 흔들리고 있는 매수·매도 판단 이유를, 최근 이슈와 나란히 놓고
          스스로 점검해보는 메타인지 점검 카드예요.
        </p>
      </div>
      <PrimaryButton onClick={() => router.push("/register")}>
        메타인지 가동하기
      </PrimaryButton>
    </div>
  );
}
