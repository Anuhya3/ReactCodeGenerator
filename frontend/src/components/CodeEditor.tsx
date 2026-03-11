"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function CodeEditor({ value }: { value?: string | null }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      <MonacoEditor
        height="420px"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={value || "// Generated code will appear here"}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          readOnly: true,
        }}
      />
    </div>
  );
}
