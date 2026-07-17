"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AmbientGlow from "@/components/ambient-glow";
import PrimaryButton from "@/components/primary-button";
import { IconBrain, IconSearch, IconSprout, IconSwooshGradient } from "@/components/icons";
import { useAppContext } from "@/lib/context/app-context";
import { hasExistingSession } from "@/lib/session";
import { trackEvent } from "@/lib/analytics/mixpanel";
import { trackEvent as trackGaEvent } from "@/lib/analytics/ga";

const FEATURES = [
  { Icon: IconSearch, text: "판단 뒤에 숨은 진짜 이유를 관찰해요" },
  { Icon: IconSprout, text: "흔들린 순간들이 나만의 인사이트가 돼요" },
  { Icon: IconBrain, text: "근거 있는 투자 판단의 힘을 키워요" },
];

// 이 모듈이 클라이언트에서 처음 로드되는 순간(=이 페이지의 첫 렌더보다도 먼저) 딱 한 번만 읽는다.
// AppProvider의 getOrCreateSessionId() 이펙트는 mount *이후*에나 실행되므로,
// 이 값은 그 이펙트가 세션을 새로 만들기 전의 "진짜 재방문 여부"를 담고 있다.
// (이펙트나 useSyncExternalStore로 매 렌더마다 다시 읽으면, AppProvider가 세션을
// 만든 뒤의 재렌더에서 방금 만든 세션을 "재방문"으로 오인하게 된다.)
const wasReturningVisitor = typeof window !== "undefined" ? hasExistingSession() : false;

export default function OnboardingPage() {
  const router = useRouter();
  const { startNewCheck } = useAppContext();
  // 서버 렌더링 및 최초 hydration 렌더에서는 항상 false로 시작해 mismatch를 피하고,
  // mount 완료 후에만 위에서 미리 캡처해둔 값을 반영한다.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isReturning = mounted && wasReturningVisitor;

  const handleStart = () => {
    trackEvent("Onboarding Start Clicked");
    trackGaEvent("Onboarding Start Clicked");
    if (isReturning) {
      trackEvent("returning_user_new_check_clicked");
    }
    startNewCheck();
    router.push("/search");
  };

  const handleViewList = () => {
    trackEvent("returning_user_list_clicked");
    router.push("/list");
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

        <div className="flex w-full min-w-[292px] flex-col gap-md">
          <PrimaryButton onClick={handleStart}>
            {isReturning ? "새 종목 점검하기" : "시작하기"}
          </PrimaryButton>
          {isReturning && (
            <PrimaryButton variant="ghost" onClick={handleViewList}>
              내 종목 리스트 보기
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
