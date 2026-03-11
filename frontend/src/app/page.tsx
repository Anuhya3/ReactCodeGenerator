"use client";

import AppShell from "../components/AppShell";
import CodeEditor from "../components/CodeEditor";
import ComponentTree from "../components/ComponentTree";
import Header from "../components/Header";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MarkdownPanel from "../components/MarkdownPanel";
import Panel from "../components/Panel";
import PreviewPane from "../components/PreviewPane";
import ResultSummary from "../components/ResultSummary";
import UrlForm from "../components/UrlForm";
import { useJobPolling } from "../hooks/useJobPolling";
import { useJobSocket } from "../hooks/useJobSocket";
import { useGeneratorStore } from "../store/useGeneratorStore";

export default function Home() {
  const { isLoading, result } = useGeneratorStore();

  useJobPolling();
  useJobSocket();

  return (
    <AppShell>
      <Header />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <Panel title="Start Generation">
            <UrlForm />
          </Panel>

          <Panel title="Status & Export">
            <ResultSummary />
          </Panel>

          <Panel title="Component Tree">
            {isLoading ? <LoadingSkeleton /> : <ComponentTree tree={result?.componentTree} />}
          </Panel>

          <Panel title="Documentation">
            <MarkdownPanel />
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Live Preview">
            {isLoading ? <LoadingSkeleton /> : <PreviewPane html={result?.previewHtml} />}
          </Panel>

          <Panel title="Generated React Code">
            {isLoading ? <LoadingSkeleton /> : <CodeEditor value={result?.code} />}
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
