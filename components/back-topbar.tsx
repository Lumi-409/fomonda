"use client";

import { useRouter } from "next/navigation";
import { IconBack } from "@/components/icons";

export default function BackTopBar() {
  const router = useRouter();

  return (
    <div className="flex h-[52px] w-full shrink-0 items-center px-lg py-lg">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
        className="flex h-6 w-6 shrink-0 items-center justify-center text-gray-900"
      >
        <IconBack className="h-4 w-4" />
      </button>
    </div>
  );
}
