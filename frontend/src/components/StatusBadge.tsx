export default function StatusBadge({ status }: { status?: string | null }) {
  const color =
    status === "done"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : status === "failed"
      ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
      : "bg-slate-500/15 text-slate-600 dark:text-slate-300";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {status || "idle"}
    </span>
  );
}
