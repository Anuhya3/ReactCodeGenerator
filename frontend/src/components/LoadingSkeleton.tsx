export default function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-48 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-40 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
