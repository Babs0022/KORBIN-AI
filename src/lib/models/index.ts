import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProviderModel } from '@/types';

type ModelClient = {
  generate: (prompt: string) => Promise<string>;
};

function createGeminiClient(model: 'gemini-2.5-flash' | 'gemini-2.5-pro'): ModelClient {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
  return {
    async generate(prompt: string) {
      const modelId = model === 'gemini-2.5-pro' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
      const m = genAI.getGenerativeModel({ model: modelId });
      const result = await m.generateContent(prompt);
      const text = result.response.text();
      return text;
    },
  };
}

export function getModelClient(model: ProviderModel): ModelClient {
  const hasGemini = Boolean(process.env.GOOGLE_GENAI_API_KEY);
  if (!hasGemini) throw new Error('Gemini API key missing');
  // Only Gemini is supported in this app
  const selected = model === 'gemini-2.5-pro' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
  return createGeminiClient(selected);
}


