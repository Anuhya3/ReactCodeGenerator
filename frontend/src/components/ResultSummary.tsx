"use client";

import { getExportUrl } from "../services/api";
import { useGeneratorStore } from "../store/useGeneratorStore";
import StatusBadge from "./StatusBadge";

export default function ResultSummary() {
  const { result, error } = useGeneratorStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Status</div>
        <StatusBadge status={result?.status} />
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      {result?.error && <p className="text-sm text-rose-600">{result.error}</p>}
      {result?.jobId && (
        <a
          className={`inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-xs font-semibold transition ${
            result.status === "done"
              ? "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              : "border-slate-200 bg-slate-100 text-slate-400"
          }`}
          href={result.status === "done" ? getExportUrl(result.jobId) : "#"}
          onClick={(event) => {
            if (result.status !== "done") {
              event.preventDefault();
            }
          }}
        >
          Export ZIP
        </a>
      )}
    </div>
  );
}
