export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-colors duration-300 dark:border-emerald-900/30 dark:bg-[#121C17]">
      <div className="aspect-[4/3] bg-stone-200 dark:bg-emerald-900/30" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 rounded-lg bg-stone-200 dark:bg-emerald-900/40" />
        <div className="h-5 w-full rounded-lg bg-stone-200 dark:bg-emerald-900/40" />
        <div className="h-5 w-3/4 rounded-lg bg-stone-200 dark:bg-emerald-900/40" />
        <div className="h-4 w-1/2 rounded-lg bg-stone-200 dark:bg-emerald-900/40" />
        <div className="mt-2 h-11 w-full rounded-2xl bg-stone-200 dark:bg-emerald-900/40" />
      </div>
    </div>
  );
}
