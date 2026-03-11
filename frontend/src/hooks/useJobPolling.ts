import { useEffect } from "react";
import { fetchJob } from "../services/api";
import { useGeneratorStore } from "../store/useGeneratorStore";

export function useJobPolling() {
  const { result, setResult, setLoading } = useGeneratorStore();

  useEffect(() => {
    if (!result?.jobId || result.status === "done" || result.status === "failed") {
      return;
    }

    let active = true;
    const interval = setInterval(async () => {
      if (!active) return;
      try {
        const latest = await fetchJob(result.jobId);
        if (latest) {
          setResult(latest);
          setLoading(latest.status !== "done" && latest.status !== "failed");
        }
      } catch {
        setLoading(false);
      }
    }, 2000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [result?.jobId, result?.status, setLoading, setResult]);
}
