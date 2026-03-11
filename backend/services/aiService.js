import OpenAI from "openai";
import { buildSystemPrompt, buildUserPrompt } from "../utils/promptTemplates.js";

function getClient() {
  const apiKey = process.env.HF_TOKEN;
  if (!apiKey) {
    throw new Error("HF_TOKEN is not set");
  }
  const baseURL = process.env.HF_BASE_URL || "https://router.huggingface.co/v1";
  return new OpenAI({ apiKey, baseURL });
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  const sliced = text.slice(start, end + 1);
  try {
    return JSON.parse(sliced);
  } catch {
    return null;
  }
}

export async function generateFromHtml(html) {
  const system = buildSystemPrompt();
  const user = buildUserPrompt(html);

  const client = getClient();
  const response = await client.chat.completions.create({
    model: process.env.HF_MODEL || "google/gemma-2-2b-it",
    temperature: 0.2,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const content = response.choices?.[0]?.message?.content || "";
  const parsed = extractJson(content);

  if (!parsed) {
    return {
      componentTree: "",
      components: [],
      code: "",
      previewHtml: "",
      notes: "AI response could not be parsed as JSON.",
      raw: content,
    };
  }

  return {
    componentTree: parsed.componentTree || "",
    components: parsed.components || [],
    code: parsed.code || "",
    previewHtml: parsed.previewHtml || "",
    notes: parsed.notes || "",
  };
}
