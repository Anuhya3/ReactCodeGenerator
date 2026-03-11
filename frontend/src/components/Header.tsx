import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">AI Studio</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
          AI Website to React Converter
        </h1>
        <p className="max-w-xl text-base text-slate-600 dark:text-slate-300">
          Paste a URL, extract the HTML, and generate production-ready React components with Tailwind CSS.
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
