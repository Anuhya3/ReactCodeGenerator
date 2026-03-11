const jobs = new Map();
const listeners = new Set();

export function createJob(payload) {
  const now = new Date().toISOString();
  const job = {
    id: payload.id,
    jobId: payload.id,
    status: "queued",
    createdAt: now,
    updatedAt: now,
    url: payload.url || null,
    html: payload.html || null,
    componentTree: null,
    components: [],
    code: null,
    previewHtml: null,
    notes: null,
    error: null,
  };
  jobs.set(job.id, job);
  notify(job);
  return job;
}

export function updateJob(id, updates) {
  const job = jobs.get(id);
  if (!job) return null;
  const updated = {
    ...job,
    ...updates,
    jobId: id,
    updatedAt: new Date().toISOString(),
  };
  jobs.set(id, updated);
  notify(updated);
  return updated;
}

export function getJob(id) {
  return jobs.get(id) || null;
}

export function onJobUpdate(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(job) {
  for (const listener of listeners) {
    listener(job);
  }
}
