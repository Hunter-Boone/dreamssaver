import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIInsightRequest } from "@/types/ai";
import { createInsightPrompt } from "./aiPrompts";

export async function generateDreamInsight(
  request: AIInsightRequest
): Promise<string> {
  const prompt = createInsightPrompt(request);

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insightText = response.text();

    if (!insightText) {
      console.error("Invalid response structure from Gemini API:", response);
      throw new Error("No insight content received from the AI.");
    }

    return insightText;
  } catch (error) {
    console.error("Error generating dream insight:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate dream insight: ${error.message}`);
    }
    throw new Error("Failed to generate dream insight");
  }
}
