export interface DreamInsight {
  id: string;
  dream_id: string;
  insight_text: string;
  generated_at: string;
  ai_model_version: string;
}

export interface AIInsightRequest {
  dream_description: string;
  mood_upon_waking: string;
  is_lucid: boolean;
  tags?: string[];
}

export interface AIInsightResponse {
  insight: string;
  success: boolean;
  error?: string;
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}
