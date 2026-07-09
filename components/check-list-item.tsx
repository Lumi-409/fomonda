import { CheckListItem } from "@/lib/types";

export function ListItemRow({ item }: { item: CheckListItem }) {
  return (
    <li className="flex flex-col gap-xs">
      <div className="flex items-start gap-sm">
        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gray-800" />
        <p className="text-label-m font-semibold text-gray-800">{item.claim}</p>
      </div>
      <p className="pl-md text-eyebrow text-gray-700">{item.detail}</p>
    </li>
  );
}

export function QuestionRow({ index, question }: { index: number; question: string }) {
  return (
    <div className="flex items-start rounded-card-sm bg-gray-50 p-lg">
      <p className="w-8 shrink-0 text-label-m font-semibold text-gray-400">Q{index + 1}.</p>
      <p className="flex-1 text-label-m text-gray-700">{question}</p>
    </div>
  );
}
