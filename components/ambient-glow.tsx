export default function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-160px] top-1/4 h-[320px] w-[320px] animate-drift-a rounded-full bg-pink-300 opacity-[0.15] blur-3xl" />
      <div className="absolute bottom-1/4 right-[-160px] h-[320px] w-[320px] animate-drift-b rounded-full bg-purple-700 opacity-5 blur-3xl" />
    </div>
  );
}
