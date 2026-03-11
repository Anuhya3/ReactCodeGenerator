export default function PreviewPane({ html }: { html?: string | null }) {
  if (!html) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60">
        Preview will appear after generation.
      </div>
    );
  }

  return (
    <iframe
      title="preview"
      className="h-[320px] w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-800"
      srcDoc={html}
      sandbox="allow-same-origin"
    />
  );
}
