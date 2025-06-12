import { AIInsightRequest } from "@/types/ai";

export function createInsightPrompt(request: AIInsightRequest): string {
  let prompt = `Analyze the following dream and provide a detailed analysis of its potential meanings, symbols, and emotional themes. The user is looking for insights into their subconscious mind.

Dream Description:
${request.description}

Mood Upon Waking: ${request.mood_upon_waking}
Lucid Dream: ${request.is_lucid ? "Yes" : "No"}
`;

  if (request.dream_tags && request.dream_tags.length > 0) {
    const tagNames = request.dream_tags.map((dt) => dt.tag.name);
    prompt += `Tags: ${tagNames.join(", ")}\n\n`;
  }

  prompt += `Please provide the analysis in a structured format with the following sections:
- **Core Themes:** Identify the main emotional and psychological themes.
- **Symbol Analysis:** Interpret the key symbols and their potential meanings.
- **Potential Influences:** Suggest possible real-life connections or stressors.
- **Summary & Reflection:** Offer a concluding thought or a question for self-reflection.

Keep the tone insightful, empathetic, and avoid making definitive statements. Use "could represent," "might suggest," etc. The analysis should be between 200 and 400 words.`;

  return prompt;
}

export const AI_PROMPT_TEMPLATES = {
  DREAM_INSIGHT: createInsightPrompt,

  // Future templates can be added here
  DREAM_PATTERN_ANALYSIS: (dreams: string[]) => `
    Analyze these recurring dream patterns and provide insights about potential themes...
    Dreams: ${dreams.join("\n---\n")}
  `,

  LUCID_DREAM_TIPS: (userLevel: string) => `
    Based on the user's ${userLevel} level experience with lucid dreaming, provide helpful tips...
  `,
};
