
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExample = async (word: string, definition: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }

  try {
    const prompt = `Generate a new, creative, and clear example sentence for the SAT vocabulary word "${word}", which means "${definition}". The sentence should be easy for a high school student to understand and remember. Do not repeat the original definition in your sentence. Only return the sentence.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating example:", error);
    return "Could not generate a new example at this time.";
  }
};
