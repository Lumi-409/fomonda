"use client";

import { useRouter } from "next/navigation";
import { IconBack } from "@/components/icons";

export default function BackTopBar() {
  const router = useRouter();

  return (
    <div className="flex h-[52px] w-full shrink-0 items-center px-2xl py-xl">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
        className="flex shrink-0 items-center justify-center p-xs text-gray-900"
      >
        <IconBack className="h-4 w-4" />
      </button>
    </div>
  );
}
