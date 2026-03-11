"use client";

import { FormEvent } from "react";
import { generateFromUrl } from "../services/api";
import { useGeneratorStore } from "../store/useGeneratorStore";

export default function UrlForm() {
  const { url, setUrl, setLoading, setError, setResult } = useGeneratorStore();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await generateFromUrl(url);
      setResult(result);
    } catch (error: any) {
      setError(error?.message || "Failed to start generation");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
        Website URL
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />
        <button
          type="submit"
          className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          Generate React
        </button>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        We will scrape the HTML, analyze layout, and generate a Tailwind-powered React component tree.
      </p>
    </form>
  );
}
