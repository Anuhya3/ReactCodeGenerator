import { cleanHtml } from "./domCleaner.js";
import { scrapeWebsite } from "./scraper.js";
import { generateFromHtml } from "./aiService.js";

export async function generateFromUrl(url) {
  const rawHtml = await scrapeWebsite(url);
  const cleaned = cleanHtml(rawHtml);
  const aiResult = await generateFromHtml(cleaned);
  return { rawHtml, cleanedHtml: cleaned, ...aiResult };
}

export async function generateFromRawHtml(html) {
  const cleaned = cleanHtml(html);
  const aiResult = await generateFromHtml(cleaned);
  return { rawHtml: html, cleanedHtml: cleaned, ...aiResult };
}
