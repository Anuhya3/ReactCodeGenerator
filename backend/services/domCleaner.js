import { clampText } from "../utils/sanitize.js";

const TAGS_TO_STRIP = ["script", "style", "noscript", "iframe"];

export function cleanHtml(html) {
  if (!html) return "";
  let cleaned = html;

  for (const tag of TAGS_TO_STRIP) {
    const pattern = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    cleaned = cleaned.replace(pattern, "");
  }

  cleaned = cleaned.replace(/on\\w+="[^"]*"/gi, "");
  cleaned = cleaned.replace(/on\\w+='[^']*'/gi, "");
  cleaned = cleaned.replace(/\s{2,}/g, " ");

  return clampText(cleaned, 120000);
}
