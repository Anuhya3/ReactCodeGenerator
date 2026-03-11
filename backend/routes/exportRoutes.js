import { Router } from "express";
import { getJob } from "../services/jobStore.js";
import { buildProjectZip } from "../services/zipService.js";

const router = Router();

router.get("/export/:jobId", (req, res) => {
  const job = getJob(req.params.jobId);
  if (!job || job.status !== "done") {
    res.status(404).json({ error: "Job not found or not ready" });
    return;
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ai-react-export-${job.id}.zip`
  );

  const archive = buildProjectZip({ code: job.code });
  archive.on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
  archive.pipe(res);
});

export default router;
