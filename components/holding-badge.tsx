export function HoldingBadge({
  holding,
  className = "",
}: {
  holding: boolean;
  className?: string;
}) {
  const tone = holding ? "bg-purple-700/10 text-purple-700" : "bg-pink-500/10 text-pink-700";
  return (
    <span className={`rounded-badge px-md py-xs text-eyebrow font-semibold ${tone} ${className}`}>
      {holding ? "보유" : "관심"}
    </span>
  );
}

export function avatarClasses(holding: boolean): string {
  return holding ? "bg-purple-700/10 text-purple-700" : "bg-pink-500/10 text-pink-700";
}
