import ReactMarkdown from "react-markdown";

const content = `## How it works\n\n1. Paste a URL and start generation.\n2. The backend scrapes HTML with Puppeteer.\n3. AI converts structure into React + Tailwind.\n4. Preview + code update in real time.\n\n## Tips\n\n- Use public URLs with accessible HTML.\n- Avoid pages that require auth or heavy client rendering.\n- Export the project as a Next.js starter ZIP.`;

export default function MarkdownPanel() {
  return (
    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {children}
            </h2>
          ),
          li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
