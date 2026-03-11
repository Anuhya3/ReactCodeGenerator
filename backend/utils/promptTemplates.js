export function buildSystemPrompt() {
  return `You are a senior frontend engineer. Convert HTML into reusable React functional components using Tailwind CSS.
Return STRICT JSON with keys: componentTree (string), components (array of {name, description}), code (string TSX), previewHtml (string), notes (string).
Requirements:
- code must be valid TSX and use React functional components with TypeScript.
- The root component must be the default export named RootComponent.
- Use Tailwind utility classes only.
- previewHtml must be simple static HTML that visually approximates the layout.
- Do not include markdown or backticks.`;
}

export function buildUserPrompt(html) {
  return `Convert this HTML into reusable React components with Tailwind.\n\nHTML:\n${html}`;
}
