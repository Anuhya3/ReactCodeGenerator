import { useEffect } from "react";
import { useGeneratorStore } from "../store/useGeneratorStore";

export function useJobSocket() {
  const { result, setResult, setLoading } = useGeneratorStore();

  useEffect(() => {
    if (!result?.jobId) return;
    const rawUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/ws";
    const url = rawUrl.replace("http://", "ws://").replace("https://", "wss://");

    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "job-update" && message.job?.id === result.jobId) {
          const updated = message.job;
          setResult({
            jobId: updated.id,
            status: updated.status,
            url: updated.url,
            componentTree: updated.componentTree,
            components: updated.components || [],
            code: updated.code,
            previewHtml: updated.previewHtml,
            notes: updated.notes,
            error: updated.error,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
          });
          setLoading(updated.status !== "done" && updated.status !== "failed");
        }
      } catch {
        // ignore malformed socket data
      }
    };

    return () => {
      socket.close();
    };
  }, [result?.jobId, setLoading, setResult]);
}
