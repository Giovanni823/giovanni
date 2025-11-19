import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Analyze this homework problem. Identify the subject, the specific topic, and provide a step-by-step solution. Then, explain the core concept simply. Finally, generate 3 practice questions based on the same concept."
          }
        ]
      },
      config: {
        systemInstruction: "You are a helpful, encouraging, and expert academic tutor. Your goal is to help students understand, not just give answers. Keep explanations clear and concise.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "The academic subject (e.g., Math, Chemistry)." },
            topic: { type: Type.STRING, description: "The specific topic (e.g., Calculus, Stoichiometry)." },
            emoji: { type: Type.STRING, description: "A relevant emoji for the subject." },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step-by-step solution to the problem in the image."
            },
            explanation: { type: Type.STRING, description: "A short, clear paragraph explaining the underlying concept." },
            practiceQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING },
                  hint: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};