import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

export async function generateFromUrl(url: string) {
  const query = `mutation Generate($url: String!) {
    generateFromUrl(url: $url) {
      jobId
      status
      url
      componentTree
      components { name description }
      code
      previewHtml
      notes
      error
      createdAt
      updatedAt
    }
  }`;

  const response = await api.post("/graphql", {
    query,
    variables: { url },
  });

  return response.data.data.generateFromUrl;
}

export async function generateFromHtml(html: string) {
  const query = `mutation Generate($html: String!) {
    generateFromHtml(html: $html) {
      jobId
      status
      componentTree
      components { name description }
      code
      previewHtml
      notes
      error
      createdAt
      updatedAt
    }
  }`;

  const response = await api.post("/graphql", {
    query,
    variables: { html },
  });

  return response.data.data.generateFromHtml;
}

export async function fetchJob(jobId: string) {
  const query = `query Job($id: ID!) {
    job(id: $id) {
      jobId
      status
      url
      componentTree
      components { name description }
      code
      previewHtml
      notes
      error
      createdAt
      updatedAt
    }
  }`;

  const response = await api.post("/graphql", {
    query,
    variables: { id: jobId },
  });

  return response.data.data.job;
}

export function getExportUrl(jobId: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  return `${base}/export/${jobId}`;
}
