import { AIInsightRequest } from '@/types/ai'

export function createInsightPrompt(request: AIInsightRequest): string {
  const { dream_description, mood_upon_waking, is_lucid, tags } = request
  
  const basePrompt = `
You are a thoughtful dream interpreter. Analyze the following dream and provide insights that are suggestive and exploratory, not definitive. Focus on potential symbolism and emotional connections.

Dream Description: ${dream_description}

Mood Upon Waking: ${mood_upon_waking}

Lucid Dream: ${is_lucid ? 'Yes' : 'No'}

${tags && tags.length > 0 ? `Associated Tags: ${tags.join(', ')}` : ''}

Please provide an insight that:
1. Explores potential symbolism of key elements in the dream
2. Connects the dream's emotional tone to the mood upon waking
3. ${is_lucid ? 'Acknowledges the significance of this being a lucid dream' : ''}
4. Uses phrases like "might represent," "could suggest," "may indicate" rather than definitive statements
5. Encourages personal reflection and interpretation
6. Keeps the tone warm, supportive, and non-judgmental
7. Is approximately 150-300 words

Remember: Dreams are highly personal. Your insights should be presented as possibilities for the dreamer to consider, not absolute truths.
`

  return basePrompt.trim()
}

export const AI_PROMPT_TEMPLATES = {
  DREAM_INSIGHT: createInsightPrompt,
  
  // Future templates can be added here
  DREAM_PATTERN_ANALYSIS: (dreams: string[]) => `
    Analyze these recurring dream patterns and provide insights about potential themes...
    Dreams: ${dreams.join('\n---\n')}
  `,
  
  LUCID_DREAM_TIPS: (userLevel: string) => `
    Based on the user's ${userLevel} level experience with lucid dreaming, provide helpful tips...
  `
}
