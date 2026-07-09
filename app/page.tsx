"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/primary-button";
import { IconBrain, IconSearch, IconSprout } from "@/components/icons";
import { useAppContext } from "@/lib/context/app-context";

const FEATURES = [
  { Icon: IconSearch, text: "판단 뒤에 숨은 진짜 이유를 관찰해요" },
  { Icon: IconSprout, text: "흔들린 순간들이 나만의 인사이트가 돼요" },
  { Icon: IconBrain, text: "근거 있는 투자 판단의 힘을 키워요" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { startNewCheck } = useAppContext();

  const handleStart = () => {
    startNewCheck();
    router.push("/search");
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center gap-6xl py-4xl">
        <div className="flex flex-col items-center gap-3xl">
          <div className="flex flex-col items-center">
            <svg
              width="42"
              height="31"
              viewBox="38 0 46 34"
              fill="none"
              className="mb-0 text-gray-200"
            >
              <path
                d="M40 13.9812C46.0292 14.6062 59.6204 18.75 59.6204 32C58.5985 18.9792 69.7372 2 82 2"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <p className="font-logo text-logo text-gray-900">Fomonda</p>
          </div>
          <div className="flex flex-col items-center gap-md text-center text-body-lg text-gray-950">
            <p>내 투자 판단이 흔들린다면</p>
            <p>지금 메타인지를 가동하세요</p>
          </div>
        </div>

        <div className="flex w-fit flex-col items-start gap-lg rounded-card bg-white p-xl shadow-card">
          {FEATURES.map((feature) => (
            <div key={feature.text} className="flex items-center gap-lg">
              <feature.Icon className="shrink-0" />
              <p className="whitespace-nowrap text-label-sm font-medium text-gray-800">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 flex w-full flex-col bg-white px-lg pb-2xl pt-lg">
        <PrimaryButton onClick={handleStart}>시작하기</PrimaryButton>
      </div>
    </div>
  );
}
