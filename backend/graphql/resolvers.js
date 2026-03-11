import crypto from "crypto";
import { generateFromRawHtml, generateFromUrl } from "../services/generator.js";
import { createJob, getJob, updateJob } from "../services/jobStore.js";
import { isValidUrl, normalizeUrl } from "../utils/sanitize.js";

async function runJob(job, task) {
  updateJob(job.id, { status: "processing" });
  try {
    const result = await task();
    updateJob(job.id, {
      status: "done",
      componentTree: result.componentTree,
      components: result.components,
      code: result.code,
      previewHtml: result.previewHtml,
      notes: result.notes,
    });
  } catch (error) {
    updateJob(job.id, {
      status: "failed",
      error: error?.message || "Unknown error",
    });
  }
}

export const resolvers = {
  Query: {
    health: () => "ok",
    job: (_, { id }) => getJob(id),
  },
  Mutation: {
    generateFromUrl: (_, { url }) => {
      const normalized = normalizeUrl(url);
      if (!isValidUrl(normalized)) {
        throw new Error("Invalid URL");
      }
      const job = createJob({ id: crypto.randomUUID(), url: normalized });
      runJob(job, () => generateFromUrl(normalized));
      return {
        jobId: job.id,
        status: job.status,
        url: job.url,
        componentTree: job.componentTree,
        components: job.components,
        code: job.code,
        previewHtml: job.previewHtml,
        notes: job.notes,
        error: job.error,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      };
    },
    generateFromHtml: (_, { html }) => {
      const job = createJob({ id: crypto.randomUUID(), html });
      runJob(job, () => generateFromRawHtml(html));
      return {
        jobId: job.id,
        status: job.status,
        componentTree: job.componentTree,
        components: job.components,
        code: job.code,
        previewHtml: job.previewHtml,
        notes: job.notes,
        error: job.error,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      };
    },
  },
};
