"use client";

import { useRouter } from "next/navigation";
import AmbientGlow from "@/components/ambient-glow";
import PrimaryButton from "@/components/primary-button";
import { IconBrain, IconSearch, IconSprout, IconSwooshGradient } from "@/components/icons";
import { useAppContext } from "@/lib/context/app-context";
import { trackEvent } from "@/lib/analytics/mixpanel";

const FEATURES = [
  { Icon: IconSearch, text: "판단 뒤에 숨은 진짜 이유를 관찰해요" },
  { Icon: IconSprout, text: "흔들린 순간들이 나만의 인사이트가 돼요" },
  { Icon: IconBrain, text: "근거 있는 투자 판단의 힘을 키워요" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { startNewCheck } = useAppContext();

  const handleStart = () => {
    trackEvent("Onboarding Start Clicked");
    startNewCheck();
    router.push("/search");
  };

  return (
    <div className="relative isolate flex flex-1 flex-col overflow-hidden bg-white">
      <AmbientGlow />
      <div className="flex flex-1 flex-col items-center justify-center gap-4xl px-[40px] py-4xl">
        <div className="flex flex-col items-center gap-2xl">
          <div className="flex flex-col items-center">
            <IconSwooshGradient className="h-[34px] w-[46px] translate-x-[24px]" />
            <p className="font-logo text-logo text-gray-900">Fomonda</p>
          </div>
          <div className="flex flex-col items-center gap-xs text-center text-label font-semibold text-gray-600">
            <p>내 투자 판단이 흔들린다면</p>
            <p>지금 메타인지를 가동하세요</p>
          </div>
        </div>

        <div className="flex w-full min-w-[292px] flex-col items-start gap-lg rounded-card bg-white p-xl shadow-card">
          {FEATURES.map((feature) => (
            <div key={feature.text} className="flex items-center gap-lg">
              <feature.Icon className="shrink-0" />
              <p className="whitespace-nowrap text-label-sm font-medium text-gray-800">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        <PrimaryButton onClick={handleStart} className="min-w-[292px]">
          시작하기
        </PrimaryButton>
      </div>
    </div>
  );
}
